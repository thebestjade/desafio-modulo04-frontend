import ChargesContext from "./ChargesContext";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function ProvedorUsuario(props) {
  const [charges, setCharges] = useLocalStorage([], 'Charges');

  return (
    <ChargesContext.Provider value={{ charges, setCharges}}>
      {props.children}
    </ChargesContext.Provider>
  );
}