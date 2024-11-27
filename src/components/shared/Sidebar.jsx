import { setUser } from "@/redux/authSlice";
import { USER_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { FaCompass, FaRegUserCircle } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import { GiExitDoor, GiWaterfall } from "react-icons/gi";
import { MdWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { PiBuildingOffice } from "react-icons/pi";
import { HiOutlineBriefcase } from "react-icons/hi2";
import logo from "../../assets/images/karmashetraLogo.png";
import Profile from "../../assets/images/profile.png";
import Profile2 from "../../assets/images/profile2.png";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_ENDPOINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="bg-customPrimary text-white h-full w-44 flex flex-col items-center p-4">
        {/* logo section */}
        <div className="flex flex-col items-center justify-center p-2">
          <img src={logo} alt="KarmaShetra" />
        </div>

        {/* Navigation Section */}
        <nav className="mt-5 flex flex-col space-y-10 w-full">
          <ul className="mt-4 ml-5 flex flex-col font-title items-start justify-center gap-10 cursor-pointer">
            {user && user.role === "provider" ? (
              <>
                <Link to="/admin/companies">
                  <div className="flex gap-2 items-start justify-center">
                    <PiBuildingOffice className="text-2xl" />
                    <li className="text-lg">Companies</li>
                  </div>
                </Link>
                <Link to="/admin/jobs">
                  <div className="flex gap-2 items-start justify-center">
                    <HiOutlineBriefcase className="text-2xl" />
                    <li className="text-lg">Jobs</li>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/">
                  <div className="flex gap-2 items-start justify-center">
                    <FiGrid className="text-2xl" />
                    <li className="text-lg">Dashboard</li>
                  </div>
                </Link>
                <Link to="/latestjobs">
                  <div className="flex gap-2 items-start justify-center">
                    <GiWaterfall className="text-2xl" />
                    <li className="text-lg">Filter</li>
                  </div>
                </Link>
                <Link to="/jobs">
                  <div className="flex gap-2 items-start justify-center">
                    <MdWorkOutline className="text-2xl" />
                    <li className="text-lg">Jobs</li>
                  </div>
                </Link>
                <Link to="/browse">
                  <div className="flex gap-2 items-start justify-center">
                    <FaCompass className="text-2xl" />
                    <li className="text-lg">Browse</li>
                  </div>
                </Link>
              </>
            )}
            <Link to="/logout">
              <div className="flex items-center justify-center mt-auto">
                <Button
                  onClick={logoutHandler}
                  className="bg-customPrimary hover:bg-customPrimary text-1xl absolute bottom-4 left-9 gap-2"
                >
                  Logout
                  <GiExitDoor className="text-2xl" />
                </Button>
              </div>
            </Link>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-2 main-background">
        {/* Background Shapes */}
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>

        {!user ? (
          <div className="flex flex-col items-center justify-center h-screen">
            <p>Please login to access this route</p>
          </div>
        ) : (
          location.pathname !== "/profile" && (
            <div className="flex items-center gap-2 absolute right-3 top-7">
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto
                          ? user.profile.profilePhoto
                          : `${Profile}`
                      }
                      alt="Profile Photo"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto
                            ? user.profile.profilePhoto
                            : `${Profile2}`
                        }
                        alt="Profile Photo"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  {user && user.role === "seeker" && (
                    <>
                      <div className="flex items-center justify-start my-2">
                        <FaRegUserCircle className="text-2xl" />
                        <Button variant="link">
                          <Link to="/profile">View Profile</Link>
                        </Button>
                      </div>
                      <div className="flex items-center justify-start my-2">
                        <MdWorkOutline className="text-2xl" />
                        <Button variant="link">
                          <Link to="/appliedjobs">Applied Jobs</Link>
                        </Button>
                      </div>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          )
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;
