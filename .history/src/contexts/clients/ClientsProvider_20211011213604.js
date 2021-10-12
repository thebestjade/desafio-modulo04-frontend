import ClientsContext from "./ClientsContext";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useState } from "react";

export default function ProvedorUsuario(props) {
  const [clients, setClients] = useState([]);

  return (
    <ClientsContext.Provider value={{ clients, setClients}}>
      {props.children}
    </ClientsContext.Provider>
  );
}