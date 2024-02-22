import { getUnits } from '@/helpers/units';
import React from 'react';
import { ILoggingType } from '@/types/IExercise';

type PercentagesBreakdownProps = {
  value: number;
  loggingType: ILoggingType;
};

const PercentagesBreakdown = ({
  value,
  loggingType,
}: PercentagesBreakdownProps) => {
  const units = getUnits(loggingType);
  const calcPercentage = (percent: number) => {
    const parts = value / 100;
    const result = parts * percent;
    let roundedResult;

    if (loggingType === 'weight') {
      roundedResult = Math.round(result * 2) / 2;
    } else {
      roundedResult = Math.round(result);
    }

    return `${roundedResult}${units}`;
  };

  return (
    <>
      <p className="mb-2">
        Showing percentages breakdown based off {value}
        {units}
      </p>
      <div className="grid grid-cols-2 mb-6 gap-3">
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>95%</div>
          <div>{calcPercentage(95)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>90%</div>
          <div>{calcPercentage(90)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>85%</div>
          <div>{calcPercentage(85)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>80%</div>
          <div>{calcPercentage(80)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>75%</div>
          <div>{calcPercentage(75)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>70%</div>
          <div>{calcPercentage(70)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>65%</div>
          <div>{calcPercentage(65)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>60%</div>
          <div>{calcPercentage(60)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>55%</div>
          <div>{calcPercentage(55)}</div>
        </div>
        <div className="flex justify-between bg-zinc-700 px-3 rounded-sm h-11 items-center">
          <div>50%</div>
          <div>{calcPercentage(50)}</div>
        </div>
      </div>
    </>
  );
};

export default PercentagesBreakdown;
