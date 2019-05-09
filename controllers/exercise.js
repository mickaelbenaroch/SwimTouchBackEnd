'use strict';

const {express, logger, models} = require('../configuration/config'),
route       = express.route,
exercise    = models.exercise,
check       = logger.check_body,
uuidv4      = require('uuid/v4'),
valid_class = require('../controllers/API/validate');

//Details - create new exercise
//require - none
//return  - boolean, true/false
route.post('/', (req, res)=>{
    var obj_exercise = {
        _id:                uuidv4(),
        date:               req.body.date, 
        coach:              req.body.coach,
        group:              req.body.group,
        style:              req.body.style,
        distance:           req.body.distance,
        howMuchTouches:     req.body.howMuchTouches,
        routes:             req.body.routes,
        description:        req.body.description,
        type:               req.body.type,
        singleSwimDistance: req.body.singleSwimDistance,
        repeat:             req.body.repeat,
        hasBeenStarted:     req.body.hasBeenStarted
    };

    exercise.createExercise(obj_exercise).then((data) => {
        res.status(200).json({isTrue: true, exercise_id: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});

//Details - get exercises
//require - none (exercises fields is optional) - if empty req body return all exercises
//return  - exercises data by request
route.post('/getExercises', (req, res)=>{
    var obj_exercise = JSON.parse(JSON.stringify({
        _id:                req.body._id,
        date:               req.body.date, 
        coach:              req.body.coach,
        group:              req.body.group,
        style:              req.body.style,
        distance:           req.body.distance,
        howMuchTouches:     req.body.howMuchTouches,
        routes:             req.body.routes,
        description:        req.body.description,
        type:               req.body.type,
        singleSwimDistance: req.body.singleSwimDistance,
        repeat:             req.body.repeat,
        hasBeenStarted:     req.body.hasBeenStarted
    }));

    exercise.getExercises(obj_exercise).then((data) => {
        res.status(200).json({isTrue: true, exercise: data});   
        res.end(); 
    }).catch(err => {
        res.json({isTrue: false, error: err})
        res.status(500)
        res.end()
    })
});


//Details - update exercises
//require - id (exercise id)
//return  - boolean, true/false
route.post('/updateExercise', check('id').not().isEmpty(), (req, res)=>{

    var obj_exercise = JSON.parse(JSON.stringify({
        id:                 req.body.id,
        date:               req.body.date, 
        coach:              req.body.coach,
        group:              req.body.group,
        style:              req.body.style,
        distance:           req.body.distance,
        howMuchTouches:     req.body.howMuchTouches,
        routes:             req.body.routes,
        description:        req.body.description,
        type:               req.body.type,
        singleSwimDistance: req.body.singleSwimDistance,
        repeat:             req.body.repeat,
        hasBeenStarted:     req.body.hasBeenStarted
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        exercise.updateExercises(obj_exercise).then((data) => {
            res.status(200).json({isTrue: true, exercise: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});

//Details - get swimmer exercises 
//require - _id (exercise id)
//return  - swimmer exercise
route.post('/getSwimmerExercises', check('_id').not().isEmpty(), (req, res)=>{

    let obj_exercise = req.body._id;
    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: valid_class.error_valid(validat_result.next().value[0].param) });
    }else{
        exercise.getSwimmerExercises(obj_exercise).then((data) => {
            res.status(200).json({isTrue: true, exercise: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


//Details - update exercises in exercise_db & traininig_db
//require - exercise_id & training_id (field to update is optional)
//return   - bool & mogodb result
route.post('/update', check('exercise_id').not().isEmpty(), check('training_id').not().isEmpty(),  (req, res)=>{
    let obj_exercise = req.body.exercise_id
    let obj_training  = req.body.training_id

    let obj = JSON.parse(JSON.stringify({
        date:           req.body.date, 
        coach:          req.body.coach,
        group:          req.body.group,
        style:          req.body.style,
        distance:       req.body.distance,
        howMuchTouches: req.body.howMuchTouches,
        routes:         req.body.routes,
        description:    req.body.description,
        type:           req.body.type,
        repeat:         req.body.repeat,
        hasBeenStarted: req.body.hasBeenStarted
    }));

    let validat_result = valid_class.valid_chack(req);

    if(validat_result.next().value == false){
        res.status(422).json({ errors: `${validat_result.next().value[0].param} is require` });
    }else{
        exercise.update(obj_exercise, obj_training, obj, obj).then((data) => {
            res.status(200).json({isTrue: true, exercise: data});   
            res.end(); 
        }).catch(err => {
            res.json({isTrue: false, error: err})
            res.status(500)
            res.end()
        })
    }
});


module.exports = route