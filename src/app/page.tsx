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
          <div className="bg-amber-400 text-zinc-800 overflow-x-hidden">
              <div
                  className="px-4 py-12 container mx-auto lg:py-24 grid grid-cols-[3fr_1fr] gap-4 md:grid-cols-2 items-center">
                  <div>
                      <h2 className="text-2xl font-bold lg:text-4xl">YOUR 1RM&apos;S IN ONE PLACE</h2>
                      <p className="mt-4">See all your one rep maxes in one convenient place</p>
                      <ul className="list-disc mt-4 pl-4 space-y-1.5">
                          <li>Quickly update all your lifts</li>
                          <li>See your best and latest scores at a glance</li>
                          <li><span className="bg-blue-600 text-base px-2 py-1 rounded text-white font-bold">COMING SOON</span> See
                              progression graphs
                          </li>
                      </ul>
                  </div>
                  <div className="relative h-[476px] w-full md:h-auto">
                      <div className="md:mt-6 md:flex md:gap-6">
                          <Image src="/exercisePage.png" width={236} height={475} alt="phone logged in"
                                 className="w-[236px] h-[475px] max-w-[475px] absolute top-0 left-0 md:block md:max-w-[100%] md:relative"/>
                          <div className="hidden xl:block">
                              <Image src="/exercisesPage.png" width={236} height={475} alt="phone logged in"/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="px-4 py-36 container mx-auto grid md:grid-cols-2 md:gap-4">
              <div>
                  <h2 className="text-2xl font-bold lg:text-4xl">SHOWCASE YOUR LIFTS <span className="bg-blue-600 text-base px-2 py-1 rounded">COMING SOON</span></h2>
                  <ul className="list-disc mt-4 pl-4 space-y-1.5">
                      <li>Flex all your lifts with your customised public profile</li>
                      <li>Create your own theme&apos;s or choose from one of our many templates to brand your profile
                      </li>
                  </ul>
              </div>
          </div>
          <div className="bg-amber-400 text-zinc-800">
              <div className="px-4 py-36 container mx-auto grid md:grid-cols-2 md:gap-4">
                  <div>
                      <h2 className="text-2xl font-bold lg:text-4xl">COMPARE WITH FRIENDS <span className="bg-blue-600 text-white text-base px-2 py-1 rounded">COMING SOON</span></h2>
                      <p className="mt-4">Coming soon</p>
                      <ul className="list-disc mt-4 pl-4 space-y-1.5">
                          <li>Find and compare lift data with friends</li>
                          <li>Get notified when a friend beats one of your lifts</li>
                          <li>Compare your overall pound for pound score!</li>
                      </ul>
                  </div>
              </div>
          </div>
      </>
  )
}
