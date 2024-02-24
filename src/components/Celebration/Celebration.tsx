'use client';

import TemperedStrengthSvg from '@/assets/TemperedStrength.svg';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from '@/components';
import { clearCelebration } from '@/lib/features/celebration/celebrationSlice';
import { getUnits } from '@/helpers/units';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useToPng } from '@hugocxl/react-to-image';

const Celebration = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(state => state.celebration);

  const [_, convert, ref] = useToPng<HTMLDivElement>({
    quality: 1,
    onSuccess: successData => {
      if (data) {
        const link = document.createElement('a');
        link.download = `${data.exercise}-${data.score.toString()}.jpeg`;
        link.href = successData;
        link.click();
      }
    },
  });

  if (!data) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-4">
        <div className="w-full max-w-[400px] relative">
          <div className="absolute top-[-75px] left-0 w-full z-[100] text-center font-bold">
            <div className="mb-2">Share your success!</div>
            <div className="mb-2">Tag @temperedstrength on IG!</div>
          </div>
          <div
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-center"
            ref={ref}
          >
            <Image
              src={TemperedStrengthSvg}
              alt="Primary Logo"
              width={400}
              height={188}
              className="w-28 mx-auto mb-6"
              priority
            />
            <FontAwesomeIcon
              icon={faTrophy}
              className="w-36 h-36 text-yellow-400"
            />
            <div className="text-2xl mb-4">Congratulations</div>
            <div className="mb-4">
              You logged a new{' '}
              <span className="font-bold">{data.exercise}</span>!
            </div>
            <div className="text-4xl font-bold">
              {data.score}
              {getUnits(data.loggingType)}
            </div>
          </div>
          <div className="absolute bottom-[-60px] left-0 w-full z-[100] grid grid-cols-2 gap-4">
            <Button type="button" onClick={convert} className="w-full">
              Save image
            </Button>
            <Button
              type="button"
              onClick={() => dispatch(clearCelebration())}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 bg-black opacity-80 w-full h-full z-[99]" />
    </>
  );
};

export default Celebration;
