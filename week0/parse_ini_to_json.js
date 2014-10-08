var os = require('os');
var fs = require('fs');
var http = require('http');


function ParseIniToJSON(parse_data) {

   var json_file_name = process.argv[2].replace(/((.*)(\/))*(\w+)(\.)*(.*)/, '$4.json'),
   parsedString = parse_data.split(os.EOL),
   jsonObject = new Array(),
   elementTitle, elementValue, pos, jsonElement, section, section_name;

   parsedString.forEach(function(element){

      if (element.match(/\[(.*)\]/)){

        /*Close old section when a new section appears*/
        if (typeof(section_name) != "undefined") {
           /*console.log(section_name);*/
           section[section_name] = jsonElement;
           jsonObject.push(section);
           /*console.log(section);*/
        }
        /* start new section*/
        section_name = element.replace(/\[(.*)\]/, '$1');
        section = {};
        jsonElement = {};
      } else if(element.trim()!="" && !element.trim().match(/;(.*)/) ) {
        pos = element.indexOf("=");
        elementTitle = element.substring(0,pos).trim();
        elementValue = element.substring(pos+1).trim();
        jsonElement[elementTitle] = elementValue;
      }
   });

   /* close last section */
   section[section_name] = jsonElement;
   jsonObject.push(section);
   fs.writeFile(json_file_name, JSON.stringify(jsonObject, null, '\t'), function (err) {
      if (err) throw err;
      console.log('The json file is saved!');
   });
}



/* Check if the ini file is local or http and call ParseIniToJson */
if(process.argv[2].match("/http:(.*)/")){
  http.get("http://www.google.com/index.html", function(res) {
     console.log("Got response: " + res);
     res.on("data", function(data) {
       ParseIniToJSON(data);
     });
  }).on('error', function(e) {
     console.log("Got error: " + e.message);
  });
} else {
  fs.readFile(process.argv[2], 'utf8', function (err, data) {
    if (err) throw err;
    ParseIniToJSON(data);
  });
}


