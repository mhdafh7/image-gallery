import { createContext, useState } from "react";

const ModalContext = createContext({
  imgData: {},
  userData: {},
  setImgData: () => {},
  setUserData: () => {},
});
const ModalProvider = ({ children }) => {
  const [imgData, setImgData] = useState({});
  const [userData, setUserData] = useState({});
  return (
    <ModalContext.Provider
      value={{ imgData, userData, setImgData, setUserData }}
    >
      {children}
    </ModalContext.Provider>
  );
};
export { ModalProvider, ModalContext };
