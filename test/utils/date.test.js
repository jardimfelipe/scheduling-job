const { checkDatesValidity } = require("../../utils/date.js");
global.console = {
    log: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
};
describe("@/utils/date tests", () => {
    it("checkDatesValidity() should return true if inputs valid dates", () => {
        const dates = {
            initialDate: new Date("2019-11-10 09:00:00"),
            finalDate: new Date("2019-11-11 12:00:00"),
        };
        expect(checkDatesValidity(dates)).toBe(true);
    });
    it("checkDatesValidity() should return an error when initial date is after final date ", () => {
        const dates = {
            initialDate: new Date("2019-11-12 09:00:00"),
            finalDate: new Date("2019-11-11 12:00:00"),
        };
        checkDatesValidity(dates);
        expect(global.console.error).toHaveBeenCalledWith(
            "Initial date should be before finalDate"
        );
    });
});
