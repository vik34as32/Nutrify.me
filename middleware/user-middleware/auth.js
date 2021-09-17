const IsUserAuthentication =(req,res,next)=>{
    if(req.session.email){
         
        next()
    }else{
          res.redirect("/signin")
    }

}

module.exports =IsUserAuthentication