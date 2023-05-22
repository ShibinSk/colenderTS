
const router=require('express').Router()

const {createEvent,getEvent} :any=require('../controller/eventController')

router.post('/create-event',createEvent)

router.get('/get-event',getEvent)

module.exports= router