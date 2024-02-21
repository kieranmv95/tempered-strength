import Link from 'next/link';
import Image from 'next/image';
import TemperedStrengthSvg from '@/assets/TemperedStrength.svg';

const PoweredBy = () => (
  <div className="mt-8 mb-24">
    <Link href="/">
      <span className="text-xs">Powered by</span>
      <Image
        src={TemperedStrengthSvg}
        alt="Primary Logo"
        width={400}
        height={188}
        className="w-[100px] mx-auto"
        priority
      />
    </Link>
  </div>
);

export default PoweredBy;
