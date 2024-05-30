import { useCallback } from 'react';

import { useChartControllerStore } from '@/stores/chart-controller-store';

import Button from './ui/button';
import VisibilitySwitch from './visibility-switch';

export default function ChartController() {
  const { visibleValues, toggleVisible, setVisible } = useChartControllerStore();
  useChartControllerStore();

  const isHdVisible = visibleValues.has('HD');
  const isTpVisible = visibleValues.has('TP');
  const isPhVisible = visibleValues.has('PH');
  const isGhVisible = visibleValues.has('GH');
  const isAqVisible = visibleValues.has('AQ');
  const isLtVisible = visibleValues.has('LT');

  const toggleHd = useCallback(() => toggleVisible('HD'), [toggleVisible]);
  const toggleTp = useCallback(() => toggleVisible('TP'), [toggleVisible]);
  const togglePh = useCallback(() => toggleVisible('PH'), [toggleVisible]);
  const toggleGh = useCallback(() => toggleVisible('GH'), [toggleVisible]);
  const toggleAq = useCallback(() => toggleVisible('AQ'), [toggleVisible]);
  const toggleLt = useCallback(() => toggleVisible('LT'), [toggleVisible]);

  const setAllVisible = useCallback(() => {
    setVisible('HD', true);
    setVisible('TP', true);
    setVisible('PH', true);
    setVisible('GH', true);
    setVisible('AQ', true);
    setVisible('LT', true);
  }, [setVisible]);

  return (
    <div className="grid grid-cols-1 flex-row gap-4 p-4 font-light text-primary">
      <div className="flex flex-row items-center gap-4">
        <h3 className="text-xl font-semibold">Visibility</h3>
        <Button
          className="h-6 w-16"
          variant={
            isHdVisible && isTpVisible && isPhVisible && isGhVisible && isAqVisible && isLtVisible
              ? 'default'
              : 'outline'
          }
          onClick={setAllVisible}
        >
          All
        </Button>
      </div>
      <VisibilitySwitch label="Humidity" isVisible={isHdVisible} onToggle={toggleHd} />
      <VisibilitySwitch label="Temperature" isVisible={isTpVisible} onToggle={toggleTp} />
      <VisibilitySwitch label="pH" isVisible={isPhVisible} onToggle={togglePh} />
      <VisibilitySwitch label="Ground Humidity" isVisible={isGhVisible} onToggle={toggleGh} />
      <VisibilitySwitch label="Air Quality" isVisible={isAqVisible} onToggle={toggleAq} />
      <VisibilitySwitch label="Light" isVisible={isLtVisible} onToggle={toggleLt} />
    </div>
  );
}
