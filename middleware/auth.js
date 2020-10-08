const jwt = require('jsonwebtoken')
process.env.SECRET_KEY='secret'

module.exports = (req, res, next) =>{
    try{
    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token,process.env.SECRET_KEY);
    req.userdata = decode;
    next();
}catch(error){
    res.json('Authentication failed')
}
}
