import { useContext } from "react";
import ReportContext from "../../contexts/report/ReportContext";

function Breadcrumb() {
  const { entity, status } = useContext(ReportContext);

  return (
    <div className="ml-lg ">
      <button
        style={{ fontSize: "24px" }}
        className="button-appearance-none"
        type="button"
      >
        <span>
          {entity === "cobrancas" ? "COBRANÇAS" : entity.toUpperCase()}
        </span>
      </button>
      
      <span style={{ color: "#DA0175", fontSize: "24px" }}>{" > "}</span>
      <button style={{ fontSize: "24px" }} className="button-appearance-none">
        {entity === "clientes" ? (
          <span>
            {status === "inadimplente" ? "INADIMPLENTES" : status.toUpperCase()}
          </span>
        ) : (
          <span>
            {status === "pendente" && "PENDENTES"}
            {status === "vencido" && "VENCIDAS"}
            {status === "pago" && "PAGAS"}
          </span>
        )}
      </button>
    </div>
  );
}
export default Breadcrumb;
