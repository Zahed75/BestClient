export default function Skeleton() {
  return (
    <section className="flex flex-col lg:flex-row my-10">
      <div className="w-full lg:w-64 p-4 bg-white rounded-md shadow-md lg:h-screen mb-6 lg:mb-0">
        <div className="bg-gray-200 border border-gray-200 h-12 w-full rounded animate-pulse mb-4"></div>
        <div className="bg-gray-200 border border-gray-200 h-12 w-full rounded animate-pulse mb-4"></div>
        <div className="bg-gray-200 border border-gray-200 h-12 w-full rounded animate-pulse mb-4"></div>
        <div className="bg-gray-200 border border-gray-200 h-12 w-full rounded animate-pulse"></div>
      </div>

      <div className="flex-1 p-4 sm:p-6">
        <div className="w-full mx-auto my-6 lg:my-10">
          <div className="p-4 bg-white rounded-md">
            <div className="flex flex-col sm:flex-row mb-6">
              <div className="mr-0 sm:mr-4 bg-gray-200 border border-gray-200 h-16 w-16 rounded animate-pulse mb-4 sm:mb-0"></div>
              <div className="space-y-1 flex flex-col w-full">
                <div className="flex w-full items-center mb-2">
                  <div className="bg-gray-200 border border-gray-200 w-40 sm:w-60 h-5 animate-pulse"></div>
                  <div className="ml-4 bg-ternary w-12 h-5 animate-pulse"></div>
                </div>
                <div className="bg-gray-200 border border-gray-200 w-24 sm:w-36 h-5 animate-pulse mb-2"></div>
                <div className="bg-gray-200 border border-gray-200 w-full h-36 sm:h-44 animate-pulse"></div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <div className="bg-gray-200 border border-gray-200 w-12 sm:w-16 h-5 animate-pulse"></div>
                <span className="bg-tertiary h-1 w-1 rounded animate-pulse"></span>
                <div className="bg-gray-200 border border-gray-200 w-12 sm:w-16 h-5 animate-pulse"></div>
              </div>
              <div className="bg-gray-200 border border-gray-200 w-12 sm:w-16 h-5 animate-pulse"></div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6 lg:mt-10">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="relative p-4 bg-white rounded-lg overflow-hidden shadow hover:shadow-md"
              >
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
