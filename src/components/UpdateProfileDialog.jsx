import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constants";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile?.skills?.map((skill) => skill),
    file: user?.profile?.resume,
  });
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_ENDPOINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setInput("");
      }
      console.log(res);
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  };
  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          {" "}
          <div className="grid gap-4 py-4 space-y-4">
            <div className="grid grid-cols-4 items-center gap-4">
              {" "}
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                value={input.fullName}
                onChange={changeHandler}
                className="border border-gray-500 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {" "}
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={changeHandler}
                className="border border-gray-500 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {" "}
              <Label htmlFor="number" className="text-right">
                Number
              </Label>
              <Input
                id="number"
                name="number"
                value={input.phoneNumber}
                onChange={changeHandler}
                className="border border-gray-500 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {" "}
              <Label htmlFor="bio" className="text-right">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeHandler}
                className="border border-gray-500 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {" "}
              <Label htmlFor="skills" className="text-right">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeHandler}
                className="border border-gray-500 col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              {" "}
              <Label htmlFor="file" className="text-right">
                Resume
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                onChange={fileHandler}
                accept="application/pdf"
                className="border border-gray-500 col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="mt-6 flex justify-end">
            {loading ? (
              <Button className=" w-full my-4 ">
                <Loader2 className=" h-4 animate-spin" /> Updating
              </Button>
            ) : (
              <Button
                type="submit"
                className=" w-full"
                onClick={() => setOpen(false)}
              >
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileDialog;
