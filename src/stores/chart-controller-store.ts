import { create } from 'zustand';

export type SensorShort = 'HD' | 'TP' | 'PH' | 'GH' | 'AQ' | 'LT';

interface ChartControllerState {
  visibleValues: Set<SensorShort>;
  setVisible: (short: SensorShort, isVisible?: boolean) => void;
  toggleVisible: (short: SensorShort) => void;
}

export const useChartControllerStore = create<ChartControllerState>(function chartControllerStore(set, get) {
  return {
    visibleValues: new Set(['HD', 'TP', 'PH', 'GH', 'AQ', 'LT']),
    setVisible: (short: SensorShort, isVisible: boolean = true) => {
      set((state) => ({
        visibleValues: isVisible
          ? new Set([...state.visibleValues, short])
          : new Set([...state.visibleValues].filter((value) => value !== short)),
      }));
    },
    toggleVisible: (short: SensorShort) => get().setVisible(short, !get().visibleValues.has(short)),
  };
});
