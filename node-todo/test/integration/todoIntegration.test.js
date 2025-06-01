const mongoose = require('mongoose');
const Todo = require('../../app/models/todo');
const app = require('../../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

describe('Todos API integration', function() {
  this.timeout(10000);

  before(async function() {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect('mongodb://127.0.0.1:27017/test');
      console.log('Подключение к MongoDB успешно установлено');
    }
  });

  after(async function() {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async function() {
    await Todo.deleteMany({});
  });

  it('should create a todo and retrieve it', function(done) {
    let todo = { text: "Integration test todo", isDone: false };
    chai.request(app)
      .post('/api/todos')
      .send(todo)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an('array');
        
        // Берём последний элемент массива — созданный todo
        const createdTodo = res.body[res.body.length - 1];
        createdTodo.should.have.property('text').eql(todo.text);

        chai.request(app)
          .get('/api/todos/' + createdTodo._id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('text').eql('Integration test todo');
            done();
          });
      });
  });
});
