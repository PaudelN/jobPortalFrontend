import { setSearchCompanyByText } from "@/redux/companySlice";
import { Plus } from "lucide-react"; // Importing icons
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const JobsAdmin = () => {
  useGetAllAdminJobs(); // Hook to fetch all admin jobs
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 ">
      {/* Header section for search input and button */}
      <div className="flex flex-col sm:flex-row items-center justify-between my-8 gap-4">
        <div className="relative w-full sm:w-auto">
          <Input
            className="pl-10 w-full sm:w-64 p-2 border border-gray-300 rounded-md focus:outline-none transition"
            placeholder="Filter By Name"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <Button
          className="flex items-center bg-customPrimary text-white px-4 py-2 rounded-md transition"
          onClick={() => navigate("/admin/companies/create")}
        >
          <Plus className="w-5 h-5 mr-2" />{" "}
          {/* Plus icon for "New Company" button */}
          Add New Job
        </Button>
      </div>

      {/* Companies Table */}
      <AdminJobsTable />
    </div>
  );
};

export default JobsAdmin;
