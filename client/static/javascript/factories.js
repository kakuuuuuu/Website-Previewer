///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Preview Factory
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
preview_module.factory('previewFactory', function($http, $location, $window){
  //Initialize factory object.
  var factory = {};

  //Calls back end to make request call for HTML string
  factory.getHTML = function(url, callback){
    $http.post('/getHTML', url).success(function(output){
      //Passes HTML string back to controller
      callback(output)
    })
  }
  return factory;
})
