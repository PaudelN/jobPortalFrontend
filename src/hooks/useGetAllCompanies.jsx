import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_ENDPOINT}/getcompany`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.error(error);
        toast.error();
      }
    };
    fetchAllCompany();
  }, []);
};

export default useGetAllCompanies;
