import DestinationSearch from "@/components/DestinationSearch";

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-center mb-5 sm:mb-10">
          Elden Router
        </h1>

        <DestinationSearch />
      </div>
    </div>
  );
}
