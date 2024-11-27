import { setSinglejob } from "@/redux/jobSlice";
import { APPLICATION_API_ENDPOINT, JOB_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import ProfileImage from "../assets/images/profile.jpg";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Description = () => {
  const params = useParams();
  const jobId = params.id;
  const { singlejob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied =
    singlejob?.application?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_ENDPOINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singlejob,
          applications: [...singlejob.application, { applicant: user?._id }],
        };
        dispatch(setSinglejob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res?.data?.message);
      } else {
        throw new Error("Failed to apply for the job.");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "An error occurred.");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getjob/${jobId}`, {
          withCredentials: true,
        });

        if (res?.data?.success) {
          dispatch(setSinglejob(res?.data?.job));
          setIsApplied(
            res?.data?.job?.applications?.some(
              (application) => application.applicant === user?._id
            )
          );
        } else {
          throw new Error("Failed to fetch the job details.");
        }
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "An error occurred.");
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <>
      <div className="flex items-center justify-center h-screen overflow-y-auto scrollable-container bg-gradient-to-b from-white via-gray-100 to-gray-200">
        <div className="max-w-4xl w-full p-8">
          {/* Profile Section */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-6">
              <Avatar className="w-28 h-28 shadow-2xl rounded-full transform transition duration-500 hover:scale-105">
                <AvatarImage
                  src={ProfileImage}
                  alt="Profile"
                  className="w-28 h-28 object-cover rounded-full border border-customPrimary shadow-md"
                />
              </Avatar>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
                  {singlejob?.title}
                </h1>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {singlejob?.description}
                </p>
              </div>
            </div>
            <div>
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg ${
                  isApplied
                    ? "bg-red-900 hover:bg-red-800 cursor-not-allowed"
                    : "bg-customPrimary cursor-pointer"
                }`}
              >
                {isApplied ? "Already Applied" : "Apply Now"}
              </Button>
            </div>
          </div>

          <div className=" text-gray-700 mb-6">
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Role:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.title}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Location:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.location}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Description:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.description}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Experience:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.experienceLevel}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Requirements:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.requirements}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Salary:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.salary}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Total Applicants:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.application?.length}
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-3 my-2">
              <h1 className="font-medium my-1">
                Posted Date:{" "}
                <span className="pl-4 font-normal text-gray-800">
                  {singlejob?.createdAt.split("T")[0]}
                </span>
              </h1>
            </div>
          </div>

          <div className="flex gap-3 my-4">
            <Badge className="text-blue-700 font-semibold bg-blue-100 hover:bg-blue-300 px-3 py-1 rounded-full transition">
              {singlejob?.position} Positions
            </Badge>
            <Badge className="text-red-700 font-semibold bg-red-100 hover:bg-red-300 px-3 py-1 rounded-full transition">
              {singlejob?.jobType}
            </Badge>
            <Badge className="text-customPrimary font-semibold bg-green-200 hover:bg-green-300 px-3 py-1 rounded-full transition">
              {singlejob?.salary} LPA
            </Badge>
          </div>
        </div>
      </div>
    </>
  );
};

export default Description;
