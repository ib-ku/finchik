// utils/validation.js
function validateTodo(todo) {
  return typeof todo.text === 'string' && todo.text.trim() !== '';
}

module.exports = { validateTodo };
