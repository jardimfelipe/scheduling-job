const { isInExecDate, serializeJobs, } = require("../../utils/jobs.js",);
jest.mock("../../config/constants", () => {
  return {
    EXECUTION_WINDOW: {
      initialDate: new Date("2019-11-10 09:00:00",),
      finalDate: new Date("2019-11-11 12:00:00",),
    },
    CLASS_VALUES: {
      0: "id",
      1: "description",
      2: "maxConclusionDate",
      3: "estimateTime",
    },
  };
},);
describe("@/utils functions tests", () => {
  it("isInExecDate() should return true when all dates are in the execution window", () => {
    const job = {
      id: 1,
      description: "Importação de arquivos de fundos",
      maxConclusionDate: "2019-11-10 12:00:00",
      estimateTime: "2 horas",
    };

    expect(isInExecDate(job,),).toBe(true,);
  },);

  it("isInExecDate() should return false when all dates arent in the execution window", () => {
    const jobs = [
      {
        id: 1,
        description: "Importação de arquivos de fundos",
        maxConclusionDate: "2019-11-10 12:00:00",
        estimateTime: "2 horas",
      },
      {
        id: 3,
        description: "Importação de dados de integração",
        maxConclusionDate: "2011-11-11 08:00:00",
        estimateTime: "6 horas",
      },
    ];
    expect(isInExecDate(jobs,),).toBe(false,);
  },);

  it("serializeJobs() should return instances of ScheduleJob class, sorted by date, in decreasing order", () => {
    const data = [
      {
        ID: 1,
        Descrição: "Importação de arquivos de fundos",
        "Data Máxima de conclusão": "2019-11-10 12:00:00",
        "Tempo estimado": "2 horas",
      },
      {
        ID: 2,
        Descrição: "Importação de dados da Base Legada",
        "Data Máxima de conclusão": "2019-11-11 12:00:00",
        "Tempo estimado": "4 horas",
      },
      {
        ID: 3,
        Descrição: "Importação de dados de integração",
        "Data Máxima de conclusão": "2019-11-11 08:00:00",
        "Tempo estimado": "6 horas",
      },
    ];
    const serializedJobs = serializeJobs(data,);
    const parsedFirstDate = Date.parse(serializedJobs[0].maxConclusionDate,);
    const parsedLastDate = Date.parse(serializedJobs[serializedJobs.length - 1].maxConclusionDate,);
    expect(parsedFirstDate > parsedLastDate,).toBe(true,);
  },);
},);
