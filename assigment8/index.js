const getAPOD = require('./services/apodService');
const getISSLocation = require('./services/issService');
const getUpcomingLaunches = require('./services/launchService');

(async () => {
  console.log('=== NASA Astronomy Picture of the Day ===');
  try {
    const apod = await getAPOD();
    console.log(apod);
  } catch (err) {
    console.error(err.message);
  }

  console.log('\n===ISS Location (updates every 10s) ===');
  setInterval(async () => {
    try {
      const loc = await getISSLocation();
      console.log(loc);
    } catch (err) {
      console.error(err.message);
    }
  }, 10000);

  console.log('\n===Upcoming Launches ===');
  try {
    const launches = await getUpcomingLaunches();
    launches.forEach((l, i) => console.log(`${i + 1}.`, l));
  } catch (err) {
    console.error(err.message);
  }
})();
