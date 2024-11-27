import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Kathmandu",
      "Pokhara",
      "Biratnagar",
      "Bhaktapur",
      "Butwal",
      "Nepalgunj",
      "Lalitpur",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend",
      "Backend",
      "FullStack Development",
      "MERN Stack",
      "QA Engineer",
      "Marketing Expert",
      "Project Management",
      "Talent Acquisiton",
    ],
  },
  {
    filterType: "Salary",
    array: ["Paid Intern", "0-40k", "40k-1Lakh", "1Lakh-2Lakh", "Above 2Lakh"],
  },
];

const FilterCard = () => {
  return (
    <>
      <div className="w-full bg-white p-3 rounded-md">
        <h1 className="font-bold text-lg text-center">Filter Jobs</h1>
        <hr className="mt-3" />
        <RadioGroup>
          {filterData.map((data, index) => (
            <div key={index}>
              <h1 className="font-bold text-lg">{data.filterType}</h1>
              {data.array.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2 my-2">
                    {" "}
                    <RadioGroupItem key={index} value={item} />
                    <Label>{item}</Label>
                  </div>
                );
              })}
            </div>
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default FilterCard;
