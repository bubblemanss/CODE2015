
module.exports = function(data){
    return {
        type:data['type'],
        username:data['user'],
        password:data['password'],
        email:data['email'],
        firstName:data['firstName'],
        lastName:data['lastName'],
        industry:data['industry'],
        company:data['company'],
        links:data['links']
    }
}