var senseHat = require("node-sense-hat");
var imu = senseHat.Imu;
var IMU = new imu.IMU();

const headingCorrection = (heading, offset = 0) => {
  // Once you have your heading, you must then add your 'Declination Angle', which is the 'Error' of the magnetic field in your location.
  // Find yours here: http://www.magnetic-declination.com/
  const declinationAngle = 0.03106686;

  heading += declinationAngle + offset;

  // Correct for when signs are reversed.
  if (heading < 0) {
    heading += 2 * Math.PI;
  }

  // Check for wrap due to addition of declination.
  if (heading > 2 * Math.PI) {
    heading -= 2 * Math.PI;
  }

  return heading;
};

const headingToDegree = heading => {
  // Convert radians to degrees for readability.
  return (heading * 180) / Math.PI;
};

const logstats = (err, data) => {
  // if (err !== null) {
  //     console.error("Could not read sensor data: ", err);
  //     return;
  // }

  console.log("Accelleration is: ", JSON.stringify(data.accel, null, "  "));
  // console.log("Gyroscope is: ", JSON.stringify(data.gyro, null, "  "));
  console.log("Compass is: ", JSON.stringify(data.compass, null, "  "));
  // console.log("Fusion data is: ", JSON.stringify(data.fusionPose, null, "  "));

  // console.log("Temp is: ", data.temperature);
  // console.log("Pressure is: ", data.pressure);
  // console.log("Humidity is: ", data.humidity);

  console.log(
    "Tilt heading is: ",
    headingToDegree(headingCorrection(data.tiltHeading, Math.PI / 2))
  );

  handleLed(data.temperature, data.accel);
};

const handleLed = (temperature, gyro) => {
  const matrix = senseHat.Leds;
  const x = 3;
  const y = 3;
  const red = Math.floor(temperature * 5);
  const color = [red, 0, 0];

  // Set a single pixel
  matrix.setPixel(x, y, color);
};

setInterval(() => {
  IMU.getValue(logstats);
}, 5000);
