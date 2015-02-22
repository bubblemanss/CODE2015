
module.exports = function(data){
    return {
        username:data['user'],
        password:data['password'],
        email:data['email'],
        fullName:data['fullName'],
        education:data['education'],
        industry:data['industry'],
        resume:data['resume'],
        links:data['links']
    }
}