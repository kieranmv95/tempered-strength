import Image from "next/image";

export default function Home() {
  return (
      // Magic number is the header height
      <div className="relative h-[calc(100vh-74.48px)] flex justify-center items-center">
          <Image className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20" src="/deadlift.jpg" alt="man deadlifting" width={2400} height={1600} />
          <div className="text-[1.25rem] font-black leading-none pb-12 md:text-[2rem] xl:text-[3rem] z-10 text-center">
              <p className="text-[3em]">LIFT IT</p>
              <p className="text-[2.07em]">TRACK IT</p>
              <p className="text-[2.1em]">SHARE IT</p>
              <p className="text-base font-normal">Tempered Strength</p>
          </div>
      </div>
  )
}
