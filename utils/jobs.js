const { EXECUTION_WINDOW, CLASS_VALUES, } = require('../config/constants.js',);
const ScheduleJob = require('../class/ScheduleJob',);

module.exports = {
  serializeJobs(jobs,) {
    const newJobs = jobs.map((job,) => {
      const values = Object.values(job,).map((objValues,) => objValues,);
      const serielizedJob = values.reduce((curr, acc, index,) => {
        let currJob = curr;
        const key = CLASS_VALUES[index];
        currJob[key] = acc;
        return curr;
      }, {},);
      return new ScheduleJob(serielizedJob,);
    },);
    return newJobs.sort((a, b,) => a.estimateTime < b.estimateTime,);
  },
  isInExecDate(job,) {
    const { initialDate, finalDate, } = EXECUTION_WINDOW;
    const parsedInitExecDate = Date.parse(initialDate,);
    const parsedEndExecDate = Date.parse(finalDate,);
    const parsedJobDate = Date.parse(job.maxConclusionDate,);
    return parsedInitExecDate <= parsedJobDate && parsedEndExecDate >= parsedJobDate;
  },
};
