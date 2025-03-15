import jwt from 'jsonwebtoken'
export const generateToken=({payload,secretKey='secretKey'})=>{
   return jwt.sign(payload,secretKey)
}
export const verifyToken=({token,secretKey='secretKey'})=>{
   try{ 
    jwt.verify(token,secretKey)}
   catch(error){
    //console.log(error)
    return {message:error.message}
   }

}