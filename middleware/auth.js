import jwt from 'jsonwebtoken';

export default function verifyJWT (req, res, next)  {
    const header = req.headers['authorization'];
    if (header !=null){
        const token =header.replace('Bearer ', '');
        jwt.verify(token,"random456",(err,decoded)=>{
            console.log("Decoded token:", decoded);
            if (decoded !== null){
                req.user = decoded;
            } 
        });
        next();
    }
    

 
};
