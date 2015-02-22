
exports.new = function(user, pass, email, first, last, industry, company, links){
    return {
        username: user,
        password: pass,
        email: email,
        first: first,
        last: last,
        industry: industry,
        company: company,
        links: links
        investor: true
    }
}
