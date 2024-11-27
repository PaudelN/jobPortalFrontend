import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import { Building, CheckCircle, XCircle } from "lucide-react"; // Icons for visual appeal

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_ENDPOINT}/registercompany`,
        {
          companyName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-3xl w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <Building className="w-8 h-8 text-customPrimary" />
          <h1 className="font-bold text-3xl text-gray-800">Create Your Company</h1>
        </div>
        <p className="text-gray-500 mb-6">
          Provide a name for your company. You can always change it later.
        </p>

        <Label className="text-gray-700 text-lg">Company Name</Label>
        <Input
          type="text"
          onChange={(e) => setCompanyName(e.target.value)}
          className="my-2 border border-gray-400 p-2 w-full rounded-md"
          placeholder="JobHunt, Microsoft, etc."
        />

        <div className="flex items-center gap-4 my-6">
          <Button
            variant="outlined"
            onClick={() => navigate("/admin/companies")}
            className="hover:bg-gray-100 transition"
          >
            <XCircle className="w-5 h-5 mr-2" />
            Cancel
          </Button>
          <Button onClick={registerNewCompany} className="transition bg-customPrimary text-white">
            <CheckCircle className="w-5 h-5 mr-2" />
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
