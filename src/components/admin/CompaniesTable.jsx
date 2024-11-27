import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-x-auto p-6">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">
        Your Recent Registered Companies
      </h2>
      <Table className="min-w-full text-left table-auto">
        <TableHeader className="bg-blue-50 text-gray-600 text-sm uppercase tracking-wider">
          <TableRow className="font-semibold">
            <TableHead className="py-4 px-6">Logo</TableHead>
            <TableHead className="py-4 px-6">Name</TableHead>
            <TableHead className="py-4 px-6">Date</TableHead>
            <TableHead className="py-4 px-6 text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <TableCell className="py-4 px-6">
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={company.logo || FaBuilding}
                    alt="Company Logo"
                  />
                </Avatar>
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-700">
                {company.name}
              </TableCell>
              <TableCell className="py-4 px-6 text-gray-500 flex items-center gap-2">
                {company.createdAt.split("T")[0]}
              </TableCell>
              <TableCell className="py-4 px-6 text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-40 p-2 border shadow-md">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer hover:text-blue-500 transition"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
