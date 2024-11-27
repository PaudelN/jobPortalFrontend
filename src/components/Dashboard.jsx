import { useSelector } from "react-redux";
import ButtonCard from "./ButtonCard";
import CategoryCarousel from "./CategoryCarousel";
import HeroSection from "./HeroSection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "provider") {
      navigate("/admin/companies")
    }
  }, []);

  return (
    <>
      <HeroSection />
      <CategoryCarousel />
      <ButtonCard />
    </>
  );
};

export default Dashboard;
