module.exports = {
    isValidExecutionWindow(dates) {
        const { initialDate, finalDate } = dates;
        const isDateValid = !isNaN(initialDate) && !isNaN(finalDate);
        const initialDateIsSmallerFinalDate =
            Date.parse(initialDate) < Date.parse(finalDate);

        return isDateValid ? initialDateIsSmallerFinalDate : false;
    },
};
