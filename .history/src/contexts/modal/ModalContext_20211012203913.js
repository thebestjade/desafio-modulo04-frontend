import { createContext } from 'react';

export const ModalContext = createContext({
  clients:[],
  setClients: null
})


export default ModalContext;