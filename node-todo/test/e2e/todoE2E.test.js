const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../../app');

chai.use(chaiHttp);
chai.should();

describe('Todos E2E tests', () => {
  before(async () => {
    // Подключаемся к MongoDB перед тестами, если нужно
    // Если подключение уже есть в app.js, можно опустить или проверить, чтобы не подключаться повторно
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://127.0.0.1:27017/todotest', {
        // опции подключения, если нужны
      });
      console.log('Подключение к MongoDB успешно установлено');
    }
  });

  after(async () => {
    // Закрываем соединение после всех тестов
    await mongoose.connection.close();
    console.log('Соединение с MongoDB закрыто');
  });

  it('should create, update, and delete a todo', (done) => {
    let todo = { text: "E2E test todo", isDone: false };

    chai.request(app)
      .post('/api/todos')
      .send(todo)
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.a('array');
        const created = res.body.find(t => t.text === todo.text);
        if (!created || !created._id) return done(new Error('Created todo not found'));

        const id = created._id;

        chai.request(app)
          .put('/api/todos/' + id)
          .send({ done: true }) // поле done, а не isDone
          .end((err, res) => {
            if (err) return done(err);
            res.should.have.status(200);
            res.body.should.have.property('done').eql(true);

            chai.request(app)
              .delete('/api/todos/' + id)
              .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
              });
          });
      });
  });
});
