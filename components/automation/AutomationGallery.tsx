import { useState } from "react";
import { jobData } from "@/types/types";
import Image from "next/image";

interface jobProps {
  data: jobData;
}
const AutomationGallery: React.FC<jobProps> = ({ data }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const featuredImage = data?.featuredImage;
  const images = data?.images;
  const newGallery = [featuredImage, ...images.map((image: any) => image.url)];

  return (
    <div className="flex flex-col w-full gap-y-4">
      <div>
        <Image
          src={newGallery[currentImage]}
          alt="gallery image"
          priority
          width={1000}
          height={1000}
          className="cursor-pointer rounded-lg w-full h-[400px]"
        />
      </div>
      <div className="flex flex-row gap-x-4 justify-start items-center">
        {newGallery.map((image: any, i) => (
          <Image
            onMouseOver={(e) => setCurrentImage(i)}
            key={i}
            priority
            src={image}
            alt="gallery target image"
            width={100}
            height={100}
            className="cursor-pointer rounded-md w-20 h-20 md:w-25 md:h-20 "
          />
        ))}
      </div>
    </div>
  );
};

export default AutomationGallery;
