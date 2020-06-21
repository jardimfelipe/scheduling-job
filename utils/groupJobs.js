const { MAX_HOURS, EXECUTION_WINDOW } = require("../config/config.js");
const { isInExecDate, serializeJobs } = require("./jobs");
const { checkDatesValidity } = require("./date.js");

module.exports = {
    groupJobs(inputs) {
        if (!checkDatesValidity(EXECUTION_WINDOW)) return;
        const filterUnscheduledJobs = (jobsToFilter) => {
            unscheduledJobs = unscheduledJobs.filter(
                ({ id }) => !jobsToFilter.includes(id)
            );
        };
        let unscheduledJobs = serializeJobs(inputs).filter((job) =>
            isInExecDate(job)
        );
        const groupedJobs = unscheduledJobs.reduce((scheduledJobs, newJob) => {
            const addToScheduledJobs = (newGroup) => {
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
        return groupedJobs;
    },
};
