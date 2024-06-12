import { useState } from 'react';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import mockData from '@/assets/mock_data.json';
import sensors from '@/assets/mock-sensors';
import { useChartControllerStore } from '@/stores/chart-controller-store';

import ChartTooltip from './ui/chart-tooltip';

const formattedData = mockData
  .map((data) => ({
    ...data,
    time: new Date(data.time).toUTCString(),
    timeAxis: new Date(data.time).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  }))
  .sort((a, b) => a.time.localeCompare(b.time));

const initialState = {
  chartMarigin: {
    top: 5,
    right: 30,
    left: 20,
    bottom: 20,
  },
  xAxisDomain: ['dataMin', 'dataMax'],
  yAxisDomain: [0, 'dataMax+5'],
};

const strokes = ['#82ca9d', '#8884d8', '#823afd', '#f88488', '#c2ca5d', '#7ab4f8'];

export default function Chart() {
  const visibleValues = useChartControllerStore((state) => state.visibleValues);

  const [chartState] = useState(initialState);

  return (
    <ResponsiveContainer>
      <LineChart width={1200} height={600} data={formattedData} margin={chartState.chartMarigin}>
        <CartesianGrid fill="#222" opacity={0.2} />
        <XAxis domain={chartState.xAxisDomain} dataKey="timeAxis">
          <Label value="Time" position="insideBottom" offset={-10} />
        </XAxis>
        {/* @ts-expect-error Type defined wrongly. It should be (number | string)[] but it is number[] | string[] */}
        <YAxis domain={chartState.yAxisDomain} />
        <Tooltip content={<ChartTooltip />} />
        <Legend verticalAlign="top" height={42} />

        {sensors.map((sensor, index) => (
          <Line
            key={sensor.id}
            type="monotone"
            hide={!visibleValues.has(sensor.short)}
            dataKey={sensor.short.toLowerCase()}
            name={sensor.name}
            // eslint-disable-next-line security/detect-object-injection
            stroke={strokes[index]}
            strokeWidth={2}
            unit={sensor.unit}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
