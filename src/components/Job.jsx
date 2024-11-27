import { FaBookmark } from "react-icons/fa6";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdDate = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdDate;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <>
      <div className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-white to-gray-50 border border-gray-100 transition duration-300 hover:shadow-2xl hover:scale-101 transform hover:translate-y-1 space-y-6">
        <div className="flex gap-8">
          <div className="flex flex-col items-center text-center w-1/3 border-r border-gray-200 pr-6">
            <Avatar className="border border-gray-300 shadow-lg hover:shadow-xl transition duration-200 mb-4 transform hover:scale-110 w-20 h-20">
              <AvatarImage src={""} alt="Company Logo" />
            </Avatar>
            <div className="space-y-1">
              <h1 className="font-semibold text-lg text-gray-800">
                {job?.company?.name}
              </h1>
              <p className="text-sm text-gray-500">{job?.location}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between w-2/3">
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-300 italic">
                {daysAgoFunction(job?.createdAt) === 0
                  ? "Today"
                  : `${daysAgoFunction(job?.createdAt)}days ago`}
              </p>
              <Button
                variant="outline"
                className="rounded-full size-7 hover:bg-gray-200 border-none shadow-md"
                size="icon"
              >
                <FaBookmark size={18} className="text-customPrimary" />
              </Button>
            </div>

            <h1 className="text-xl font-extrabold text-gray-900 my-3">
              {job?.title}
            </h1>
            <p className="text-sm text-gray-700 leading-relaxed">
              {job?.description}
            </p>

            <div className="flex gap-3 my-4">
              <Badge className="text-blue-700 font-semibold bg-blue-100 hover:bg-blue-300 px-3 py-1 rounded-full transition">
                {job?.position} Positions
              </Badge>
              <Badge className="text-red-700 font-semibold bg-red-100 hover:bg-red-300 px-3 py-1 rounded-full transition">
                {job?.jobType}
              </Badge>
              <Badge className="text-customPrimary font-semibold bg-green-200 hover:bg-green-300 px-3 py-1 rounded-full transition">
                {job?.salary}LPA
              </Badge>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="hover:bg-gray-100 border-gray-300 text-gray-800 px-6 py-2 shadow-sm transition-all hover:shadow-lg"
                onClick={() => navigate(`/description/${job?._id}`)}
              >
                Details
              </Button>
              <Button className="bg-gradient-to-r from-customPrimary to-customPrimary-dark hover:from-customPrimary-dark hover:to-customPrimary text-white px-6 py-2 rounded-lg shadow-md transition-all hover:shadow-lg">
                Save For Later
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
