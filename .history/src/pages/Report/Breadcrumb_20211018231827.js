import { useContext, useState } from "react";
import ModalPath from "../../components/AlertRemove copy";
import ReportContext from "../../contexts/report/ReportContext";

function Breadcrumb() {
  const { entity, status } = useContext(ReportContext);
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <div className="ml-lg ">
      <button
        style={{ fontSize: "24px" }}
        className="button-appearance-none"
        type="button"
        onClick={isModalVisible ? () => setIsModalVisible(false) : () => setIsModalVisible(true)}
        >
        <span>
          {entity === "cobrancas" ? "COBRANÇAS" : entity.toUpperCase()}
        </span>
      </button>
      
      <span style={{ color: "#DA0175", fontSize: "24px" }}>{" > "}</span>
      <button 
        style={{ fontSize: "24px" }} 
        className="button-appearance-none">
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
      {isModalVisible && <ModalPath/>}
    </div>
  );
}
export default Breadcrumb;
