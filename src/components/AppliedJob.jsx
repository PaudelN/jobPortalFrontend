import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";

const dummyTable = [1, 2, 3, 4, 5, 6, 7, 8, 8, 3, 4, 5, 6, 3, 43];

const AppliedJob = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="max-h-screen overflow-y-auto scrollable-container w-11/12 lg:w-2/3 p-6 bg-white shadow-lg rounded-lg">
        <Table className="table-auto w-full text-left border-collapse">
          <TableHeader>
            <TableRow className="bg-customPrimary text-white">
              <TableHead className="px-6 py-4 font-bold">Date</TableHead>
              <TableHead className="px-6 py-4 font-bold">Job Role</TableHead>
              <TableHead className="px-6 py-4 font-bold">Company</TableHead>
              <TableHead className="px-6 py-4 font-bold text-right">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyTable.map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-100 transition-all duration-200"
              >
                <TableCell className="px-6 py-4 border-b">2024-09-06</TableCell>
                <TableCell className="px-6 py-4 border-b">Frontend</TableCell>
                <TableCell className="px-6 py-4 border-b">Google</TableCell>
                <TableCell className="px-6 py-4 border-b text-right">
                  <Badge className="bg-green-500 text-white px-3 py-1 rounded-full">
                    Selected
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AppliedJob;
