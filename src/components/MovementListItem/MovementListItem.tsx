import { Box } from '@/components/DesignSystemElements';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

type MovementListItemProps = {
  movementTitle: string;
  movementSubTitle: string | null;
  children: React.ReactNode;
  href?: string;
};

const WrapLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href?: string;
}) => {
  if (!href) return children;

  return (
    <Link href={href} className="grid relative items-center">
      {children}

      <FontAwesomeIcon
        icon={faArrowRight}
        className="absolute right-2 w-4 h-4"
      />
    </Link>
  );
};

const MovementListItem = ({
  movementTitle,
  movementSubTitle,
  children,
  href,
}: MovementListItemProps) => {
  return (
    <div className="grid grid-cols-[1fr_auto] justify-between items-center gap-2">
      <WrapLink href={href}>
        <Box small>
          <div>
            <p>{movementTitle}</p>
            {movementSubTitle && (
              <p className="font-bold text-sm opacity-60">{movementSubTitle}</p>
            )}
          </div>
        </Box>
      </WrapLink>
      <div className="flex gap-2 h-full">{children}</div>
    </div>
  );
};

export default MovementListItem;
