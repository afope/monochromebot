//OnInterval
var threeSecondInterval = function(){
    console.log("Another 3 seconds have gone by. What did you do in them?");
}
setInterval(threeSecondInterval, 3000)

//For specific times, use a chron job
var fifteenSeconsAfterMinute = function() {
  console.log("Another minute is gone forever. Hopefully, you made the most of it...");
}
var CronJob = require('cron').CronJob;
new CronJob({
  cronTime: "15 * * * * *",//15 seconds after every minute
  onTick: fifteenSeconsAfterMinute,
  start: true,
  timeZone: "America/Los_Angeles"
});

const initializeBot = require('./app/index.js');
const CronJob = require('cron').CronJob;

const cronOptions = {
    cronTime: "0 0/30 * * *", // Every 30 mins.
    onTick: initializeBot,
    startNow: true,
    runOnInit: true,
    onComplete: () => console.info('Fin... Next post is in 30mins :)'),
    timeZone: 'Africa/Lagos'
};

let job = new CronJob(cronOptions);

// Do amazing things with the `job` instance here. :)
