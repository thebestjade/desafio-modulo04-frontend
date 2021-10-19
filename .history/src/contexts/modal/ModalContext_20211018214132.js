import { createContext } from 'react';

export const ModalContext = createContext({
  isOpenUser: false,
  setIsOpenUser: null,
  isOpenModalPath: false,
  setIsOpenModalPath: null,
})


export default ModalContext;