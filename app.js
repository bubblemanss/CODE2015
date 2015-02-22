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

    return mongo.createPerson(person, function(check){
        if (check) {
            return "Created " + person.type;
        } else {
            return "Failed to create " + person.type;
        }
    }); //change to method for creating person
}

var searchDB = function(query){
    return mongo.search(query, function(data){
        return data;
    }); //change to method for searching
}

var server = http.createServer(function(request, response) {
    var parsedBody = null;
    var searchResponse = null;
    var createResponse = null;

    if (request.method == "POST"){
        request.on("data", function(jsonBody){
            parsedBody = JSON.parse(jsonBody);

            if (parsedBody.method == "create"){
                createResponse = createUser(parsedBody);
            }
            else if (parsedBody.method == "search"){
                searchResponse = searchDB(parsedBody);
            }
        });
    }

    request.on("end", function(){
        response.writeHead(200, {"Content-Type": "application/json"});

        if (parsedBody.method == "create"){
            response.write(JSON.stringify(createResponse));
        }
        else if (parsedBody.method == "search"){
            response.write(JSON.stringify(searchResponse));
        }

        response.end();
    })

});

server.listen(80);
console.log("Server is listening");
