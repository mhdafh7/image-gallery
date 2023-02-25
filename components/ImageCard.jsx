import Image from "next/image";
import { useContext } from 'react'
import { HeartIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "@/context/ModalContext";

const ImageCard = ({ url, alt, user, likes, setShowModal }) => {
  const { setImgData, setUserData } = useContext(ModalContext);
  return (
    <article
      onClick={() => {
        setImgData({ imgUrl: url, imgAlt: alt, likes: likes });
        setUserData(user);
        setShowModal(true);
      }}
      className="flex flex-col relative overflow-hidden rounded-md shadow-none hover:shadow-lg transition-shadow h-64 w-full cursor-pointer border-2 border-gray-200"
    >
      <Image
        src={url.small}
        alt={alt}
        fill
        className="object-cover"
        placeholder="blur"
        blurDataURL={url.thumb}
      />
      <div className="absolute bottom-0 bg-white bg-opacity-90 backdrop-blur-sm w-full text-black flex items-center justify-between text-sm px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={user.profile_image.small}
            alt={`profile picture of ${user.username}`}
            height={32}
            width={32}
            className="rounded-full"
          />
          <span className="flex flex-col">
            <h5 className="font-semibold">{user.name}</h5>
            <h6 className="text-xs text-gray-500 italic font-medium">
              @{user.username}
            </h6>
          </span>
        </div>
        <span className="flex items-center justify-center gap-1">
          <HeartIcon className="w-4 h-4" />
          {likes}
        </span>
      </div>
    </article>
  );
};
export default ImageCard;
