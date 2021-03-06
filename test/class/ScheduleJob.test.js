const ScheduleJob = require('../../class/ScheduleJob.js',);
global.console = {
  error: jest.fn(),
};
describe('./ScheduleJob parameters validation', () => {
  it('should create a instance with all parameters', () => {
    const mockJob = {
      id: 1,
      description: 'Importação de arquivos de fundos',
      maxConclusionDate: '2019-11-10 12:00:00',
      estimateTime: '2 horas',
    };
    const mockInstance = new ScheduleJob(mockJob,);
    expect(mockInstance.id,).toBe(1,);
    expect(mockInstance.description,).toBe('Importação de arquivos de fundos',);
    expect(mockInstance.maxConclusionDate,).toBe('2019-11-10 12:00:00',);
    expect(mockInstance.estimateTime,).toBe('2 horas',);
  },);
  it('should trhow error when a parameter or more is missing', () => {
    const mockJob = {
      description: 'Importação de arquivos de fundos',
      maxConclusionDate: '2019-11-10 12:00:00',
      estimateTime: '2 horas',
    };
    new ScheduleJob(mockJob,);
    expect(global.console.error,).toHaveBeenCalledWith('id is undefined',);
  },);
},);
