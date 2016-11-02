
module.exports = function(app){
  //Serves Angular Front End
  app.get('/', function(req,res){
    res.render('index.html')
  })
  //Recieve POST request from front end with URL
  app.post('/getHTML', function(req, res){
    //Initialize request module to scrape HTML
    var request = require("request");
    request({
      uri: req.body.url, headers:{'Accept': 'text/html;q=0.9,*/*;q=0.8'}
    }, function(error, response, body) {
      //Debugging checks
      console.log(error)
      console.log(body)
      //Sends HTML string back to front end
      res.json(body)
    });
  })
}
