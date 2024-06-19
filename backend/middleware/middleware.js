import jwt from "jsonwebtoken"


export const getteacherMiddleware = async (req, res, next) => {
    
           const token=req.headers.authorization.split(" ")[1]
           
           if(!token){
           return res.status(401).json({message:"Unauthorized"})
            }
           try {
            const decoded=jwt.verify(token,"mysecretkey")
            req.user=decoded
            next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }

}

export const getSubjectMiddleware=async(req,res,next)=>{

    const token=req.headers.authorization.split(" ")[1]

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }
    try {
        const decoded=jwt.verify(token,"mysecretkey")
        req.query=decoded
        next()
    } catch (error) {
        res.status(401).json({message:"Unauthorized"})
    }




}
