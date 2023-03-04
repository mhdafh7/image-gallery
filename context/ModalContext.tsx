import { createContext, useState, ReactNode } from "react";

export type ImageType = {
  id: string;
  created_at?: string;
  updated_at?: string;
  width: number;
  height: number;
  color?: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
  };
  likes: number;
  user: UserProps;
};
export type UserProps = {
  id: string;
  username: string;
  name: string;
  first_name?: string;
  last_name?: string;
  profile_image: {
    small: string;
    medium?: string;
    large?: string;
  };
  twitter_username?: string;
  instagram_username?: string;
};
interface ModalContextProps {
  imgData: ImageType;
  userData: any;
  setImgData: (data: ImageType) => void;
  setUserData: (data: UserProps) => void;
}

export const ModalContext = createContext<ModalContextProps>({
  imgData: {
    id: "",
    created_at: "",
    updated_at: "",
    width: 0,
    height: 0,
    color: "",
    blur_hash: "",
    description: "",
    alt_description: "",
    urls: {
      raw: "",
      full: "",
      regular: "",
      small: "",
      thumb: "",
      small_s3: "",
    },
    likes: 0,
    user: {
      id: "",
      username: "",
      name: "",
      first_name: "",
      last_name: "",
      twitter_username: "",
      profile_image: {
        small: "",
        medium: "",
        large: "",
      },
      instagram_username: "",
    },
  },
  userData: {
    id: "",
    username: "",
    name: "",
    first_name: "",
    last_name: "",
    twitter_username: "",
    profile_image: {
      small: "",
      medium: "",
      large: "",
    },
    instagram_username: "",
  },
  setImgData: () => {},
  setUserData: () => {},
});

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [imgData, setImgData] = useState<ImageType>({
    id: "",
    created_at: "",
    updated_at: "",
    width: 0,
    height: 0,
    color: "",
    blur_hash: "",
    description: "",
    alt_description: "",
    urls: {
      raw: "",
      full: "",
      regular: "",
      small: "",
      thumb: "",
      small_s3: "",
    },
    likes: 0,
    user: {
      id: "",
      username: "",
      name: "",
      first_name: "",
      last_name: "",
      twitter_username: "",
      profile_image: {
        small: "",
        medium: "",
        large: "",
      },
      instagram_username: "",
    },
  });
  const [userData, setUserData] = useState<UserProps>({
    id: "",
    username: "",
    name: "",
    first_name: "",
    last_name: "",
    twitter_username: "",
    profile_image: {
      small: "",
      medium: "",
      large: "",
    },
    instagram_username: "",
  });

  return (
    <ModalContext.Provider
      value={{ imgData, userData, setImgData, setUserData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
