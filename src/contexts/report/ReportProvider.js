import ReportContext from "./ReportContext";
import { useState } from "react";

export default function ReportProvider(props) {
  const [entity, setEntity] = useState("");
  const [status, setStatus] = useState("");

  return (
    <ReportContext.Provider value={{ entity, setEntity, status, setStatus }}>
      {props.children}
    </ReportContext.Provider>
  );
}
