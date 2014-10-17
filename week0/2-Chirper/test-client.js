var ArgumentParser = require('argparse').ArgumentParser;
var parser = new ArgumentParser({
  version: '0.0.1',
  addHelp:true,
  description: 'Argparse example'
});
parser.addArgument(
  [ '--user' ],
  {
    help: 'Name of the user'
  }
);
parser.addArgument(
  [ '--register' ],
  {
    action:'count',
    help: 'Register'
  }
);
parser.addArgument(
  [ '--getall' ],
  {
    action:'count',
    help: 'Get all chirps'
  }
);
parser.addArgument(
  [ '--getself' ],
  {
    action:'count',
    help: 'Get current user chirps'
  }
);
parser.addArgument(
  [ '--create' ],
  {
    help: 'Create new chirp'
  }
);
parser.addArgument(
  [ '--message' ],
  {
    help: 'Message of the new chirp'
  }
);
var args = parser.parseArgs();
console.log(args);

var fs = require("fs"),
http = require("http"),
userId,key,api_url, action;


      fs.readFile('config.json', 'utf8', function (err, data) {
        if (err) throw err;
        var jsonData = JSON.parse(data);
        console.log(jsonData);

        userId = jsonData["userId"];
        key = jsonData["key"];
        api_url = jsonData["api_url"];



if ( args["getall"] === 1){
  console.log(api_url);
  http.get(api_url + "/all_chirps", function(res) {
    res.on("data", function(data) {
      console.log(data.toString());
    });
  });
}
if (action === "--getmine"){
  http.get(api_url + "/my_chirps", function(res) {
    res.on("data", function(data) {
      console.log(data.toString());
    });
  });
}
if(args["register"] === 1){
  var options = {
  hostname: api_url,
  path: '/register',
  method: 'POST'
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});
req.write('user:' + args["user"]);
req.end();
}



});
