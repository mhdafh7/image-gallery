import Image from "next/image";
import { useRef } from "react";
import { Blurhash } from "react-blurhash";
import { useContext } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "@/context/ModalContext";

const ImageCard = ({ image, setShowModal }) => {
  const { setImgData, setUserData } = useContext(ModalContext);
  const blurRef = useRef(null);

  const oldHeight = image.height;
  const oldWidth = image.width;
  const newWidth = 400;
  const newHeight = Math.round((oldHeight * newWidth) / oldWidth);

  return (
    <figure
      onClick={() => {
        setImgData({
          imgUrl: image.urls.full,
          imgAlt: image.alt_description,
          likes: image.likes,
        });
        setUserData(image.user);
        setShowModal(true);
      }}
      className="cursor-pointer m-3 max-[360px]:m-0"
    >
      <div className="flex flex-col">
        <div className="relative">
          {/* Image and blur */}
          <div className="relative" style={{ height: `${newHeight}px` }}>
            <Blurhash
              ref={blurRef}
              hash={image.blur_hash}
              punch={1}
              className="!w-full !h-full !absolute"
            />
            <div className="relative h-full">
              <Image
                src={image.urls.regular}
                alt={
                  image.alt_description
                    ? image.alt_description
                    : image.urls.regular
                }
                fill
                className={`object-cover w-full h-full aspect-[${newWidth}/${newHeight}]`}
              />
            </div>
          </div>
          {/* Info section */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm w-full text-black flex items-center justify-between text-sm px-6 py-4">
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
        </div>
      </div>
    </figure>
  );
};
export default ImageCard;
