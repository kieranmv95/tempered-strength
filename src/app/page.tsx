'use client';

import Image from 'next/image';
import { SearchForUserFormLarge } from '@/components/Forms';
import Link from 'next/link';
import CountUp from 'react-countup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="container m-auto pt-20 relative px-4 xl:py-28">
          <h1 className="text-3xl mb-8 font-black md:text-7xl md:mb-12">
            LIFT IT <span className="text-egwene-500">TRACK IT</span>
            <br />
            SHARE IT <span className="text-egwene-500">COMPETE</span>
          </h1>
          <p className="w-full max-w-[442px] mb-12 md:mb-20">
            Track your lifts, share achievements, and challenge friends with
            Tempered Strength. Elevate your workouts and claim victory in the
            ultimate fitness companion app.
          </p>

          <div className="flex gap-4 mb-12 md:mb-20">
            <Link
              className="bg-egwene-500 text-rand-500 text-center font-semibold rounded-full w-28 py-3 md:w-44 md:py-6"
              href="/sign-up"
            >
              Join Now
            </Link>
            <Link
              className="bg-rand-400 text-thom text-center font-semibold rounded-full w-28 py-3 md:w-44 md:py-6"
              href="/sign-in"
            >
              Sign In
            </Link>
          </div>

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

          <Image
            className="w-full max-w-[800px] mx-auto xl:absolute xl:top-32 xl:right-[-10rem] 2xl:right-0 2xl:max-w-[900px] 2xl:top-20"
            src="/split-jerk.png"
            alt="man deadlifting"
            width={1824}
            height={1418}
          />
        </div>
      </div>

      <div className="text-center py-24 bg-rand-400 xl:py-28">
        <h2 className="text-2xl font-black lg:text-3xl">SEARCH FOR A USER</h2>
        <div className="mx-auto md:w-full max-w-2xl px-4">
          <SearchForUserFormLarge />
        </div>
      </div>

      <div className="container text-center py-24 px-4 xl:py-28 mx-auto">
        <h2 className="mb-2 text-2xl font-black lg:text-3xl md:mb-4">
          YOUR 1RM&apos;S IN <span className="text-egwene-500">ONE</span> PLACE
        </h2>
        <p className="font-bold md:font-black md:text-lg mb-4 md:mb-12">
          LIFTING, ROWING RUNNING YOU NAME IT
        </p>
        <p className="w-full max-w-3xl mx-auto mb-8 md:mb-12">
          Capture your fitness milestones across the board, from sprints to
          marathons, rowing to powerlifting, and bodybuilding to Olympic
          lifting. Tempered Strength is your all-encompassing tracker for
          personal bests in every discipline. Keep every record breaking moment
          in one convenient place, ensuring you never lose sight of your
          progress across all your athletic endeavours.
        </p>
        <div className="flex gap-6 justify-center md:gap-6 flex-wrap">
          <div className="flex bg-rand-400 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-egwene-500 w-6 h-6 md:w-11 md:h-11"
            />
            <p className="text-xl font-black md:text-3xl">172.5kg</p>
            <p className="md:text-lg text-success-500">+12.5kg</p>
          </div>
          <div className="flex bg-rand-400 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-egwene-500 w-6 h-6 md:w-11 md:h-11"
            />
            <p className="text-xl font-black md:text-3xl">172.5kg</p>
            <p className="md:text-lg text-success-500">+12.5kg</p>
          </div>
          <div className="flex bg-rand-400 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-egwene-500 w-6 h-6 md:w-11 md:h-11"
            />
            <p className="text-xl font-black md:text-3xl">172.5kg</p>
            <p className="md:text-lg text-success-500">+12.5kg</p>
          </div>
          <div className="hidden lg:flex bg-rand-400 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-egwene-500 w-6 h-6 md:w-11 md:h-11"
            />
            <p className="text-xl font-black md:text-3xl">172.5kg</p>
            <p className="md:text-lg text-success-500">+12.5kg</p>
          </div>
        </div>
      </div>

      <div className="bg-rand-400">
        <div className="container text-center py-24 px-4 xl:py-28 mx-auto">
          <h2 className="text-2xl font-black lg:text-3xl mb-4 md:mb-12">
            SHOWCASE <span className="text-egwene-500">YOUR</span> LIFTS
          </h2>
          <p className="w-full max-w-3xl mx-auto mb-8 md:mb-12">
            Showcase your strength with a personalized public profile, combining
            your powerlifting weights and Olympic lifting totals in one seamless
            display. Share your comprehensive fitness journey with friends and
            inspire a community of strength.
          </p>
          <div className="max-w-3xl mx-auto w-full">
            <p className="mb-4 font-bold md:text-xl md:mb-6">
              POWERLIFTING TOTAL: 480KG
            </p>
            <div className="grid grid-cols-3 gap-4 mb-4 md:mb-6 md:text-lg">
              <div className="grid bg-rand-500 gap-3 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p>Deadlift</p>
                <p className="font-bold">200kg</p>
              </div>
              <div className="grid bg-rand-500 gap-3 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p className="md:text-lg">Squat</p>
                <p className="md:text-lg font-bold">180kg</p>
              </div>
              <div className="grid bg-rand-500 gap-3 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p className="md:text-lg">Bench</p>
                <p className="md:text-lg font-bold">100kg</p>
              </div>
            </div>
            <p className="mb-4 font-bold md:text-xl md:mb-6">
              OLYMPIC LIFTING TOTAL: 240KG
            </p>
            <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6 md:text-lg">
              <div className="grid bg-rand-500 gap-3 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p>Clean & Jerk</p>
                <p className="font-bold">130kg</p>
              </div>
              <div className="grid bg-rand-500 gap-3 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p>Snatch</p>
                <p className="font-bold">110kg</p>
              </div>
            </div>
            <div className="grid gap-4 md:gap-6 md:text-lg">
              <div className="grid grid-cols-[auto_auto] justify-between bg-rand-500 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p>Overhead Squat</p>
                <p className="font-bold">100kg</p>
              </div>
              <div className="grid grid-cols-[auto_auto] justify-between bg-rand-500 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p>Shoulder Press</p>
                <p className="font-bold">67.5kg</p>
              </div>
              <div className="grid grid-cols-[auto_auto] justify-between bg-rand-500 gap-3 md:gap-6 py-3 px-4 md:py-5 md:px-8 rounded-lg items-center">
                <p>Thruster</p>
                <p className="font-bold">95kg</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container text-center py-24 px-4 xl:py-28 mx-auto">
        <h2 className="text-2xl font-black lg:text-3xl mb-4 md:mb-12">
          COMPETE <span className="text-egwene-500">WITH</span> FRIENDS
        </h2>
        <p className="w-full max-w-3xl mx-auto mb-8 md:mb-12">
          Take on the challenge and compare your lifts side by side with friends
          to see who leads in raw strength. With bodyweights logged, we also
          unveil the pound-for-pound victor, giving you the full picture of who
          stands as the ultimate strength champion!
        </p>
        <div className="max-w-3xl mx-auto w-full grid grid-cols-2 gap-4">
          <div className="grid gap-4 md:gap-6 md:text-lg">
            <div className="grid gap-2">
              <FontAwesomeIcon
                icon={faTrophy}
                className="text-egwene-500 w-11 h-11 mx-auto md:w-20 md:h-20"
              />
              <span className="text-success-500 md:text-lg">+8%</span>
            </div>
            <div className="bg-rand-400 py-3 px-4 md:py-5 md:px-8 rounded-lg">
              <p>Deadlift</p>
              <p className="font-bold">
                <span className="text-success-500 mr-4">+12kg</span>200kg
              </p>
            </div>
            <div className="bg-rand-400 py-3 px-4 md:py-5 md:px-8 rounded-lg">
              <p>Squat</p>
              <p className="font-bold">180kg</p>
            </div>
            <div className="bg-rand-400 py-3 px-4 md:py-5 md:px-8 rounded-lg">
              <p>Bench</p>
              <p className="font-bold">100kg</p>
            </div>
          </div>
          <div className="grid gap-4 md:gap-6 md:text-lg">
            <div className="grid gap-2">
              <FontAwesomeIcon
                icon={faTrophy}
                className="text-zinc-300 w-11 h-11 mx-auto md:w-20 md:h-20"
              />
              <span className="text-danger-500 md:text-lg">-8%</span>
            </div>
            <div className="bg-rand-400 py-3 px-4 md:py-5 md:px-8 rounded-lg">
              <p>Deadlift</p>
              <p className="font-bold">188kg</p>
            </div>
            <div className="bg-rand-400 py-3 px-4 md:py-5 md:px-8 rounded-lg">
              <p>Squat</p>
              <p className="font-bold">180kg</p>
            </div>
            <div className="bg-rand-400 py-3 px-4 md:py-5 md:px-8 rounded-lg">
              <p>Bench</p>
              <p className="font-bold">
                <span className="text-success-500 mr-4">+10kg</span>110kg
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
