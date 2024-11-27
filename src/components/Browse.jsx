import React from "react";
import Job from "./Job";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Browse = () => {
  return (
    <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl my-4">Search Results ({randomJobs.length})</h1>
      <div className="h-[88vh] overflow-y-auto mt-5 scrollable-container">
        {" "}
        {/* Adjust this height as needed */}
        <div className="grid grid-cols-2 gap-4">
          {randomJobs.map((item, index) => (
            <Job key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Browse;
