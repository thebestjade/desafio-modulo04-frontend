import ModalContext from "./ModalContext";
import { useState } from "react";

export default function ModalProvider(props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen}}>
      {props.children}
    </ModalContext.Provider>
  );
}