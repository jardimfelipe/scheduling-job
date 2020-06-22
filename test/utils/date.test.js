const { isValidExecutionWindow, } = require('../../utils/date.js',);

describe('@/utils/date tests', () => {
  it('isValidExecutionWindow() should return false when EXECUTION_WINDOW has invalid dates', () => {
    const dates = {
      initialDate: '',
      finalDate: new Date('2019-11-11 12:00:00',),
    };

    expect(isValidExecutionWindow(dates,),).toBe(false,);
  },);
  it('isValidExecutionWindow() should return true if inputs valid dates', () => {
    const dates = {
      initialDate: new Date('2019-11-10 09:00:00',),
      finalDate: new Date('2019-11-11 12:00:00',),
    };
    expect(isValidExecutionWindow(dates,),).toBe(true,);
  },);
},);
