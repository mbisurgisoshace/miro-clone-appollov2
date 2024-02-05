import Image from "next/image";

function EmptyFavorites() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image alt="Empty" width={140} height={140} src="/empty-favorites.svg" />
      <h2 className="text-2xl font-semibold mt-6">No favorites boards!</h2>
      <p className="text-muted-foreground text-sm mt-2">
        Try favoriting a board
      </p>
    </div>
  );
}

export default EmptyFavorites;
