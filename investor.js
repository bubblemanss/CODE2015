
module.exports = function(data){
    return {
        username:data['user'],
        password:data['password'],
        email:data['email'],
        fullName:data['fullName'],
        industry:data['industry'],
        company:data['company'],
        links:data['links']
    }
}