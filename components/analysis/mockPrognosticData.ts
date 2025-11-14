export const MOCK_PROGNOSTIC_DATA = {
  componentPredictions: [
    {
      id: 'pred-001',
      componentName: 'Turbine Blade #3',
      aircraft: 'KAAN-002',
      rul: '15 hours',
      confidence: '92%',
      primaryDriver: 'High EGT readings',
    },
    {
      id: 'pred-002',
      componentName: 'Hydraulic Actuator P-78B',
      aircraft: 'KAAN-003',
      rul: '45 cycles',
      confidence: '85%',
      primaryDriver: 'Pressure fluctuations',
    },
  ],
  degradationTrends: [
    {
      componentName: 'Turbine Blade #3',
      data: Array.from({ length: 20 }, (_, i) => ({
        time: i * 5,
        health: 100 - i * i * 0.2,
      })),
    },
    {
      componentName: 'Hydraulic Actuator P-78B',
      data: Array.from({ length: 20 }, (_, i) => ({
        time: i * 10,
        health: 100 - i * 2,
      })),
    },
  ],
};