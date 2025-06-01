angular.module('todoController', [])

.controller('mainController', ['$scope', '$http', 'Todos', function($scope, $http, Todos) {
  $scope.formData = {};
  $scope.loading = true;

  // Получить все todo
  Todos.get()
    .success(function(data) {
      $scope.todos = data;
      $scope.loading = false;
    });

  // Создать новое todo
  $scope.createTodo = function() {
    if ($scope.formData.text !== undefined && $scope.formData.text !== '') {
      $scope.loading = true;

      Todos.create($scope.formData)
        .success(function(data) {
          $scope.loading = false;
          $scope.formData = {};
          $scope.todos = data;
        });
    }
  };

  // Удалить todo
  $scope.deleteTodo = function(id) {
    $scope.loading = true;

    Todos.delete(id)
      .success(function(data) {
        $scope.loading = false;
        $scope.todos = data;
      });
  };
}]);
