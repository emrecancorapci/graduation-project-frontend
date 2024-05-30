import { Switch } from './ui/switch';

export default function VisibilitySwitch({
  label,
  isVisible,
  onToggle,
}: {
  label: string;
  isVisible: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Switch checked={isVisible} onCheckedChange={onToggle} />
      <p className="font-semibold">{label}</p>
    </div>
  );
}
