const MAX_HOURS = 8;
const EXECUTION_WINDOW = [
    new Date("2019-11-10 09:00:00"),
    new Date("2019-11-11 12:00:00"),
];
const CLASS_VALUES = {
    0: "id",
    1: "description",
    2: "maxConclusionDate",
    3: "estimateTime",
};

module.exports = { MAX_HOURS, EXECUTION_WINDOW, CLASS_VALUES };
