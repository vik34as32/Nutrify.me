

const IsAdmin = (req,res,next)=>{
    if(req.session.adminEmail){
        next()
    }else{
        console.log("i am not get a dtat")
          res.redirect("/admin") 
    }
}


module.exports = IsAdmin