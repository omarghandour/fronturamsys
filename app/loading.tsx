export default function Loading() {
  return (
    <div className="w-full p-5 overflow-hidden h-[88%]">
      <div className="w-full">
        <div className="animate-pulse h-6 bg-transparent rounded"></div>
      </div>
      <div className="overflow-scroll flex gap-3 flex-col mt-4 h-full">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-full flex flex-col p-3 justify-between items-center bg-transparent rounded-xl shadow-md"
          >
            <div className="w-[20%]">
              <div className="animate-pulse h-16 bg-gray-300 rounded-full"></div>
            </div>
            <div className="w-[80%] mt-2">
              <div className="animate-pulse h-6 bg-gray-300 rounded mb-2"></div>
              <div className="animate-pulse h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
