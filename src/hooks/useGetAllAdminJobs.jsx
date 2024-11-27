import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_ENDPOINT}/getproviderjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.error(error);
        toast.error();
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;
