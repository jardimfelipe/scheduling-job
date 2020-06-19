const { MAX_HOURS } = require("./config/config.js");
const { serializeJobs, isInExecDate } = require("./utils/jobs.js");
const inputs = require("./data/inputs.json");
const filterUnscheduledJobs = (jobsToFilter) => {
  unscheduledJobs = unscheduledJobs.filter(
    ({ id }) => !jobsToFilter.includes(id)
  );
};

let unscheduledJobs = serializeJobs(inputs);

const groupedJobs = unscheduledJobs.reduce((scheduledJobs, newJob) => {
  const addToScheduledJobs = (newGroup) => {
    if (!isInExecDate(newGroup)) return;
    const groupIds = newGroup.map(({ id }) => id);
    scheduledJobs = [...scheduledJobs, [...new Set(groupIds)]];
    filterUnscheduledJobs(groupIds);
  };
  if (newJob.estimateTime === MAX_HOURS) {
    addToScheduledJobs([newJob]);
  } else {
    unscheduledJobs.forEach((unscheduledJob, index) => {
      const unscheduleTime = unscheduledJob.estimateTime;
      const newTime = newJob.estimateTime;
      const result = unscheduleTime + newTime;
      if (result === 8) {
        addToScheduledJobs([unscheduledJob, newJob]);
      } else {
        const nextJob = unscheduledJobs[index + 1];
        if (nextJob === undefined) {
          addToScheduledJobs([unscheduledJob, newJob]);
        }
      }
    });
  }
  return scheduledJobs;
}, []);

console.log(groupedJobs);
