import { Edit2, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const AdminJobsTable = () => {
  const { allAdminJobs = [], searchJobByText } = useSelector(
    (store) => store.job
  ); // Default to an empty array
  const [filterJobs, setFilterJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(allAdminJobs)) {
      const filteredJobs = allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    }
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Your Recent Posted Jobs
      </h2>
      <Table className="min-w-full text-left table-auto">
        <TableHeader className="bg-blue-50 text-gray-600 text-sm uppercase tracking-wider">
          <TableRow className="font-semibold">
            <TableHead className="py-4 px-6">Company Name</TableHead>
            <TableHead className="py-4 px-6">Role</TableHead>
            <TableHead className="py-4 px-6">Date</TableHead>
            <TableHead className="py-4 px-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr>
              <TableCell>{job?.company?.name}</TableCell>
              <TableCell>{job?.title}</TableCell>
              <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() =>
                        navigate(`/admin/jobs/${job._id}/applicants`)
                      }
                      className="flex items-center w-fit gap-2 cursor-pointer mt-2"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
