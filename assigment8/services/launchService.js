const axios = require('axios');

const getUpcomingLaunches = async (filters = {}) => {
  try {
    const url = 'https://ll.thespacedevs.com/2.2.0/launch/upcoming/';
    const res = await axios.get(url, { params: filters });

    if (res.data.results.length === 0) {
      return ['No upcoming launches found for the given criteria.'];
    }

    return res.data.results.map((launch) => ({
      mission: launch.name,
      vehicle: launch.rocket.configuration.name,
      date: launch.net,
      status: launch.status.name
    }));
  } catch (err) {
    throw new Error('Failed to fetch launch data');
  }
};

module.exports = getUpcomingLaunches;
