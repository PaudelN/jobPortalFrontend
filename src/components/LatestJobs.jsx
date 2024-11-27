import { useSelector } from "react-redux";
import FilterCard from "./FilterCard";
import LatestJobCard from "./LatestJobCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const LatestJobs = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);

  return (
    <>
      <div className="max-w-7xl mx-auto mt-7">
        <div className="flex gap-8">
          <div className="w-1/4">
            <FilterCard />
          </div>
          {allJobs.length <= 0 ? (
            <span>Sorry!! Latest Jobs Not Found</span>
          ) : (
            <div>
              <h1 className="text-center text-2xl font-bold relative w-3/4">
                Latest & Top Job Openings
                <span className="block mt-2 mb-4 w-72 h-0.5 bg-gradient-to-r from-customPrimary to-customPrimary-light mx-auto"></span>
              </h1>{" "}
              <div className="flex-1 h-[88vh] overflow-y-auto pb-5 scrollable-container">
                <div className="grid grid-cols-2 mt-5 gap-4 w-full md:w-1.5/2 lg:w-11/12 ml-auto mr-auto">
                  {allJobs.slice(0, 5).map((job) => (
                 
                      <LatestJobCard key={job._id} job={job} />
              
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;