import "../../App.css";
import Stand from "../../assets/images/stand.png";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import signupProfile from "../../assets/images/profilesignup.png";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("User Registration Error", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="background">
        <img className="stand" src={Stand} alt="signup-page" />
      </div>
      <div className="flex z-10">
        <div className="bg-customPrimary text-white border border-gray-400 rounded-md flex flex-col justify-center items-center mt-7 w-96 mx-auto">
          <h1 className="font-semibold text-white text-xl m-2 font-title relative top-2">
            Create Account
          </h1>
          <form
            onSubmit={submitHandler}
            className="bg-customPrimary-butter text-black border border-gray-400 w-80 m-5 p-4  rounded-3xl"
          >
            <div className="flex flex-col gap-2 my-2 items-center justify-center relative">
              <Avatar className=" cursor-pointer relative w-20 h-20">
                <Input
                  accept="image/*"
                  type="file"
                  onChange={changeFileHandler}
                  className=" border border-gray-400 cursor-pointer absolute inset-0 opacity-0 w-full h-full"
                />
                <AvatarImage
                  className="z-1"
                  src={
                    input.file ? URL.createObjectURL(input.file) : signupProfile
                  }
                  alt="Profile Photo"
                />
              </Avatar>
            </div>

            <div className="my-2">
              <Label className="font-mono">Full Name</Label>
              <Input
                className="border border-gray-400"
                type="text"
                value={input.fullName}
                name="fullName"
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-2">
              <Label className="font-mono">E-mail</Label>
              <Input
                className="border border-gray-400"
                type="email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
              />
            </div>
            <div className="my-2">
              <Label className="font-mono">Phone Number</Label>
              <Input
                className="border border-gray-400"
                type="tel"
                maxLength="10"
                pattern="[0-9]{10}"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
              />
            </div>

            <div className="my-2">
              <Label className="font-mono">Password</Label>
              <Input
                className="border border-gray-400"
                type="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex items-center justify-evenly">
              <RadioGroup className="flex items-center gap-4 font-mono">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="seeker"
                    checked={input.role === "seeker"}
                    onChange={changeEventHandler}
                    className=" cursor-pointer"
                  />
                  <Label htmlFor="r1">Seeker</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="provider"
                    checked={input.role === "provider"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Provider</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex items-center justify-center space-x-3 mt-1">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="fobt-mono">
                Accept terms and conditions
              </label>
            </div>
            {loading ? (
              <Button className=" w-full my-4 p-3">
                <Loader2 className=" h-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button type="submit" className=" w-full my-4">
                Sign In
              </Button>
            )}
            <span className="flex items-end justify-center">
              <Link to="/login">
                <span className="text-gray-700">Already have an account? </span>
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
