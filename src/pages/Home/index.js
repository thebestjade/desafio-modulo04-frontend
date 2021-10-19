/* eslint-disable no-restricted-globals */
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import ButtonProfile from "../../components/ButtonProfile";
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import SideBar from "../../components/SideBar";
import ModalContext from "../../contexts/modal/ModalContext";
import ReportContext from "../../contexts/report/ReportContext";
import EditUser from "../EditUser";
import ContainerHome from "./ContainerHome";
import TokenContext from '../../contexts/token/TokenContext'
import "./styles.css";

function Home() {
  const history = useHistory();
  const { isOpenUser } = useContext(ModalContext);
  const { setEntity, setStatus } = useContext(ReportContext);
  const { token } = useContext(TokenContext);
  const [reqError, setReqError] = useState("");
  const [homeData, setHomeData] = useState({});
  const handleSetPageClientsInfo = (pageName = "", filter = "") => {
    setEntity(pageName);
    setStatus(filter);
    history.push("/relatorios");
  };
  useEffect(() => {
    async function getHomeInfo() {
      try {
        const response = await fetch(
          "https://desafio04-backend.herokuapp.com/", {
            headers: {
              mode: 'cores',
              'Content-type': 'application/json',
              Authorization: token,
            }
          }
        );
        const data = await response.json();
        if (response.ok) {
          return setHomeData(data);
        }
        setReqError(data);
      } catch (error) {
        setReqError(error);
      }
    }
    getHomeInfo();
    // eslint-disable-next-line
  }, []);
  const closeAlert = () => {
    setReqError("");
  };

  return (
    <div className="container-home flex-row">
      {isOpenUser && <EditUser />}
      <SideBar />
      <div className="body container-home overflow-scroll">
        <ButtonProfile />
        <div className="containers content-center grid-gap-mid container-margin-lg">
          <div className="flex-column">
            <div className="flex-row items-center content-center gap-sm container-header">
              {<IconUser />}
              <h5>Clientes</h5>
            </div>
            <div className="body container-body flex-column items-center gap-sm">
              <ContainerHome
                label="Em dia"
                cor="#4EC06E"
                value={homeData.clientsUpToDate}
                onClick={() => handleSetPageClientsInfo("clientes", "em dia")}
              />
              <ContainerHome
                label="Inadimplentes"
                cor="#FF4D4D"
                value={homeData.defaulterClients}
                onClick={() =>
                  handleSetPageClientsInfo("clientes", "inadimplente")
                }
              />
            </div>
          </div>
          <div className="flex-column">
            <div className="flex-row items-center content-center gap-sm container-header">
              {<IconMoney />}
              <h5>Cobranças</h5>
            </div>
            <div className="body container-body flex-column items-center gap-sm">
              <ContainerHome
                label="Previstas"
                cor="#5197B5"
                value={homeData.expectedCharges}
                onClick={() =>
                  handleSetPageClientsInfo("cobrancas", "pendente")
                }
              />
              <ContainerHome
                label="Vencidas"
                cor="#FF4D4D"
                value={homeData.overdueCharges}
                onClick={() => handleSetPageClientsInfo("cobrancas", "vencido")}
              />
              <ContainerHome
                label="Pagas"
                cor="#4EC06E"
                value={homeData.chargesPaid}
                onClick={() => handleSetPageClientsInfo("cobrancas", "pago")}
              />
            </div>
          </div>
        </div>
        {reqError && (
          <Alert severity="error" onClose={closeAlert}>
            {reqError}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default Home;
