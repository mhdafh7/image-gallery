import Image from "next/image";
import { useContext } from "react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ModalContext } from "@/context/ModalContext";
import { InstagramIcon } from "./Svgs";

const Modal = ({ setShowModal }) => {
  const { imgData, userData } = useContext(ModalContext);
  console.log(imgData);

  return (
    <>
      <div className="justify-center items-center flex fixed inset-0 z-[51] outline-none focus:outline-none w-[90vw] h-[90vh] m-auto rounded bg-white">
        <button
          onClick={() => {
            setShowModal(false);
          }}
          className="absolute bg-black rounded-full z-[60] h-8 w-8 flex items-center justify-center top-[-10px] right-[-10px] hover:scale-125 transition-transform"
        >
          <XMarkIcon className="w-6 h-6 text-white" />
        </button>
        <div className="relative my-6 mx-auto w-full h-full flex items-center justify-center">
          <Image
            src={imgData.imgUrl}
            alt={imgData.imgAlt ? imgData.imgAlt : `photo by ${userData.name}`}
            placeholder="blue"
            blurDataURL={imgData.imgUrl.thumb}
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 bg-white bg-opacity-90 backdrop-blur-sm w-full text-black flex items-center justify-between text-sm px-6 py-4">
            <div className="flex items-center justify-center gap-2">
              <Image
                src={userData.profile_image.small}
                alt={`profile picture of ${userData.name}`}
                height={32}
                width={32}
                className="rounded-full"
              />
              <span className="flex flex-col">
                <h5 className="font-semibold">{userData.name}</h5>
                <h6 className="text-xs text-gray-500 italic font-medium">
                  @{userData.username}
                </h6>
              </span>
              <span className="flex gap-4 ml-8 text-xs">
                {userData.instagram_username && (
                  <span className="flex items-center gap-1 text-gray-600">
                    <InstagramIcon />
                    <p>{userData.instagram_username}</p>
                  </span>
                )}
                {userData.twitter_username && (
                  <span className="flex items-center gap-1 text-gray-600">
                    <p>{userData.twitter_username}</p>
                  </span>
                )}
              </span>
            </div>
            <span className="flex items-center justify-center gap-1">
              <HeartIcon className="w-4 h-4" />
              {imgData.likes}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-opacity-25 fixed inset-0 z-50 bg-black backdrop-blur-md"></div>
    </>
  );
};
export default Modal;
