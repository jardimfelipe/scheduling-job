const MAX_HOURS = 8;
const EXECUTION_WINDOW = [
  new Date("2019-11-10 09:00:00"),
  new Date("2019-11-10 09:00:00"),
];

const inputs = require("./inputs.json");
const ScheduleJob = require("./ScheduleJob");

const jobs = inputs.map((job) => {
  const values = Object.values(job).map((values) => values);
  return new ScheduleJob(values);
});
// sort jobs based on estimate time
let unscheduledJobs = jobs.sort((a, b) => a.estimateTime < b.estimateTime);

// filter and remove jobs that has been added on groups
const filterUnscheduledJobs = (jobsToFilter) => {
  unscheduledJobs = unscheduledJobs.filter(
    ({ id }) => !jobsToFilter.includes(id)
  );
};

// Verify if this jobs are in execution date
const isInExecDate = (jobs) => {
  const parsedInitExecDate = Date.parse(EXECUTION_WINDOW[0]);
  const parsedEndExecDate = Date.parse(EXECUTION_WINDOW[1]);
  const sortedByDate = jobs.sort(
    (a, b) => a.maxConclusionDate > b.maxConclusionDate
  );
  const parsedMinJobsDate = Date.parse(sortedByDate[0].maxConclusionDate);
  const parsedMmaxJobsDate = Date.parse(
    sortedByDate[sortedByDate.length - 1].maxConclusionDate
  );
  return (
    parsedInitExecDate < parsedMinJobsDate &&
    parsedEndExecDate < parsedMmaxJobsDate
  );
};

// grouping jobs
const groupedJobs = unscheduledJobs.reduce((scheduledJobs, newJob) => {
  const addToScheduledJobs = (newGroup) => {
    if (!isInExecDate(newGroup)) return;
    const groupIds = newGroup.map(({ id }) => id);
    scheduledJobs = [...scheduledJobs, [...new Set(groupIds)]];
    filterUnscheduledJobs(groupIds);
  };
  // if a job already has 8 hours of estimate time, group it
  if (newJob.estimateTime === MAX_HOURS) {
    addToScheduledJobs([newJob]);
  } else {
    //   go through all unscheduledJobs
    unscheduledJobs.forEach((unscheduledJob, index) => {
      const unscheduleTime = unscheduledJob.estimateTime;
      const newTime = newJob.estimateTime;
      const result = unscheduleTime + newTime;
      //   if result of two jobs are 8, group it
      if (result === 8) {
        addToScheduledJobs([unscheduledJob, newJob]);
      } else {
        const nextJob = unscheduledJobs[index + 1];
        // if doesnt have another job, group this jobs
        if (nextJob === undefined) {
          addToScheduledJobs([unscheduledJob, newJob]);
        }
      }
    });
  }
  return scheduledJobs;
}, []);

console.log(groupedJobs);
