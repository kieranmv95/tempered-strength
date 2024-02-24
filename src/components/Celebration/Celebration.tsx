'use client';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { Button } from '@/components';
import { clearCelebration } from '@/lib/features/celebration/celebrationSlice';
import { getUnits } from '@/helpers/units';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { useToBlob } from '@hugocxl/react-to-image';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Share = ({ data }: { data: any }) => {
  const [saving, setSaving] = useState(false);
  const dispatch = useAppDispatch();

  const [_, convert, ref] = useToBlob<HTMLDivElement>({
    quality: 1,
    onSuccess: async blob => {
      if (data && blob) {
        const fileName = `${data.exercise}-${data.score.toString()}.png`;
        const file = new File([blob], fileName, { type: 'image/png' }); // Create a file
        const shareData = {
          files: [file],
          title: 'Share Exercise Score',
          text: 'Check out my exercise score!',
        };
        if (navigator.share) {
          try {
            await navigator.share(shareData);
            toast.success('shared successfully');
            setSaving(false);
          } catch (err) {
            console.error('Share failed:', err);
            toast.error('failed to share');
            setSaving(false);
          }
        } else {
          console.log('no navigator');
        }
      }
    },
  });

  return (
    <>
      <div
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-center"
        ref={ref}
        style={{
          fontFamily: "'__Inter_aaf875', '__Inter_Fallback_aaf875'",
        }}
      >
        <img
          src="/TemperedStrength.svg"
          alt="Primary Logo"
          width={400}
          height={188}
          className="w-28 mx-auto mb-6"
        />
        <FontAwesomeIcon
          icon={faTrophy}
          className="w-36 h-36 text-yellow-400"
        />
        <div className="text-2xl mb-4">Congratulations</div>
        <div className="mb-4">
          You logged a new <span className="font-bold">{data.exercise}</span>!
        </div>
        <div className="text-4xl font-bold">
          {data.score}
          {getUnits(data.loggingType)}
        </div>
      </div>
      <div className="absolute bottom-[-60px] left-0 w-full z-[100] grid grid-cols-2 gap-4">
        {(navigator.share as null | {}) && (
          <Button
            type="button"
            onClick={() => {
              setSaving(true);
              setTimeout(() => {
                convert();
              }, 1000);
            }}
            disabled={saving}
            loading={saving}
            className="w-full"
          >
            Share image
          </Button>
        )}
        <Button
          type="button"
          onClick={() => dispatch(clearCelebration())}
          className="w-full"
        >
          Close
        </Button>
      </div>
    </>
  );
};

const Celebration = () => {
  const { data } = useAppSelector(state => state.celebration);

  if (!data) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-4">
        <div className="w-full max-w-[400px] relative">
          <div className="absolute top-[-75px] left-0 w-full z-[100] text-center font-bold">
            <div className="mb-2">Share your success!</div>
            <div className="mb-2">Tag @temperedstrength on IG!</div>
          </div>
          <Share data={data} />
        </div>
      </div>
      <div className="fixed top-0 left-0 bg-black opacity-80 w-full h-full z-[99]" />
    </>
  );
};

export default Celebration;
