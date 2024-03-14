import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

type BlockProps = {
  icon: IconDefinition;
  title: string;
  description: string;
  children?: React.ReactNode;
  url: {
    href: string;
    title: string;
  };
};

const Block = ({ children, title, description, url, icon }: BlockProps) => (
  <div className="bg-rand-400 p-4 grid grid-rows-[auto_1fr_auto] rounded-xl md:p-6">
    <div>
      <div className="flex gap-3 items-center mb-3">
        <FontAwesomeIcon icon={icon} className="w-6 h-6 text-egwene-500" />
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <p className="mb-3">{description}</p>
    </div>
    <div>{children}</div>
    <div>
      <Link
        className="inline-block bg-egwene-500 py-2 px-4 rounded-full text-rand-500"
        href={url.href}
      >
        {url.title}
      </Link>
    </div>
  </div>
);

export default Block;
