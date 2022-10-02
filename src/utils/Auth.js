const jsonwebtoken=require('jsonwebtoken');
const {tokenSalt}=require('../config/jwt.js')
class Auth{
    static verifiyToken(token){
        try {
            jsonwebtoken.verify(token,tokenSalt);
            return true;
        } catch(e){
            return false
        }
    }
}
module.exports=Auth