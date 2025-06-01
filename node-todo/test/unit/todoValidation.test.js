// test/unit/todoValidation.test.js
const chai = require('chai');
const should = chai.should()
const { validateTodo } = require('../../utils/validation'); // пример

describe('Todo validation', () => {
  it('should pass with valid todo', () => {
    const todo = { text: 'Learn testing', isDone: false };
    const result = validateTodo(todo);
    result.should.equal(true);
  });

  it('should fail without text', () => {
    const todo = { isDone: false };
    const result = validateTodo(todo);
    result.should.equal(false);
  });
});
