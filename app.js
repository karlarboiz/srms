const express = require('express');
const session = require('express-session')
const path = require('path');
const app = express();
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const cookieParser = require('cookie-parser');
const csrf = require('tiny-csrf');
const csrfMiddleware = require('./middlewares/csrfToken');
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017',
  databaseName:'srmsfinal',
  collection: 'sessions'
});

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs');

const database = require('./database/database');

app.use(express.static('public'));
app.use('/images',express.static('images'))
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())
app.use(session({
    secret:'super-secret',
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge: 2 * 24 * 60 *60 *1000,
        sameSite:'lax'
    }
}))
app.use(cookieParser("cookie-parser-secret"));
app.use(csrf(
    "123456789iamasecret987654321look",
    [process.env.SITE_URL + "/main-route.js"]  
  ))
app.use(async function(req,res,next){
    const user = req.session.user;
    const isAuth = req.session.isAuthenticated;

    if(!user || !isAuth) {
        return next()
    }
    const confirmedAccount = await database.getDbFunc().collection('storedata').findOne({_id: new ObjectId(user.id)});

    const designationUser = confirmedAccount.designation
    res.locals.isAuth = isAuth;
    res.locals.designationUser = designationUser;
    res.locals.userID = confirmedAccount._id;
    next()
})

app.use(csrfMiddleware)

const signupRoute = require('./routes/signup-route');
const login = require('./routes/login-route');
const createSubject = require('./routes/create-subject__routes')
const assignSubjectRoute = require('./routes/assign-subjects__routes')
const mainRoute = require('./routes/main-route');
const settingsRoute = require('./routes/settings__routes');
const studentFuncRoute = require('./routes/student-funcs__routes');
const teacherFuncRoute = require('./routes/teacher-funcs__routes');

app.use('/',login);
app.use('/',signupRoute);
app.use('/',mainRoute)
app.use('/',createSubject);
app.use('/',assignSubjectRoute);

app.use('/',settingsRoute);
app.use('/',studentFuncRoute);
app.use('/',teacherFuncRoute);



database.runFunc().then(()=>{
    app.listen(3000);
})
