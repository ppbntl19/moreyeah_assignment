// require
var moment = require('moment');
var timezone = require('moment-timezone');
var _ = require('underscore');
var User = require("../Models/user");
var User_availability = require("../Models/user_availability");

module.exports = function (app) {

  //Create user or availability
  app.get('/api', function (req, res) {
    res.status(200).json({
      "data": {
        create_availability: " POST /api/user/availability ",
        get_availability: " GET  /api/user/availability/:userId  OR GET  /api/user/availability?userName=test123",
      }
    })
  });

  //Create user availability
  app.post('/api/user/availability', function (req, res) {

    //Check requqired values
    if (!req.body.startTime) return res.status(400).json({ "error": "Please provide a startTime" });
    if (!req.body.endTime) return res.status(400).json({ "error": "Please provide a endTime" });
    if (!req.body.userName) return res.status(400).json({ "error": "Please provide a user" });


    //find user
    User.findOne({ userName: req.body.userName }, function (error, user) {
      //if error
      if (error) return res.status(400).json({ "error": error });
      //Check if user found , create a avaiablity for user
      if (user) {
        //Create availability
        var user_availability = new User_availability({
          startTime: new Date(req.body.startTime).toUTCString(),
          endTime: new Date(req.body.endTime).toUTCString(),
          userId: user._id
        })
        //Save availability
        user_availability.save(function (err, result) {
          //Return error
          if (error) return res.status(400).json({ "error": error });
          //Return created data
          return res.status(200).json({ "data": result });
        });
      } else {
        //Create user
        var new_user = new User({
          userName: req.body.userName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
        });
        //Save user
        new_user.save(function (err, result) {
          //Return error
          if (error) return res.status(400).json({ "error": error });
          //Create availability
          var user_availability = new User_availability({
            startTime: new Date(req.body.startTime).toUTCString(),
            endTime: new Date(req.body.endTime).toUTCString(),
            userId: result._id
          });
          //Save availability
          user_availability.save(function (err, result) {
            //Return error
            if (error) return res.status(400).json({ "error": error });
            //Return created data
            return res.status(200).json({ "data": result });
          });
        });
      }
    });
  });

  //Get all User availability or get only for username
  app.get('/api/user/availability', function (req, res) {
    res.status(200).json({ Ok: true })
  });
  //Get User availability based on userid username
  app.get('/api/user/availability/:userId', function (req, res) {
    //Check required params
    if (!req.params.userId) res.status(400).json({ "error": "Please provide a user" });
    //Get all availability
    User_availability.find({ userId: req.params.userId }).sort({ startTime: -1 }).lean().exec(function (error, results) {
      //Return error
      if (error) return res.status(400).json({ "error": error, message: "System error, try again" });
      //If noe records found
      if (!results) return res.status(200).json({ "data": [], message: "No records found" });
      //Create data based on user timezon and categorized
      //Sort based on start time
      results.sort(function (a, b) {
        var c = new Date(a.startTime);
        var d = new Date(b.startTime);
        return c - d;
      })
      var groups = _.groupBy(results, function (result) {
        return moment(result.startTime).startOf('day').format();
      });
      //Loop on all date keys
      for (var key in groups) {
        var group = groups[key]
        //Create final data (with overlapping enabled)
        var response = []
        //Get values for one field
        group.forEach(function (date, index) {
          ///check overlap time
          var overlapped = false;
          response.forEach(function (n_date, index) {
            if (n_date.endTime > date.startTime) {
              overlapped = true;
              n_date.endTime = date.endTime
            }
          })
          if (overlapped == false) {
            response.push(date)
          }
        })
        //Update group
        groups[key] = response;
      }
      //Cover here Or anaywhere on above loop to based on user time zone
      //Convery date time based on timezone
      if ( req.query.timezone ) {
        for (var key in groups) {
          var group = groups[key]
          //Get values for one field
          group.forEach(function (date, index) {
            date.startTime =    timezone(date.startTime).tz( req.query.timezone).format("YYYY-MM-DD HH:mm:ss z");
            date.endTime =    timezone(date.endTime).tz( req.query.timezone).format("YYYY-MM-DD HH:mm:ss z")
          })
        }
      }
      //Return
      return res.status(200).json({ "data": groups });
    })
  });
};