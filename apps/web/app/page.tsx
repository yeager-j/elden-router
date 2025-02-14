import { getDestinations } from "@/actions/pathfinding";
import DestinationSearch from "@/components/DestinationSearch";

export default async function Page() {
  const destinations = await getDestinations();

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-7xl font-serif font-bold text-center mb-5 sm:mb-10">
          Guidance of Grace
        </h1>

        <DestinationSearch destinations={destinations} />
      </div>
    </div>
  );
}
