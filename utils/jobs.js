const { EXECUTION_WINDOW, CLASS_VALUES } = require("../config/config.js");
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
        const unscheduledJobs = [...jobs];
        const sortedExecutionWindow = EXECUTION_WINDOW.sort(
            (a, b) => Date.parse(a) > Date.parse(b)
        );
        const parsedInitExecDate = Date.parse(sortedExecutionWindow[0]);
        const parsedEndExecDate = Date.parse(sortedExecutionWindow[1]);
        const sortedByDate = unscheduledJobs.sort(
            (a, b) => a.maxConclusionDate > b.maxConclusionDate
        );
        const parsedMinJobsDate = Date.parse(sortedByDate[0].maxConclusionDate);
        const parsedMmaxJobsDate = Date.parse(
            sortedByDate[sortedByDate.length - 1].maxConclusionDate
        );
        return (
            parsedInitExecDate <= parsedMinJobsDate &&
            parsedEndExecDate >= parsedMmaxJobsDate
        );
    },
};
