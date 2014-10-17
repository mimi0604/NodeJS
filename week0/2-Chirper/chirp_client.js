var http = require('http');
console.log(process.argv[2]);
if(process.argv[2] === "--getall"){
 http.get("http://localhost:9615/all_chirps", function(res) {
     console.log("Got response: " + res);
     res.on("data", function(data) {
       console.log(data.toString());
     });
  }).on('error', function(e) {
     console.log("Got error: " + e.message);
  });
}

