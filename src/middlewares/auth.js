const isLoggedIn = (req, res, next) =>{
    if(req.user){
        next()
    }else{
        res.status(401).json({error: "No estas logueado"})
    }
}

module.exports = isLoggedIn;