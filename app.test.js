const { isInExecDate } = require("./app.js");

describe("./App functions tests", () => {
  it("isInExecDate() returns true when all dates are in the execution window", () => {
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
        maxConclusionDate: "2019-11-11 08:00:00",
        estimateTime: "6 horas",
      },
    ];
    expect(isInExecDate(jobs)).toBe(true);
  });

  it("isInExecDate() returns false when all dates arent in the execution window", () => {
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
    expect(isInExecDate(jobs)).toBe(false);
  });
});
