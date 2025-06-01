const Todo = require('./models/todo'); // путь может отличаться

module.exports = function(app) {
  // Получение всех задач
  app.get('/api/todos', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Получение одной задачи по id
  app.get('/api/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) return res.status(404).send({ error: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  // Обновление задачи по id
  app.put('/api/todos/:id', async (req, res) => {
    try {
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { done: req.body.done },
        { new: true }
      );
      if (!todo) return res.status(404).send({ error: 'Todo not found' });
      res.json(todo);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Создание новой задачи
  app.post('/api/todos', async (req, res) => {
    try {
      await Todo.create({
        text: req.body.text,
        done: false
      });
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  // Удаление задачи
  app.delete('/api/todos/:id', async (req, res) => {
    try {
      await Todo.findByIdAndDelete(req.params.id);
      const todos = await Todo.find();
      res.json(todos);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
};