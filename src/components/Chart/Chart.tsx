'use client';

import { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

type ChartProps = {
  data: {
    log: number;
    date: string;
  }[];
};

const Chart = ({ data }: ChartProps) => {
  const [chartOptions, setChartOptions] = useState<AgChartOptions | null>(null);

  useEffect(() => {
    setChartOptions({
      data,
      series: [{ type: 'line', xKey: 'date', yKey: 'log' }],
      theme: 'ag-default-dark',
    });
  }, [data]);

  if (!chartOptions) return null;

  return (
    // AgCharsReact component with options passed as prop
    <AgChartsReact options={chartOptions} />
  );
};

export default Chart;
