'use strict';


const {express, logger, models} = require('../configuration/config'),
route       = express.route,
login       = models.login,
check       = logger.check_body,
valid_class = require('../controllers/API/validate'),
log         = require('../controllers/API/logger');

//Details - signup new user
//require - user & pwd 
//return  - boolean, true/false
route.post('/signup', check('user').isEmail(), check('pwd').isLength({ min: 8 }), (req, res) => {
    var profile = {
        user:       req.body.user, 
        first_name: req.body.first_name,
        last_name:  req.body.last_name,
        age:        req.body.age,
        group:      req.body.group,
        type:       req.body.type
    },
    pwd = req.body.pwd;

    const errors = validationResult(req);
    let validate_array = errors.array();
    
    if (!errors.isEmpty()) {
        //log.log_error(`Signup new user - Incorrect ${validate_array[0].param}, value = ${validate_array[0].value} `);
        return res.status(422).json({ errors: validate_array });
    }

    login.signup(profile, pwd).then((data) => {
        res.status(200).json({isTrue: data});   
        res.end(); 
    }).catch((err) => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    });
});

//Details - upload new picture of user
//require - picture 
//return  - boolean, true/fals & user profile
route.post('/upload', check('picture').not().isEmpty(), (req, res) => {

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        login.picture(req.body.email, req.body.picture).then((data) => {
            res.status(200).json({isTrue: data});   
            res.end(); 
        }).catch((err) => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        });
    }
});

//Details - check user and password for user login
//require - email & pass 
//return  - boolean, true/fals & user profile
route.post('/', check('email').not().isEmpty(), check('pass').not().isEmpty(), (req, res)=>{
    var user_query = req.body.email, 
        pass_query = req.body.pass

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        login.login(user_query, pass_query).then((data) => {
            res.status(200).json({isTrue: data, id: req.body.email});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route