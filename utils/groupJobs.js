const { MAX_HOURS, EXECUTION_WINDOW, } = require('../config/constants.js',);
const { isInExecDate, serializeJobs, } = require('./jobs',);
const { isValidExecutionWindow, } = require('./date.js',);

module.exports = {
  groupJobs(inputs,) {
    if (!isValidExecutionWindow(EXECUTION_WINDOW,)) return console.error('Invalid dates',);
    let unscheduledJobs = serializeJobs(inputs,).filter((job,) => isInExecDate(job,),);
    const filterUnscheduledJobs = (jobsToFilter,) => {
      unscheduledJobs = unscheduledJobs.filter(({ id, },) => !jobsToFilter.includes(id,),);
    };
    const groupedJobs = unscheduledJobs.reduce((currentJobs, newJob,) => {
      let scheduledJobs = currentJobs;
      const addToScheduledJobs = (newGroup,) => {
        const groupIds = newGroup.map(({ id, },) => id,);
        scheduledJobs = [...scheduledJobs, [...new Set(groupIds,),],];
        filterUnscheduledJobs(groupIds,);
      };
      if (newJob.estimateTime === MAX_HOURS) {
        addToScheduledJobs([newJob,],);
      } else {
        unscheduledJobs.forEach((unscheduledJob, index,) => {
          const unscheduleTime = unscheduledJob.estimateTime;
          const newTime = newJob.estimateTime;
          const result = unscheduleTime + newTime;
          if (result === 8) {
            addToScheduledJobs([unscheduledJob, newJob,],);
          } else {
            const nextJob = unscheduledJobs[index + 1];
            if (nextJob === undefined) {
              addToScheduledJobs([unscheduledJob, newJob,],);
            }
          }
        },);
      }
      return scheduledJobs;
    }, [],);
    return groupedJobs;
  },
};
