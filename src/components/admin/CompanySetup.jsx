import { useEffect, useState } from "react";
import { HiArrowLeftCircle } from "react-icons/hi2";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { COMPANY_API_ENDPOINT } from "@/utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_ENDPOINT}/updatecompany/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: singleCompany.file || "",
    });
  }, [singleCompany]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
          <form onSubmit={submitHandler}>
            <div className="flex items-center gap-5 mb-8">
              <Button
                variant="outlined"
                className="flex items-center gap-2 text-customPrimary font-semibold"
                onClick={() => navigate("/admin/companies/create")}
              >
                <HiArrowLeftCircle className="w-8 h-8" />
                <span>Back</span>
              </Button>
              <h1 className="font-bold text-xl text-gray-700">Company Setup</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  className="border border-gray-400"
                  value={input.name}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  className="border border-gray-400"
                  value={input.description}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Website</Label>
                <Input
                  type="text"
                  name="website"
                  className="border border-gray-400"
                  value={input.website}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  className="border border-gray-400"
                  value={input.location}
                  onChange={changeEventHandler}
                />
              </div>
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  className="border border-gray-400"
                  onChange={changeFileHandler}
                />
              </div>
            </div>
            {loading ? (
              <Button className="w-full my-6 p-3 bg-customPrimary text-white">
                <Loader2 className="h-5 animate-spin" /> Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full my-6 py-3 bg-customPrimary text-white rounded-lg hover:bg-customPrimary-dark"
              >
                Update
              </Button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default CompanySetup;
