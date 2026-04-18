import SearchBar from "@/components/SearchBar";

const UpcomingMeetings = () => {
  return (
    <div className="w-full h-full flex flex-col gap-6 bg-white border border-border rounded-lg p-8 shadow-xl">
      <div className="flex items-center gap-3 justify-between">
        <h3 className="">Nadchodzące spotkania</h3>
        {/* <SearchBar onSearch={handleSearch} /> */}
      </div>
      <div className=""></div>
    </div>
  );
};
export default UpcomingMeetings;
