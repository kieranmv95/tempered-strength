type MovementListItemProps = {
  movementTitle: string;
  movementSubTitle: string | null;
  children: React.ReactNode;
};

const MovementListItem = ({
  movementTitle,
  movementSubTitle,
  children,
}: MovementListItemProps) => {
  return (
    <div className="grid grid-cols-[1fr_auto] justify-between items-center gap-2">
      <div className="bg-zinc-700 p-3 rounded-sm">
        <p>{movementTitle}</p>
        {movementSubTitle && (
          <p className="font-bold text-sm">{movementSubTitle}</p>
        )}
      </div>
      <div className="flex gap-2 h-full">{children}</div>
    </div>
  );
};

export default MovementListItem;
