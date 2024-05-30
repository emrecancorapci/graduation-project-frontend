import { create } from 'zustand';

export type SensorValue = 'HD' | 'TP' | 'PH' | 'GH' | 'AQ' | 'LT';

interface ChartControllerState {
  visibleValues: Set<SensorValue>;
  setVisible: (sensorValue: SensorValue, isVisible?: boolean) => void;
  toggleVisible: (sensorValue: SensorValue) => void;
}

export const useChartControllerStore = create<ChartControllerState>(function chartControllerStore(set, get) {
  return {
    visibleValues: new Set(['HD', 'TP', 'PH', 'GH', 'AQ', 'LT']),
    setVisible: (sensorValue: SensorValue, isVisible: boolean = true) => {
      set((state) => ({
        visibleValues: isVisible
          ? new Set([...state.visibleValues, sensorValue])
          : new Set([...state.visibleValues].filter((value) => value !== sensorValue)),
      }));
    },
    toggleVisible: (sensorValue: SensorValue) => get().setVisible(sensorValue, !get().visibleValues.has(sensorValue)),
  };
});
