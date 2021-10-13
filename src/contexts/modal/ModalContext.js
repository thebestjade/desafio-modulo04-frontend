import { createContext } from 'react';

export const ModalContext = createContext({
  isOpen: false,
  setIsOpen: null
})


export default ModalContext;