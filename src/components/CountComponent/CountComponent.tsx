'use client';

import CountUp from 'react-countup';

const CountComponent = () => {
  return (
    <div className="flex gap-4 md:gap-12 md:text-center mb-20 xl:mb-0">
      <div>
        <p className="text-4xl mb-2 font-black md:text-7xl md:mb-3">
          <CountUp end={100} duration={3} start={1} />
          <span className="text-egwene-500">+</span>
        </p>
        <p className="text-sm">Trackable Exercises</p>
      </div>
      <div>
        <p className="text-4xl mb-2 font-black md:text-7xl md:mb-3">
          <CountUp end={25} duration={3} start={1} />
          <span className="text-egwene-500">K+</span>
        </p>
        <p className="text-sm">Kilograms logged</p>
      </div>
      <div>
        <p className="text-4xl mb-2 font-black md:text-7xl md:mb-3">
          <CountUp end={900} duration={3} start={1} />
          <span className="text-egwene-500">+</span>
        </p>
        <p className="text-sm">Comparisons made</p>
      </div>
    </div>
  );
};

export default CountComponent;
