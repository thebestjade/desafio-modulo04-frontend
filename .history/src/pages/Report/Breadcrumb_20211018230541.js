import { useContext, useState } from "react";
import ModalPath from "../../components/ModalPath";
import ReportContext from "../../contexts/report/ReportContext";

function Breadcrumb() {
  const { entity, status } = useContext(ReportContext);
  const [isModalEntityVisible, setIsModalEntityVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <div className="ml-lg ">
      <button
        style={{ fontSize: "24px" }}
        className="button-appearance-none"
        type="button"
        onClick={isModalEntityVisible ? () => setIsModalEntityVisible(false) : () => setIsModalEntityVisible(true)}
        >
        <span>
          {entity === "cobrancas" ? "COBRANÇAS" : entity.toUpperCase()}
        </span>
      </button>
      
      <span style={{ color: "#DA0175", fontSize: "24px" }}>{" > "}</span>
      <button 
        style={{ fontSize: "24px" }} 
        className="button-appearance-none"
        onClick={isModalVisible ? () => setIsModalVisible(false) : () => setIsModalVisible(true)}
        >
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
      {isModalEntityVisible && <ModalPath/>}
      {isModalVisible && <ModalPath/>}
    </div>
  );
}
export default Breadcrumb;
