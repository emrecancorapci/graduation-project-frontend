import { useState } from 'react';
import { CartesianGrid, Label, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import mockData from '@/assets/mock_data.json';
import { useChartControllerStore } from '@/stores/chart-controller-store';

import ChartTooltip from './chart-tooltip';

const formattedData = mockData
  .map((data) => ({
    time: new Date(data.date).toUTCString(),
    timeAxis: new Date(data.date).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
    temp: data.temp,
    hum: data.hum,
    ph: data.ph.toFixed(2),
    g_hum: data.g_hum,
    air: data.air,
    light: data.light,
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

        <Line
          type="monotone"
          hide={!visibleValues.has('TP')}
          dataKey="temp"
          name="Temperature"
          stroke="#82ca9d"
          strokeWidth={2}
          unit="°C"
        />
        <Line
          type="monotone"
          hide={!visibleValues.has('HD')}
          dataKey="hum"
          name="Humidity"
          stroke="#8884d8"
          strokeWidth={2}
          unit="%"
        />
        <Line
          type="monotone"
          hide={!visibleValues.has('PH')}
          dataKey="ph"
          name="pH"
          stroke="#823afd"
          strokeWidth={2}
          unit="pH"
        />
        <Line
          type="monotone"
          hide={!visibleValues.has('GH')}
          dataKey="g_hum"
          name="Ground Humidity"
          stroke="#f88488"
          strokeWidth={2}
          unit="%"
        />
        <Line
          type="monotone"
          hide={!visibleValues.has('AQ')}
          dataKey="air"
          name="Air"
          stroke="#c2ca5d"
          strokeWidth={2}
          unit="%"
        />
        <Line
          type="monotone"
          hide={!visibleValues.has('LT')}
          dataKey="light"
          name="Light"
          stroke="#7ab4f8"
          strokeWidth={2}
          unit="%"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
