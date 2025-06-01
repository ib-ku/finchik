const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const database = require('./config/database');
const morgan = require('morgan');
const methodOverride = require('method-override');
const client = require('prom-client');

// Создаём реестр метрик
const register = new client.Registry();

// Создаем счетчик HTTP запросов
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Количество HTTP запросов',
  labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestCounter);

// Создаем гистограмму для времени ответа HTTP запросов (в секундах)
const httpRequestDurationSeconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Длительность HTTP запросов в секундах',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5]
});
register.registerMetric(httpRequestDurationSeconds);

// Body parser — обязательно ДО роутов
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Статические файлы и middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(methodOverride('X-HTTP-Method-Override'));

// Middleware для измерения времени ответа — ПЕРЕД роутами
app.use((req, res, next) => {
  const end = httpRequestDurationSeconds.startTimer({
    method: req.method,
    route: req.route ? req.route.path : req.path
  });

  res.on('finish', () => {
    end({ status_code: res.statusCode });
    httpRequestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });

  next();
});

// Подключение к MongoDB
mongoose.connect(database.localUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Подключение к MongoDB успешно установлено'))
.catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Подключаем роуты
require('./app/routes.js')(app);

// Эндпоинт для метрик Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Для SPA отдаём index.html для всех остальных запросов (после всех api роутов)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
    