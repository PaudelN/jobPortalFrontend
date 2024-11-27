import { Link, useNavigate } from "react-router-dom";
import "../../App.css";
import Stand2 from "../../assets/images/stand2.png";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Login error", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="background2">
        <img className="stand2" src={Stand2} alt="signup-page" />
      </div>
      <div className="flex absolute left-2/4 top-32 ">
        <div className="bg-customPrimary-butter border border-gray-400 rounded-3xl flex flex-col justify-center items-center mt-7 w-96 mx-auto">
          <h1 className="font-semibold text-xl m-2 font-title text-black relative top-2">
            Login Panel
          </h1>

          <hr className="w-1/2 border-gray-450 my-2" />
          <form
            onSubmit={submitHandler}
            className="bg-customPrimary-butter border-gray-400 w-80 m-5 p-4  rounded-3xl"
          >
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
                    className="cursor-pointer"
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
            {loading ? (
              <Button className=" w-full my-4 p-3">
                <Loader2 className=" h-4 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button type="submit" className=" w-full my-4">
                Login
              </Button>
            )}
            <span className="flex items-end justify-center">
              <Link to="/register">
                <span className="text-gray-700">Don't have an account? </span>
                Sign Up
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
