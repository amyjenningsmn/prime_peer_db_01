var app = angular.module('assignmentApp', []);
console.log("Angular is running");

// sidenote - If I'm talking $scope I'm binding Angular (JS) functionality to elements on the DOM, just like jQuery.

// everything I do using $http (Ajax) is a REQUEST to the server. Everything I get back from the server is a RESPONSE. Ajax is the technology.

app.controller('StuffController', ['$scope', '$http', function($scope, $http){
    $scope.assignment = {};
    // This empty object will get populated by the information that gets entered into the form on the DOM. $scope binds elements on the DOM to functionality with Angular, and in this case it's dynamically setting new keys, or properties to the 'assignment' object. Example from the DOM: ng-model="assignment.assignment_number" Then it will be used in the sendData() function below to send the individual assignment data to the server, then the database.
    $scope.assignments = [];
    // this is an array to hold the response data from the getAssignments() function below. The purpose of the function is to make an $http request to get all of the assignments at the router address '/assignments'. Once the server sends the response objects, the $scope.assignments array gets populated by the response.data, all of it or "them" really because they're a bunch of assignment objects. Then - because it's on $scope, we can print the assignments on the DOM if we want (which we do).

  $scope.getAssignments = function(){
      $http.get('/assignmentsData').then(function(response){
        // this '/assignmentsData' will correspond to a 'mailbox' on our server, then router.
        console.log(response);
        $scope.assignments = response.data;
        // this populates our empty array above with database assignments
      })
    }

  $scope.sendData = function(){
      // in the parens, first the mailbox (router) then the thing to post I think.
      $http.post('/assignmentsData/add', $scope.assignment).then(function(response){
        // this makes $scope.assignment - our newly populated object from all our data entered in the form - our 'request.body' on the router.post.
        console.log(response);
        $scope.assignment = {};
        // this will reset our form to empty again after it's been sent to the server. But how does it get saved to the database? Not totally understanding how routers save to the database. More questions on assignmentRouter.js
        $scope.getAssignments();
        // this gets the full list of assignments again, now that we've added another.
      })
    }

    window.setInterval($scope.assignments, 5000);
    // this will reprint the assignments every 5 seconds, but why isn't this all in a function? including calling the function below? Are these even related?
    $scope.getAssignments();
    // Are these two linked? Or does this just get us a list of assignments already in the database on loading?


}]);
