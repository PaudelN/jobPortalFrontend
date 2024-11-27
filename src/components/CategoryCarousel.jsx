import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "DevOps Engineer",
  "Full Stack Developer",
  "Frontend Intern",
  "SEO Intern",
  "Project Manager",
  "Graphics Designer",
  "UX/UI Designer",
  "Marketing Intern",
];
const CategoryCarousel = () => {
  return (
    <>
      <div>
        <Carousel className="w-1/2 max-w-xl mx-auto my-16 p-5">
          <CarouselContent >
            {category.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
                <Button variant="outline" className="rounded-full ">{item}</Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </>
  );
};

export default CategoryCarousel;
