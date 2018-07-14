console.log('here')
var util = require('util')
var senseHat  = require('node-sense-hat');
var imu = senseHat.Imu;
var IMU = new imu.IMU();

const matrix = senseHat.Leds;
const x = 3;
const y = 3;
const off = [0, 0, 0];
matrix.setPixel(x, y, off);


IMU.getValue((err, data) => {
    if (err !== null) {
        console.error("Could not read sensor data: ", err);
        return;
    }

    console.log("Accelleration is: ", JSON.stringify(data.accel, null, "  "));
    console.log("Gyroscope is: ", JSON.stringify(data.gyro, null, "  "));
    console.log("Compass is: ", JSON.stringify(data.compass, null, "  "));
    console.log("Fusion data is: ", JSON.stringify(data.fusionPose, null, "  "));

    console.log("Temp is: ", data.temperature);
    console.log("Pressure is: ", data.pressure);
    console.log("Humidity is: ", data.humidity);
});
