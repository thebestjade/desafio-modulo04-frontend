import { createContext } from 'react';

export const ChargesContext = createContext({
  charges:[],
  setCharges: () => {}
})


export default ChargesContext;