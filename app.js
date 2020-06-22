const inputs = require("./data/inputs.json",);
const { groupJobs, } = require("./utils/groupJobs",);

const groupedJobs = groupJobs(inputs,);

console.log(groupedJobs,);
