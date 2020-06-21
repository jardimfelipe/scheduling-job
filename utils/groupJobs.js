const { MAX_HOURS } = require("../config/config.js");
const { isInExecDate, serializeJobs } = require("./jobs");

module.exports = {
    groupJobs(inputs) {
        const filterUnscheduledJobs = (jobsToFilter) => {
            unscheduledJobs = unscheduledJobs.filter(
                ({ id }) => !jobsToFilter.includes(id)
            );
        };
        let unscheduledJobs = serializeJobs(inputs);
        if (!isInExecDate(unscheduledJobs))
            throw new Error("Jobs are out of execution window");
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
