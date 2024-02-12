import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { SearchForUserFormLarge } from "@/app/components/Forms";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Magic number is the header height*/}
      <div className="relative h-[500px] md:h-[750px] lg:h-[875px] flex justify-center items-center">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
          src="/deadlift.jpg"
          alt="man deadlifting"
          width={2400}
          height={1600}
        />
        <div className="text-[1.25rem] font-black leading-none pb-4 md:text-[2rem] xl:text-[3rem] z-10 text-center">
          <p className="text-[3em]">LIFT IT</p>
          <p className="text-[2.07em]">TRACK IT</p>
          <p className="text-[2.1em]">SHARE IT</p>
          <h1 className="text-base font-normal">Tempered Strength</h1>
          <FontAwesomeIcon
            icon={faChevronDown}
            className="w-[.5em] h-[.5em] mx-auto"
          />
        </div>
      </div>

      <div className="text-center py-24 relative">
        <Image
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
          src="/rogueplates.png"
          alt="lifting plates"
          width={4570}
          height={796}
        />
        <div className="relative z-10">
          <h2 className="text-2xl font-bold lg:text-4xl">Sign up for FREE</h2>
          <p className="mt-3">
            Be tracking and sharing your lifts in a matter of minutes
          </p>
          <div className="px-4 md:w-full max-w-[650px] md:mx-auto">
            <Link
              href="/sign-up"
              className="bg-zinc-800 text-white text-xl py-4 px-6 inline-block rounded mt-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center py-24">
        <h2 className="text-2xl font-bold lg:text-4xl">Search For a user</h2>
        <div className="px-4 md:w-full max-w-[650px] md:mx-auto">
          <SearchForUserFormLarge />
        </div>
      </div>

      <div className="bg-amber-400 text-zinc-800 overflow-x-hidden">
        <div className="px-4 py-12 container mx-auto lg:py-24 grid grid-cols-[3fr_1fr] gap-4 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold lg:text-4xl">
              YOUR 1RM&apos;S IN ONE PLACE
            </h2>
            <p className="mt-4">
              See all your one rep maxes in one convenient place
            </p>
            <ul className="list-disc mt-4 pl-4 space-y-1.5">
              <li>Quickly update all your lifts</li>
              <li>See a percentage breakdown of your lifts</li>
              <li>See your best and lifts at a glance</li>
              <li>COMING SOON - See progression graphs</li>
            </ul>
          </div>
          <div className="relative h-[476px] w-full md:h-auto">
            <div className="md:mt-6 md:flex md:gap-6">
              <Image
                src="/exerciseIdPage.png"
                width={236}
                height={475}
                alt="phone logged in"
                className="w-[236px] h-[475px] max-w-[475px] absolute top-0 left-0 md:block md:max-w-[100%] md:relative"
              />
              <div className="hidden xl:block">
                <Image
                  src="/exercisesPage.png"
                  width={236}
                  height={475}
                  alt="phone logged in"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-hidden">
        <div className="px-4 py-12 container mx-auto lg:py-24 grid grid-cols-[3fr_1fr] gap-4 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold lg:text-4xl">
              SHOWCASE YOUR LIFTS
            </h2>
            <ul className="list-disc mt-4 pl-4 space-y-1.5">
              <li>Flex all your lifts with your customised public profile</li>
              <li>See your Powerlifitng weight and olympic lifting total</li>
              <li>
                COMING SOON - Create your own theme&apos;s or choose from one of
                our many templates to brand your profile
              </li>
            </ul>
          </div>
          <div className="relative h-[476px] w-full md:h-auto">
            <div className="md:mt-6 md:flex md:gap-6">
              <Image
                src="/profilePage.png"
                width={236}
                height={475}
                alt="phone logged in"
                className="w-[236px] h-[475px] max-w-[475px] absolute top-0 left-0 md:block md:max-w-[100%] md:relative"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-400 text-zinc-800 overflow-x-hidden">
        <div className="px-4 py-12 container mx-auto lg:py-24 grid grid-cols-[3fr_1fr] gap-4 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold lg:text-4xl">
              COMPARE WITH FRIENDS
            </h2>
            <ul className="list-disc mt-4 pl-4 space-y-1.5">
              <li>Find and compare lift data with friends</li>
              <li>
                COMING SOON - Get notified when a friend beats one of your lifts
              </li>
              <li>COMING SOON - Compare your overall pound for pound score!</li>
            </ul>
          </div>
          <div className="relative h-[476px] w-full md:h-auto">
            <div className="md:mt-6 md:flex md:gap-6">
              <Image
                src="/comparePage.png"
                width={236}
                height={475}
                alt="phone logged in"
                className="w-[236px] h-[475px] max-w-[475px] absolute top-0 left-0 md:block md:max-w-[100%] md:relative"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
