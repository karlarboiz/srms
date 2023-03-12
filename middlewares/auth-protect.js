function guardRoute(req,res,next){
    if(!res.locals.isAuth) {
        return res.redirect('/not-found')
    }
    next()
}

module.exports = {
    guardRoute:guardRoute
};