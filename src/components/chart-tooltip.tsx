import { useMemo } from 'react';
import { Payload } from 'recharts/types/component/DefaultTooltipContent';

type CustomPayload = Payload<string, string>;

interface CustomTooltipProperties {
  active?: boolean;
  payload?: CustomPayload[];
  label?: number;
}

export default function ChartTooltip({ active, payload, label }: CustomTooltipProperties) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="flex flex-col justify-center rounded-lg border border-border/80 bg-card/80 p-2 backdrop-blur-sm">
        <h3 className="w-full text-center text-lg font-bold text-primary">{label}</h3>
        <div className="flex flex-col p-2">
          {payload.map((singlePayload: CustomPayload) => (
            <KvPair key={singlePayload.name} payload={singlePayload} />
          ))}
        </div>
      </div>
    );
  }
  return;
}

function KvPair({ payload }: { payload: CustomPayload }) {
  const memoizedStyle = useMemo(() => {
    return {
      color: payload.color ?? 'white',
    };
  }, [payload.color]);
  return (
    <div className="flex flex-row justify-between gap-6 *:text-right">
      <p style={memoizedStyle} className="font-bold">
        {payload.name}
      </p>
      <p className="font-extralight text-card-foreground">
        {payload.value}
        {payload.unit}
      </p>
    </div>
  );
}
