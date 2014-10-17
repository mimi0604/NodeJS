var http = require('http'),
fs = require('fs'),
url = require('url'),
qs = require('querystring');



http.createServer(function (req, res) {
  console.log(req.url);
  console.log(req.method);

var url_parts = url.parse(req.url, true);
var query = url_parts.query;
console.log(query);
if(req.url != '/favicon.ico'){

  var payload = "";

  req.on('data', function(chunk) {
        payload += chunk.toString();
  });

  req.on('end', function() {


      fs.readFile('server.json', 'utf8', function (err, data) {
        if (err) throw err;
        var jsonData = JSON.parse(data),
        resData = [];

       if(req.method === "GET") {
        if (req.url === "/all_chirps") {
          jsonData.forEach(function(entry) {
            if(entry["chirpId"]){
              resData.push(entry);

            }
          });
        }


          if (req.url === "/all_users") {
           jsonData.forEach(function(entry) {
            if(entry["user"]){
              resData.push(entry);
            }
           });
          }
          if (req.url.indexOf("/my_chirps") > -1 && query["user"] && query["key"]) {
           jsonData.forEach(function(entry) {
            if(entry["userId"] === query["key"]){
              resData.push(entry);
            }
           });
          }
          if (req.url.indexOf("/chirps") > -1) {
            if(query["userId"]){
              jsonData.forEach(function(entry) {
               if(entry["userId"] === query["userId"]){
                 resData.push(entry);
               }
              });
            } else if (query["chirpId"]) {
              jsonData.forEach(function(entry) {
               if(entry["chirpId"] === query["chirpId"]){
                 resData.push(entry);
               }
              });
            };
          }

          // empty 200 OK response for now
          console.log(payload);
          console.log("Request ended");
          res.writeHead(200, "OK", {'Content-Type': 'text/html'});
          console.log(resData);
          res.end(JSON.stringify(resData));

        } else if(req.method === "POST"){

             console.log("POST:" + payload);
             var postArgs = qs.parse(payload),
             nextUserId = 0,
             nextChirpId = 0;
             jsonData.forEach(function(entry) {
               if(entry["user"] && entry["userId"] > nextUserId){
                 nextUserId = entry["userId"];
                }
                if(entry["chirpId"] && entry["chirpId"] > nextChirpId){
                 nextChirpId = entry["chirpId"];
                }
              });
              nextUserId++;
              nextChirpId++;

             if (req.url === "/chirp") {
               jsonData.push({userId:postArgs["key"],chirpId:nextChirpId,chirpText:postArgs["chirpText"],chirpTime:Date()});
               fs.writeFile("server.json", JSON.stringify(jsonData, null, '\t'), function (err) {
                if (err) throw err;
                console.log('The json file is saved!');
                res.end("The chirp is saved with id:" + nextChirpId);
               });
             }
             if (req.url === "/register") {
               var key = Math.floor((1 + Math.random()) * 0x100000000000).toString(16);
               jsonData.push({user:postArgs["user"],userId:nextUserId,key:key,chirps:0});
               fs.writeFile("server.json", JSON.stringify(jsonData, null, '\t'), function (err) {
                if (err) throw err;
                console.log('The json file is saved!');
                res.end("The user is saved with id:" + nextUserId);
               });

             }
             //res.end(qs.parse(payload));
        }
      });
  });

 // pandaCounter ++;
 // res.writeHead(200, "OK", {'Content-Type': 'text/html'});
 // res.end("PANDATIGAN " + pandaCounter);
}
}).listen(9615);
