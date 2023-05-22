const Ev = require("../model/Even");
const moment = require("moment");
module.exports.createEvent = async (req: any, res: any) => {
  try {
    console.log("hyyyy");
    console.log(req.body);
    
    const event = Ev(req.body);
    await event.save();
    res.sendStatus(201);
  } catch (error) {
    error;
  }
};

module.exports.getEvent = async (req: any, res: any) => {
    console.log("getCalled");
    
  const events = await Ev.find();
  res.send(events);
};
