var express = require('express');
var router = express.Router();
var data_src = null;
var data_dest = null;

function Queue() {
    this.elements = [];
}
Queue.prototype.enqueue = function(e) {
    this.elements.push(e);
};
Queue.prototype.dequeue = function() {
    return this.elements.shift();
};
Queue.prototype.isEmpty = function() {
    return this.elements.length === 0;
};
Queue.prototype.peek = function() {
    return !this.isEmpty() ? this.elements[0] : undefined;
};
Queue.prototype.length = function() {
    return this.elements.length;
}


var ambulance1 = new Queue();
var ambulance2 = new Queue();
var ambulance3 = new Queue();


var obj1 = {
    id: 1,
    driverName: "driver 1",
    driverNumber: "0000000001",
    location: {
        lattitude: 22,
        longitude: 88
    },
};


var obj2 = {
    id: 2,
    driverName: "driver 2",
    driverNumber: "0000000002",
    location: {
        lattitude: 22,
        longitude: 88
    },
};

var obj3 = {
    id: 3,
    driverName: "driver 3",
    driverNumber: "0000000003",
    location: {
        lattitude: 22,
        longitude: 88
    },
};

var obj4 = {
    id: 4,
    driverName: "driver 4",
    driverNumber: "0000000004",
    location: {
        lattitude: 24,
        longitude: 11
    },
};

var obj5 = {
    id: 5,
    driverName: "driver 5",
    driverNumber: "0000000005",
    location: {
        lattitude: 24,
        longitude: 11
    },
};

var obj6 = {
    id: 6,
    driverName: "driver 6",
    driverNumber: "0000000006",
    location: {
        lattitude: 24,
        longitude: 11
    },
};

var obj7 = {
    id: 7,
    driverName: "driver 7",
    driverNumber: "0000000007",
    location: {
        lattitude: 22.563127,
        longitude: 88.412058
    },
};

var obj8 = {
    id: 8,
    driverName: "driver 8",
    driverNumber: "0000000008",
    location: {
        lattitude: 22.563127,
        longitude: 88.412058
    },
};

var obj9 = {
    id: 9,
    driverName: "driver 9",
    driverNumber: "0000000009",
    location: {
        lattitude: 22.563127,
        longitude: 88.412058
    },
};


ambulance1.enqueue(obj1);
ambulance1.enqueue(obj2);
ambulance1.enqueue(obj3);

ambulance2.enqueue(obj4);
ambulance2.enqueue(obj5);
ambulance2.enqueue(obj6);

ambulance3.enqueue(obj7);
ambulance3.enqueue(obj8);
ambulance3.enqueue(obj9);

var totalHospital = [{
        Hid: 1,
        Hname: "AMRI",
        Hambulance: ambulance1
    },

    {
        Hid: 2,
        Hname: "NRS",
        Hambulance: ambulance2
    },

    {
        Hid: 3,
        Hname: "MEDICARE",
        Hambulance: ambulance3
    }
];





/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home.ejs', {
        title: 'Fuber'
    });
});


router.get("/book", function(req, res, next) {

    var lattitude = data_src.src_lattitude;
    var longitude = data_src.src_longitude;
    var userLocation = {
        lattitude: lattitude,
        longitude: longitude
    };
    //var color = data_src.color_choice;
    /*
    var cab = getClosestCab(userLocation);


    if (cab) {
      cab.isBooked = true;
      res.render('book.ejs', {
        message: "Cab booked!",
        cabID: cab.id,
        driverName: cab.driverName,
        location: cab.location,
        distance: getDistance(userLocation, cab.location),
      });

    }
    */


    var hospital = getClosestHospital(userLocation);

    if (hospital) {
        res.render('book.ejs', {
            message: "Ambulance booked!",
            nearestHospital: hospital.Hname,
            cabID: hospital.Hambulance.peek().id,
            driverName: hospital.Hambulance.peek().driverName,
            location: hospital.Hambulance.peek().location,
            distance: getDistance(userLocation, hospital.Hambulance.peek().location),
        });

        hospital.Hambulance.dequeue();

    } else {
        res.json({
            message: "No cabs available!"
        });
    }

});

router.get('/ride', function(req, res, next) {
    res.render('ride.ejs');
});


router.post('/ride', function(req, res, next) {
    data_src = {
        src_lattitude: req.body.userLatitude,
        src_longitude: req.body.userLongitude
    };
    console.log(req.body.userLatitude);
    console.log(req.body.userLongitude);
    res.json({
        status: "success"
    });

});


/*
router.get('/complete', function(req, res, next) {

  var cabID = parseInt(data_dest.driverid);
  var lattitude = parseInt(data_dest.dest_lattitude);
  var longitude = parseInt(data_dest.dest_longitude);
  var location = {
    lattitude: lattitude,
    longitude: longitude
  };
  var userCab = null;
  cabs.forEach(function(cab) {
    if (cabID === cab.id) {
      userCab = cab;
    }
  });
  if (userCab) {
    if (userCab.isBooked) {
      userCab.isBooked = false;
      var distance = getDistance(userCab.location, location);
      var fare = getFare(distance);
      userCab.location = location;
      res.render('complete.ejs', {
        message: "Ride completed!",
        distance: distance,
        fare: fare
      });
    } else {
      res.json({
        message: "Can't complete ride for a cab which is not booked!"
      });
    }
  } else {
    res.json({
      message: "Could not find cab with id " + cabID
    });
  }
});

router.get('/stop', function(req, res, next) {
  res.render('stop.ejs');
});
router.post('/stop', function(req, res, next) {
  data_dest = {
    dest_lattitude: req.body.destlat,
    dest_longitude: req.body.destlon,
    driverid: req.body.driverid
  };
  res.redirect("/complete");
});

*/


router.get('/contact', function(req, res, next) {
    res.render('contact.ejs');
});
router.get('/showall', function(req, res, next) {
    res.json({
        cabs: cabs
    });
});

/*
function getDistance(location1, location2) {
  var a = location1.lattitude - location2.lattitude;
  var b = location1.longitude - location2.longitude;
  var c = Math.sqrt(a * a + b * b);
  return c;
}
*/


var rad = function(x) {
    return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2.lattitude - p1.lattitude);
    var dLong = rad(p2.longitude - p1.longitude);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lattitude)) * Math.cos(rad(p2.lattitude)) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d / 1000; // returns the distance in meter
};


function getClosestHospital(location) {
    var closest = null;
    var closestDistance = Infinity;


    totalHospital.forEach(function(hospital) {
        if (!hospital.Hambulance.isEmpty()) {
            var distance = getDistance(hospital.Hambulance.peek().location, location);
            if (distance < closestDistance) {
                closestDistance = distance;
                closest = hospital;
            }
        }
    });

    return closest;
}

function getFare(distance) {
    let k = 12;
    let fare = k + (distance - 1) * 7;
    return fare;
}

module.exports = router;