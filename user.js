
module.exports = function(data){
    return {
        type:data['type'],
        username:data['user'],
        password:data['password'],
        email:data['email'],
        firstName:data['firstName'],
        lastName:data['lastName'],
        education:data['education'],
        industry:data['industry'],
        resume:data['resume'],
        links:data['links']
    }
}