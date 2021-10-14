import ModalContext from "./ModalContext";
import { useState } from "react";

export default function ModalProvider(props) {
  const [isOpenUser, setIsOpenUser] = useState(false);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [isOpenDetailClient, setIsOpenDetailClient] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpenUser,
        setIsOpenUser,
        isOpenClient,
        setIsOpenClient,
        isOpenDetailClient,
        setIsOpenDetailClient,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
}
