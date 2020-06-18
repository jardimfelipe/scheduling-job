const groupBy = function (array, key) {
  return array.reduce(function (item, index) {
    (item[index[key]] = item[index[key]] || []).push(index);
    return item;
  }, {});
};

const maxHours = 8;

const arr = [
  {
    id: 1,
    hrs: 1,
  },
  {
    id: 2,
    hrs: 4,
  },
  {
    id: 3,
    hrs: 5,
  },
  {
    id: 4,
    hrs: 7,
  },
];
let unscheduledJobs = arr.sort((a, b) => a.hrs < b.hrs);
const filterUnscheduledJobs = (jobsToFilter) => {
  unscheduledJobs = unscheduledJobs.filter(
    ({ id }) => !jobsToFilter.includes(id)
  );
};
const hasScheduleJob = (scheduledJobs, newJob) => {
  let hasJob = false;
  scheduledJobs.forEach((schldJb) => {
    if (hasJob) return;
    if (schldJb.includes(newJob.id)) {
      hasJob = true;
    }
  });
  return hasJob;
};
const x = unscheduledJobs.reduce((scheduledJobs, newJob) => {
  if (newJob.hrs === maxHours) {
    const newJobGroup = [newJob.id];
    scheduledJobs = [...scheduledJobs, newJobGroup];
    filterUnscheduledJobs(newJobGroup);
  } else {
    unscheduledJobs.forEach((unscheduledJob, index) => {
      const unscheduleTime = unscheduledJob.hrs;
      const newTime = newJob.hrs;
      const result = unscheduleTime + newTime;
      if (result === 8) {
        const newJobGroup = [unscheduledJob.id, newJob.id];
        scheduledJobs = [...scheduledJobs, [...new Set(newJobGroup)]];
        filterUnscheduledJobs(newJobGroup);
      } else {
        const nextJob = unscheduledJobs[index + 1];
        if (nextJob === undefined) {
          const newJobGroup = [unscheduledJob.id, newJob.id];
          scheduledJobs = [...scheduledJobs, [...new Set(newJobGroup)]];
          filterUnscheduledJobs(newJobGroup);
        }
      }
    });
  }
  return scheduledJobs;
}, []);
console.log(x);
// const x = arr.reduce((scheduledJobs, newJob) => {
//   const unscheduledJobs = scheduledDJobs.length
//     ? arr.filter(({ id }) => {
//         scheduledJobs.some((j) => j !== id);
//       })
//     : arr;
//   let jobsGroups = [];
//   unscheduledJobs.forEach((job) => {
//     const hours = job.hrs;
//     unscheduledJobs.forEach((jobB) => {
//       const hoursB = jobB.hrs;
//       const result = hours + hoursB;
//       if (result <= maxHours) {
//         jobsGroups.push({ ids: [job.id, jobB.id], result });
//       }
//     });
//   });
//   jobsGroups = groupBy(jobsGroups, "result");
//   return scheduledJobs;
// }, []);

// const x = arr.reduce((curr, acc) => {
//   const allJobs = curr.length
//     ? arr.filter(({ id }) =>
//         curr.forEach((currJob) => {
//           currJob.some((j) => j !== id);
//         })
//       )
//     : arr;
//   const addedHours = [];
//   allJobs.forEach((job) => {
//     if (!addedHours.length) {
//       if (acc.hrs + job.hrs <= 8) {
//         addedHours.push({ result: acc.hrs + job.hrs, jobs: [acc, job] });
//       }
//     } else {
//       addedHours.forEach((hours, index) => {
//         const result = hours.result + acc.hr;
//         if (result <= 8) {
//           hours.jobs.push(acc);
//         }
//       });
//     }
//   });
//   curr.push(addedHours);
//   return curr;
// }, []);

// const x = arr.reduce((curr, acc) => {
//   const allJobs = curr.length
//     ? arr.filter(({ id }) =>
//         curr.forEach((currJob) => {
//           currJob.some((j) => j !== id);
//         })
//       )
//     : arr;
//   let addedHours = [];
//   allJobs.forEach((job) => {
//     if (!addedHours.length) {
//       if (acc.hrs + job.hrs <= 8) {
//         addedHours.push(groupBy([acc, job], acc.hrs + job.hrs));
//       } else {
//         addedHours.push(groupBy([acc], acc.hrs));
//       }
//     } else {
//       addedHours.forEach((hours, index) => {
//         const result = hours.result + acc.hrs;
//         if (result <= 8) {
//           addedHours.push(groupBy([acc], acc.hrs));
//         }
//       });
//     }
//   });
//   curr.push(addedHours);
//   return curr;
// }, []);
