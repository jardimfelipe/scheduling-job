const { groupJobs } = require("../../utils/groupJobs.js");
jest.mock("../../config/constants", () => {
    return {
        EXECUTION_WINDOW: {
            initialDate: new Date("2019-11-10 09:00:00"),
            finalDate: new Date("2019-11-11 12:00:00"),
        },
        CLASS_VALUES: {
            0: "id",
            1: "description",
            2: "maxConclusionDate",
            3: "estimateTime",
        },
    };
});
describe("@/utils/groupJobs tests", () => {
    it("groubJobs() should return jobs grouped", () => {
        const jobs = [
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
        const expectedResult = [[1, 3], [2]];
        expect(groupJobs(jobs)).toStrictEqual(expectedResult);
    });
});
