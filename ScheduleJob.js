const CLASS_VALUES = {
  0: "id",
  1: "description",
  2: "maxConclusionDate",
  3: "estimateTime",
};

class ScheduleJob {
  constructor(job) {
    job.forEach((value, index) => {
      this[CLASS_VALUES[index]] = value;
    });
  }
}

module.exports = ScheduleJob;
