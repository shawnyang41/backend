const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//parse body if needed
app.use(bodyParser.json());

//Fake Database(Multi-thread safe)
let database = [];


/**
 * @api {post} /createDevice Create/Store Device Entry
 * @apiName createDevice
 * @apiGroup Device
 * @apiExample {curl} Example usage:
 *     curl -XPOST -H "Content-type: application/json" -d 
 *      "{
 *	      "DeviceID" : 119,
 *	      "DeviceName" : "IphoneX",
 *	      "BatteryStatus" : "100",
 *	      "Longitude" : "12",
 *	      "Latitude" : "444"
 *      }" 
 *      'localhost:3000/createDevice'
 *
 * @apiSuccess {String} message success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "success"
 *     }
 *
 * @apiError DuplicatedID ID has been added in database.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "DuplicatedID"
 *     }
 * 
 * @apiError MissingFields Request is incomplete.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "error": "MissingFields"
 *     }
 */
//Create Device entry.
app.post('/createDevice', (req, res) => {
    let jsonBody = req.body;
    //Check for incomplete request.
    if(jsonBody.hasOwnProperty('DeviceID') && jsonBody.hasOwnProperty('DeviceName') 
                                    && jsonBody.hasOwnProperty('BatteryStatus') 
                                    && jsonBody.hasOwnProperty('Longitude') 
                                    && jsonBody.hasOwnProperty('Latitude')){
        //Check for duplicated ID.
        for(var index in database){
            if (database[index].DeviceID == jsonBody.DeviceID){
                //found duplicated ID, respond 400.
                res.status(400).json({'error' : 'DuplicatedID'});
                return;
            }
        }

        //All good push to database and respon success message
        res.status(200).json({'message' : 'success'});
        jsonBody.TIMESTEMP = Date.now();
        database.push(jsonBody);
        return;
    }

    //Missing fields
    res.status(400).json({'error' : 'MissingFields'});
    return;
});


/**
 * @api {get} /deviceLookup Look up Device Entry
 * @apiName deviceLookup
 * @apiGroup Device
 * @apiParam {number} id Device's id
 * 
 * @apiExample {curl} Example usage:
 *      curl -XGET 'localhost:3000/deviceLookup?id=14'
 *
 * @apiSuccess {Number} DeviceID Device's Id
 * @apiSuccess {String} DeviceName Device's Name
 * @apiSuccess {String} BatteryStatus Battery's Status
 * @apiSuccess {String} Longitude
 * @apiSuccess {String} Latitude
 * @apiSuccess {Number} TIMESTEMP Time of insertion
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *	        "DeviceID": 119,
 *	        "DeviceName": "Shawn's iphone",
 *	        "BatteryStatus": "100",
 *	        "Longitude": "12",
 *	        "Latitude": "444",
 *	        "TIMESTEMP": 1530735371841
 *       }
 *
 * @apiError IDNotFound ID does not exist.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "IDNotFound"
 *     }
 * 
 */

//Device lookup
app.get('/deviceLookup', (req, res) => {
    let id = req.query.id;
    
    for ( var i in database){
        if (database[i].DeviceID == id){
            //Found and respond.
            res.status(200).json(database[i]);
            return;
        }
    }
    //Not found
    res.status(404).json({'error': 'IDNotFound'});
});



//start listening
app.listen(3000, () => console.log('app listening on port 3000!'));