const {
  MAX_HOURS,
  EXECUTION_WINDOW,
  CLASS_VALUES,
} = require("../config/config.js");
const inputs = require("../data/inputs.json");
const ScheduleJob = require("../class/ScheduleJob");

module.exports = {
  serializeJobs(jobs) {
    const newJobs = jobs.map((job) => {
      const values = Object.values(job).map((values) => values);
      const serielizedJob = values.reduce((curr, acc, index) => {
        const key = CLASS_VALUES[index];
        curr[key] = acc;
        return curr;
      }, {});
      return new ScheduleJob(serielizedJob);
    });
    return newJobs.sort((a, b) => a.estimateTime < b.estimateTime);
  },
  isInExecDate(jobs) {
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
  },
};
