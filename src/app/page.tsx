import Image from "next/image";

export default function Home() {
  return (
      <>
          {/* Magic number is the header height*/}
          <div className="relative h-[calc(100vh-74.48px)] flex justify-center items-center">
              <Image className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20" src="/deadlift.jpg"
                     alt="man deadlifting" width={2400} height={1600}/>
              <div
                  className="text-[1.25rem] font-black leading-none pb-12 md:text-[2rem] xl:text-[3rem] z-10 text-center">
                  <p className="text-[3em]">LIFT IT</p>
                  <p className="text-[2.07em]">TRACK IT</p>
                  <p className="text-[2.1em]">SHARE IT</p>
                  <h1 className="text-base font-normal">Tempered Strength</h1>
              </div>
          </div>
          <div className="bg-amber-400 text-zinc-800">
              <div
                  className="px-4 py-12 container mx-auto lg:py-24 grid grid-cols-[3fr_1fr] gap-4 md:grid-cols-2 items-center overflow-x-hidden">
                  <div>
                      <h2 className="text-2xl font-bold lg:text-4xl">YOUR 1RM&apos;S IN ONE PLACE</h2>
                      <p>See all your one rep maxes in one convenient place</p>
                      <p>Easily update all your lifts</p>
                  </div>
                  <div className="relative h-[476px] w-full md:h-auto">
                      <div className="md:mt-6 md:flex md:gap-6">
                          <Image src="/exercisePage.png" width={236} height={475} alt="phone logged in"
                                 className="w-[236px] h-[475px] max-w-[475px] absolute top-0 left-0 md:block md:max-w-[100%] md:relative"/>
                          <div className="hidden md:block">
                              <Image src="/exercisesPage.png" width={236} height={475} alt="phone logged in"/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="px-4 py-12 container mx-auto lg:text-right lg:py-24">
              <h2 className="text-2xl font-bold lg:text-4xl">SHOWCASE YOUR LIFTS</h2>
              <p>Flex all your lifts with your customised public profile</p>
              <p>Create your own themes and style, think linktree for your lifts!</p>
          </div>
          <div className="px-4 py-12 container mx-auto lg:py-24">
              <h2 className="text-2xl font-bold lg:text-4xl">COMPARE LIFT DATA WITH FRIENDS</h2>
              <p>Find your friends and compare your lifts in our comparison UI</p>
              <p>Get notified when a lift is beaten to make sure your ready to stay on top</p>
          </div>
      </>
  )
}
