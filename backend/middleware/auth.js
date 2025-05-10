import jwt from 'jsonwebtoken'

const authUser = (req,res,next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(404).json({
            message:"not authorized login again",
                success:false
        })
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: true,
          });
    }
}

export default authUser