import { createContext } from 'react';

export const ModalContext = createContext({
  isOpenUser: false,
  setIsOpenUser: null,
})


export default ModalContext;