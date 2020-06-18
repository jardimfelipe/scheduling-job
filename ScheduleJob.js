class ScheduleJob {
  constructor(job) {
    this.id = job[0];
    this.description = job[1];
    this.maxConclusionDate = new Date(job[2]);
    this.estimateTime = parseInt(job[3]);
  }
}

module.exports = ScheduleJob;
