import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import ProfileImage from "../assets/images/profile2.png";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-white via-gray-100 to-gray-200">
        <div className="max-w-4xl w-full p-8">
          {/* Profile Section */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-6">
              <Avatar className="w-44 h-44 shadow-2xl rounded-full transform transition duration-500 hover:scale-105">
                <AvatarImage
                  src={
                    user?.profile?.profilePhoto
                      ? user.profile.profilePhoto
                      : `${ProfileImage}`
                  }
                  alt="Profile Photo"
                  className="w-44 h-44 object-cover rounded-full  border-customPrimary shadow-md"
                />
              </Avatar>
              <div className="ml-4">
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
                  {user?.fullName}
                </h1>
                <p className="text-gray-600 mt-2 leading-relaxed">
                  {user?.profile?.bio}
                </p>
              </div>
            </div>
            <Button
              onClick={() => setOpen(true)}
              className="ml-auto transform transition duration-500 hover:bg-customPrimary hover:text-white"
            >
              <FaUserEdit className="mr-2" /> Edit Profile
            </Button>
          </div>

          {/* Contact Info Section */}
          <div className="text-lg text-gray-700 mb-6">
            <div className="flex items-center gap-3 my-2">
              <IoIosMail className="text-customPrimary" />
              <span className="font-medium">{user?.email}</span>
            </div>
            <div className="flex items-center gap-3 my-2">
              <MdLocalPhone className="text-customPrimary" />
              <span className="font-medium">{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <Label className="text-lg font-bold text-gray-700">Skills</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {user?.profile?.skills.length !== 0 ? (
                user?.profile?.skills.map((item, index) => (
                  <Badge
                    className="bg-customPrimary text-white py-2 px-4 rounded-full"
                    key={index}
                  >
                    {item}
                  </Badge>
                ))
              ) : (
                <span>Update Profile to Add Skills</span>
              )}
            </div>
          </div>

          {/* Resume Section */}
          <div className="text-lg">
            <Label className="text-lg font-bold text-gray-700 ">Resume</Label>
            <div className="flex flex-wrap gap-3 mt-2">
              {user?.profile?.resume ? (
                <a
                  target="blank"
                  href={user?.profile?.resume}
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-4 block font-medium "
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span>
                  Update Profile to Add Resume
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default Profile;
