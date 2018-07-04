const superagent = require('superagent');


function test1(){
    //ID NOT Found
    superagent.get('localhost:3000/deviceLookup').query({id: 15}).end((err, res)=> {
        if(err.status != 404) console.log('test1 failed');
        else console.log('test1 passed');
    });
}

function test2(){
    //POST incomplete data
    superagent.post('localhost:3000/createDevice').send({'DeviceId' : 15}).end((err, res) => {
        if(err.status != 400) console.log('test2 failed');
        else console.log('test2 passed');
    })
}

function test3(){
    //POST regular data
    superagent.post('localhost:3000/createDevice').send(
        {
        "DeviceID" : 119,
        "DeviceName" : "Shawn's iphone",
        "BatteryStatus" : "100",
        "Longitude" : "12",
        "Latitude" : "444"
        }
    ).end((err, res) => {
        if (res.status == 200){
            console.log('test3 passed');
            superagent.post('localhost:3000/createDevice').send(
                {
                "DeviceID" : 119,
                "DeviceName" : "Shawn's iphone",
                "BatteryStatus" : "100",
                "Longitude" : "12",
                "Latitude" : "444"
                }
            ).end((err, res) => {
                if (res.status == 400) console.log('test4 passed');
                else console.log('test4 failed');
            });
        }
        if (err) console.log('test3 failed');

    })
}



function test5(){
    //testing data lookup
    superagent.post('localhost:3000/createDevice').send(
        {
        "DeviceID" : 1,
        "DeviceName" : "first",
        "BatteryStatus" : "100",
        "Longitude" : "12",
        "Latitude" : "444"
        }
    ).end((err, res) => {
        superagent.get('localhost:3000/deviceLookup').query({id: 1}).end((err, res)=> {
            if(res.body.DeviceID == 1 && res.body.DeviceName == "first") console.log('test5-3 passed');
            else console.log('test5-3 failed');
        });
    });
    superagent.post('localhost:3000/createDevice').send(
        {
        "DeviceID" : 2,
        "DeviceName" : "second",
        "BatteryStatus" : "100",
        "Longitude" : "12",
        "Latitude" : "444"
        }
    ).end((err, res) => {
        superagent.get('localhost:3000/deviceLookup').query({id: 2}).end((err, res)=> {
            if(res.body.DeviceID == 2 && res.body.DeviceName == "second") console.log('test5-2 passed');
            else console.log('test5-2 failed');
            
        });
    });
    superagent.post('localhost:3000/createDevice').send(
        {
        "DeviceID" : 3,
        "DeviceName" : "third",
        "BatteryStatus" : "100",
        "Longitude" : "12",
        "Latitude" : "444"
        }
    ).end((err, res) => {    
        superagent.get('localhost:3000/deviceLookup').query({id: 3}).end((err, res)=> {
            if(res.body.DeviceID == 3 && res.body.DeviceName == "third") console.log('test5-1 passed');
            else console.log('test5-1 failed');
        });
    });



}

test1();
test2();
test3();
test5();