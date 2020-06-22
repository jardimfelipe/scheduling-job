module.exports = {
  isValidExecutionWindow(dates,) {
    const { initialDate, finalDate, } = dates;
    const isDateValid = !Number.isNaN(initialDate,) && !Number.isNaN(finalDate,);
    const initialDateIsSmallerFinalDate = Date.parse(initialDate,) < Date.parse(finalDate,);

    return isDateValid ? initialDateIsSmallerFinalDate : false;
  },
};
