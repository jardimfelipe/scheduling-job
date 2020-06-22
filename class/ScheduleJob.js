class ScheduleJob {
    constructor({
        id, description, maxConclusionDate, estimateTime,
    },) {
        if (id === undefined) {
            console.error("id is undefined",);
        }
        if (description === undefined) {
            console.error("description is undefined",);
        }
        if (maxConclusionDate === undefined) {
            console.error("maxConclusionDate is undefined",);
        }
        if (estimateTime === undefined) {
            console.error("estimateTime is undefined",);
        }
        this.id = id;
        this.description = description;
        this.maxConclusionDate = maxConclusionDate;
        this.estimateTime = estimateTime;
    }
}

module.exports = ScheduleJob;
