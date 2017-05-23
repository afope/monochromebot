const initializeBot = require('./app/index.js');
const CronJob = require('cron').CronJob;

const cronOptions = {
    cronTime: "0 0/30 * * *", // Every 30 mins.
    onTick: initializeBot,
    startNow: true,
    runOnInit: true,
    timeZone: 'Africa/Lagos'
};

let job = new CronJob(cronOptions);

// Do amazing things with the `job` instance here. :)