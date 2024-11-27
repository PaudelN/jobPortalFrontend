import { FaUserTie } from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import { Link } from "react-router-dom";

const ButtonCard = () => {
  return (
    <div className="flex justify-center mt-8 space-x-36">
      <div className="w-64 h-48 bg-white shadow-lg rounded-lg p-4 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
        <div className="flex flex-col items-center justify-center h-full">
          <GiProcessor size={60} className="text-green-500" />
          <h2 className="text-lg font-semibold mt-4">Analyzer</h2>
          <p className="text-sm text-gray-500 mt-2">
            Analyze data and generate answers.
          </p>
        </div>
      </div>
      <Link to="/jobs/recruitment">
        <div className="w-64 h-48 bg-white shadow-lg rounded-lg p-4 transform transition hover:scale-105 hover:shadow-2xl cursor-pointer">
          <div className="flex flex-col items-center justify-center h-full">
            <FaUserTie size={60} className="text-blue-500" />
            <h2 className="text-lg font-semibold mt-4">Recruitment</h2>
            <p className="text-sm text-gray-500 mt-2">
              Manage recruitment and job profile
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ButtonCard;
