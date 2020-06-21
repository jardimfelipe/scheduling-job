module.exports = {
    checkDatesValidity(dates) {
        const { initialDate, finalDate } = dates;
        if (initialDate.getTime() > finalDate.getTime()) {
            console.error("Initial date should be before finalDate");
            return;
        }
        if (isNaN(Date.parse(initialDate))) {
            console.error("Initial date is not a valid date");
            return;
        }
        if (isNaN(Date.parse(finalDate))) {
            console.error("Final date is not a valid date");
            return;
        }
        return true;
    },
};
