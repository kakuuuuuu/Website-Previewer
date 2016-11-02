///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Preview Controller
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
preview_module.controller('previewController', function($scope, $http, previewFactory){

  //Initializes variable to compare old url

  var new_url = ""

  //Hides preview if no URL is entered into input field

  $scope.found = false;

  //Updates the preview if text field is changed and user has stopped typing

  $scope.update = function(){

    //Calls HTML Scraping function

    scrape($scope.message)
  }

  //Returns url with http:// added to input if not already there to comply with request call parameters

  function addhttp(url) {
     if (!/^(f|ht)tps?:\/\//i.test(url)) {
       url = "http://" + url
     }
     return url
  }

  //Regex check and scraping function

  function scrape(text) {

    //Regular Expression to check against input string for valid URL

    var urlRegex = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi

    //Checks if any word within string matches a valid URL
    if (text.search(urlRegex) != -1) {

      //Checks if previous url is stored in scope to avoid trim errors
      if($scope.url){
        $scope.url = $scope.url.trim()
      }

      //Trims url from altered input field
      new_url = text.match(urlRegex)[0].trim()

      //Checks if url has changed to avoid refreshing preview unnecessarily
      if($scope.url != new_url){
        //Hides preview
        $scope.found = false;
        //Turns on loading gif for UX due to possible long response time
        $scope.loading = true;
        //Resets condition for possible 404 to off
        $scope.failed = false;
        //Updates stored URL with new one
        $scope.url = text.match(urlRegex)[0]
        //Modify string to comply with backend request
        addhttp($scope.url)
        var data = {url: addhttp($scope.url)}
        //Pass url to factory and then to backend (Call cannot be made from front end due to header issues)
        previewFactory.getHTML(data, function(html){
          //Turns on condition if response was 404 (html string is empty from a front end perspective)
          if(html==""){
            $scope.failed = true;
          }
          else{
            //Turns off loading gif
            $scope.failed = false;
            //Shows preview
            $scope.found = true;
            //Scrapes HTML for title
            var title = html.match(/<title>(.*?)<\/title>/);
            //Scrapes HTML for Open Graph image meta tag
            var image_url = html.match(/<meta [^>]*property=[\"']og:image[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/);
            //Scrapes HTML for Open Graph description meta tag
            var description = html.match(/<meta [^>]*property=[\"']og:description[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/);

            //Creates string without http(s) or www for display purposes
            if ($scope.url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)){
              $scope.link_string = $scope.url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)[1];
            }
            else{
              $scope.link_string = $scope.url;
            }
            //Checks for all three display items in case HTML did not include them
            if(title){
              $scope.title_tag=title[1];
            }
            else{
              $scope.title_tag="No Title Available"
            }
            if(image_url){
              $scope.banner_url=image_url[1];
            }
            else{
              $scope.banner_url="./images/noimg.png";
            }
            if(description){
              $scope.descript=description[1]
            }
            else{
              $scope.descript="No Description Available"
            }
          }
          //turns off loading on failure
          $scope.loading = false;
        })
        }

      }
      //hides preview if there is no URL
      else{
        $scope.found = false;
      }
  }
})
