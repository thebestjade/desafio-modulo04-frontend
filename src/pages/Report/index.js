import React, { useContext, useEffect, useState } from "react";
import { Alert } from "@material-ui/lab";
import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import ModalContext from "../../contexts/modal/ModalContext";
import ReportContext from "../../contexts/report/ReportContext";
import ButtonProfile from "../../components/ButtonProfile";
import HeaderTable from "../../components/HeaderTable";
import SideBar from "../../components/SideBar";
import InputSearch from "../../components/InputSearch";
import EditUser from "../EditUser";
import EditCharge from "../EditCharge";
import ContainerCharge from "../../components/ContainerCharge";
import ContainerClient from "../../components/ContainerClient";
import "./styles.css";
import Breadcrumb from "./Breadcrumb";
import ChargesContext from "../../contexts/charge/ChargesContexts";
import { getClients } from "../Clients";
import { getCharges } from "../Charges";

function Report() {
  const { token } = useContext(TokenContext);
  const [clients, setClients] = useState([]);
  const [charges, setCharges] = useState([]);
  const { entity, status } = useContext(ReportContext);

  const [reqError, setReqError] = useState("");
  const { isOpenUser } = useContext(ModalContext);
  const [idCharge, setIdCharge] = useState(null);
  const [isOpenCharge, setIsOpenCharge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [dataToShow, setDataToShow] = useState([]);
  const [idClient, setIdClient] = useState(null);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [isOpenDetailClient, setIsOpenDetailClient] = useState(false);

  const handleOpenEditClient = (id) => {
    setIdClient(id);
    setIsOpenClient(true);
  };

  const handleOpenDetailClient = (id) => {
    setIdClient(id);
    setIsOpenDetailClient(true);
  };

  const handleOpenEditCharge = (id) => {
    setIdCharge(id);
    setIsOpenCharge(true);
  };

  const closeAlert = () => {
    setReqError("");
  };

  const handleInputSearch = (e) => {
    setSearchValue(e.target.value);
    if (e.target.value === "") {
      if (clients.length > 0) {
        return setDataToShow(() =>
          clients.filter((client) => client.status === status)
        );
      } else if (charges.length > 0) {
        return setDataToShow(() =>
          charges.filter((charge) => charge.status === status)
        );
      }
    }
  };

  const handleSearch = () => {
    if (searchValue !== "" && dataToShow.length > 0) {
      const filteredData = dataToShow.filter(
        (item) =>
          (!!item.name && item.name.toLowerCase().includes(searchValue)) ||
          (!!item.email && item.email.toLowerCase().includes(searchValue)) ||
          (!!item.phone &&
            item.phone.replace(/[(|)|-]/g, "").includes(searchValue)) ||
          (!!item.id && item.id.toString().includes(searchValue))
      );
      return setDataToShow(filteredData);
    } else {
      setDataToShow([]);
    }
  };

  useEffect(() => {
    async function getData() {
      setReqError("");
      setLoading(true);
      const url = `https://desafio04-backend.herokuapp.com/${entity}?status=${status}`;
      try {
        entity === "clientes"
          ? getClients(
              token,
              setClients,
              setReqError,
              url
            )
          : getCharges(
              token,
              setCharges,
              setReqError,
              url
            );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setReqError(error);
      }
    }
    getData();
    return () => {
      setCharges([]);
      setClients([]);
    };
    // eslint-disable-next-line
  }, [entity, status, token, isOpenCharge]);

  useEffect(() => {
    const handleDataToShow = () => {
      if (clients.length > 0) {
        return setDataToShow(() =>
          clients.filter((client) => client.status === status)
        );
      } else if (charges.length > 0) {
        return setDataToShow(() =>
          charges.filter((charge) => charge.status === status)
        );
      }
    };
    handleDataToShow();
  }, [charges, clients, status]);

  useEffect(() => console.log("dataToShow", dataToShow), [dataToShow]);
  const RenderItems = () => {
    return entity === "clientes"
      ? clients.map((client) => (
          <button
            key={client.id}
            className="button-appearance-none"
            type="button"
            onClick={() => handleOpenEditCharge(client.id)}
          >
            <ContainerClient
              id={client.id}
              name={client.name}
              email={client.email}
              phone={client.phone}
              cpf={client.cpf}
              totalcharges={client.totalcharges}
              totalchargespaid={client.totalchargespaid}
              status={client.status}
              openDetailClient={() => handleOpenDetailClient(client.id)}
              openEditClient={() => handleOpenEditClient(client.id)}
            />
          </button>
        ))
      : charges.map((charge) => (
          <button
            key={charge.id}
            className="button-appearance-none"
            type="button"
            onClick={() => handleOpenEditCharge(charge.id)}
          >
            <ContainerCharge
              description={charge.description}
              dueDate={Intl.DateTimeFormat("pt-br", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }).format(new Date(charge.due_date))}
              id={charge.id}
              name={charge.name}
              status={charge.status}
              value={charge.value}
            />
          </button>
        ));
  };
  useEffect(
    () =>
      entity === "cobrancas" &&
      isOpenCharge &&
      idCharge &&
      getClients(token, setClients, setReqError),
    [entity, idCharge, isOpenCharge, setClients, token]
  );

  return (
    <div className="container-client flex-row">
      {isOpenUser && <EditUser />}
      {isOpenCharge && idCharge && (
        <EditCharge
          idCharge={idCharge}
          setIdCharge={setIdCharge}
          setIsOpenCharge={setIsOpenCharge}
        />
      )}
      <SideBar />
      <div className=" container-home flex-column overflow-scroll">
        <ButtonProfile />
        <div className="container-charge ">
          <div className="flex-row align-baseline space-between">
            <Breadcrumb />
            <InputSearch
              className="align-end"
              value={searchValue}
              onChange={handleInputSearch}
              onClick={handleSearch}
            />
          </div>
          <HeaderTable
            titles={[
              "ID",
              "Cliente",
              "Descrição",
              "Valor",
              "Status",
              "Vencimento",
            ]}
          />
          {(clients.length > 0 || charges.length > 0) && loading === false && (
            <RenderItems />
          )}
          <div className="items-center mg-error">
            {reqError && (
              <Alert severity="error" onClose={closeAlert}>
                {reqError}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
