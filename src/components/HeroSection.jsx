import { FcSearch } from "react-icons/fc";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <>
      <div className="text-center mt-5 ">
        <span className="px-4 py-2 mt-4 rounded-full bg-gray-100 font-medium">
          <span className="text-[#A59B47] ">LOOKING</span> FOR A JOB?
        </span>
        <h1 className="mt-2 ">
          <span className="text-black px-4 py-2 rounded-full bg-gray-100 font-medium">
            Click below to find the best
          </span>
          <br />{" "}
          <span className="text-black px-4 py-1 rounded-full bg-gray-100 font-medium">
            startup job that fits you with the help of an
          </span>
          <br />
          <span className="text-[#A59B47] px-2 py-1 mt-4 rounded-full bg-gray-100 font-medium">
            ANALYZER
          </span>
        </h1>
        <div className="flex w-[40%] shadow-lg border border-black pl-3 rounded-full items-center gap-4 mx-auto mt-10">
          <Input
            type="text"
            placeholder="S e a r c h   J o b s . . . ."
            className="outline-none w-full"
          />
          <Button className="rounded-r-full bg-customPrimary border-l border-l-black hover:bg-gray-400">
            <FcSearch className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
