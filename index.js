class ScheduleJob {
  constructor(id, description, maxConclusionDate, estimateTime) {
    this.id = id;
    this.description = description;
    this.maxConclusionDate = new Date(maxConclusionDate);
    this.estimateTime = parseInt(estimateTime);
  }
}

const scheduleJobs = [
  new ScheduleJob(
    1,
    "Importação de arquivos de fundos",
    "2019-11-10 12:00:00",
    "2 horas"
  ),
  new ScheduleJob(
    2,
    "Importação de dados da Base Legada",
    "2019-11-11 12:00:00",
    "4 horas"
  ),
  new ScheduleJob(
    3,
    "Importação de dados de integração",
    "2019-11-11 08:00:00",
    "6 horas"
  ),
];

const execWindow = [
  new Date("2019-11-10 09:00:00"),
  new Date("2019-11-10 09:00:00"),
];

console.log(a);
