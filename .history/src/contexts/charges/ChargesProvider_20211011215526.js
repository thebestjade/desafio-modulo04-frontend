import ChargesContext from "./ChargesContexts";
import { useState } from "react";

export default function ProvedorUsuario(props) {
  const [charges, setCharges] = useState(['']);

  return (
    <ChargesContext.Provider value={{ charges, setCharges}}>
      {props.children}
    </ChargesContext.Provider>
  );
}