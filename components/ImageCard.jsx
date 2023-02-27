import Image from "next/image";
import { useState } from "react";
import { Blurhash } from "react-blurhash";
import { useContext } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "@/context/ModalContext";

const ImageCard = ({ image, setShowModal }) => {
  const { setImgData, setUserData } = useContext(ModalContext);
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <article
      onClick={() => {
        setImgData({
          imgUrl: image.urls.regular,
          imgAlt: image.alt_description,
          likes: image.likes,
        });
        setUserData(user);
        setShowModal(true);
      }}
      className="flex flex-col relative overflow-hidden rounded-md shadow-none hover:shadow-lg transition-shadow h-64 w-full cursor-pointer border-2 border-gray-200"
    >
      {!imgLoaded ? (
        <Blurhash
          hash={image.blur_hash}
          width={400}
          height={300}
          resolutionX={32}
          resolutionY={32}
          punch={1}
        />
      ) : null}
      <Image
        src={image.urls.regular}
        alt={image.alt_description}
        fill
        className="object-cover"
        onLoad={() => {
          console.log("image loaded");
          setImgLoaded(true);
        }}
      />

      <div className="absolute bottom-0 bg-white bg-opacity-90 backdrop-blur-sm w-full text-black flex items-center justify-between text-sm px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={image.user.profile_image.small}
            alt={`profile picture of ${image.user.username}`}
            height={32}
            width={32}
            className="rounded-full"
          />
          <span className="flex flex-col">
            <h5 className="font-semibold">{image.user.name}</h5>
            <h6 className="text-xs text-gray-500 italic font-medium">
              @{image.user.username}
            </h6>
          </span>
        </div>
        <span className="flex items-center justify-center gap-1">
          <HeartIcon className="w-4 h-4" />
          {image.likes}
        </span>
      </div>
    </article>
  );
};
export default ImageCard;
