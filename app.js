var http = require("http");
var user = require("./user");
var investor = require("./investor");
var mongo = require("./mongoFile"); //change to name of file for accessing mongoDB

var createUser = function(data){
    var person = null;
    if (data.type == "user"){
        person = user(data);
    }
    else if (data.type == "investor"){
        person = investor(data);
    }

    mongo.createUser(person); //change to method for creating person
}

var searchDB = function(query){
    return mongo.search(query); //change to method for searching
}

var server = http.createServer(function(request, response) {
    var parsedBody = null;
    var searchData = null;

    if (request.method == "POST"){
        request.on("data", function(jsonBody){
            parsedBody = JSON.parse(jsonBody);

            if (parsedBody.method == "create"){
                createUser(parsedBody);
            }
            else if (parsedBody.method == "search"){
                searchData = searchDB(parsedBody);
            }
        });
    }

    request.on("end", function(){
        response.writeHead(200, {"Content-Type": "application/json"});

        if (parsedBody.method == "create"){
            response.write("Created " + parsedBody.type);
        }
        else if (parsedBody.method == "search"){
            response.write(searchData);
        }

        response.end();
    })

});

server.listen(80);
console.log("Server is listening");
