var app = angular.module('app', []);

console.log("client.js is working");

app.controller("MainController", ['$scope', '$http', function($scope, $http){
  $scope.assignment = {};
  $scope.assignments = [];
  $scope.test = 'BLAH';
  var getAssignment = function(){
    $http.get('/assignments').then(function(response){
      if(response.status !==200){
        throw new Error('Failed to fetch assignment from the API');

      }
      $scope.assignment = {};
      $scope.assignments = response.data;
      return response.data;
    })
  };
  $scope.add = function(assignment){
     console.log(assignment);
     $http.post('/assignment/create', assignment).then(getAssignment());
  };
  getAssignment();
}]);
