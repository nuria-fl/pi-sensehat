var senseHat  = require('node-sense-hat');
var imu = senseHat.Imu;
var IMU = new imu.IMU();

const logstats = (err, data) => {
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

    handleLed(data.temperature, data.gyro)
}

const handleLed = (temperature, gyro) => {
    const matrix = senseHat.Leds;
    const x = 3;
    const y = 3;
    const red = [temperature * 5, 0, 0];

    // Set a single pixel
    matrix.setPixel(x, y, red);
}

setInterval(() => {
    IMU.getValue(logstats);
}, 5000)
