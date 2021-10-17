/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import ClientsContext from "../../contexts/client/ClientsContext";
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from "../../components/SideBar";
import ButtonProfile from "../../components/ButtonProfile";
import HeaderTable from "../../components/HeaderTable";
import ContainerClient from "../../components/ContainerClient";
import ModalContext from "../../contexts/modal/ModalContext";
import EditUser from "../EditUser";

import "./styles.css";
import { useState } from "react";
import EditClient from "../EditClient";
import DetailClient from "../DetailClient";
import InputSearch from "../../components/InputSearch";

export async function getClient(token, setClients, setReqError) {
  setReqError("");

  const response = await fetch(
    "https://desafio04-backend.herokuapp.com/clientes",
    {
      headers: {
        "Content-type": "application/json",
        mode: "cors",
        Authorization: token,
      },
    }
  );

  const data = await response.json();

  if (response.ok) {
    return setClients(data);
  }
  setReqError(data);
}

function Client() {
  const history = useHistory();
  const { token } = useContext(TokenContext);
  const { clients, setClients } = useContext(ClientsContext);
  const [reqError, setReqError] = useState("");
  const [idClient, setIdClient] = useState(null);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [isOpenDetailClient, setIsOpenDetailClient] = useState(false);
  const { isOpenUser } = useContext(ModalContext);

  const closeAlert = () => {
    setReqError("");
    setReqSuccess("");
  };

  const handleOpenEditClient = (id) => {
    setIdClient(id);
    setIsOpenClient(true);
  };

  const handleOpenDetailClient = (id) => {
    setIdClient(id);
    setIsOpenDetailClient(true);
  };

  useEffect(() => {
    getClient(token, setClients, setReqError);
  }, []);

  return (
    <div className="client container-client flex-row">
      {isOpenUser && <EditUser />}
      {isOpenClient && idClient && (
        <EditClient
          idClient={idClient}
          setIdClient={setIdClient}
          setIsOpenClient={setIsOpenClient}
        />
      )}
      {isOpenDetailClient && idClient && (
        <DetailClient
          idClient={idClient}
          setIdClient={setIdClient}
          setIsOpenDetailClient={setIsOpenDetailClient}
        />
      )}
      <SideBar />
      <div className="container-home flex-column overflow-scroll">
        <ButtonProfile />

        <div className="flex-row align-baseline space-between">
          <button
            className="btn-add-client mg-top-client"
            onClick={() => history.push("/cadastrarCliente")}
          >
            Adicionar Cliente
          </button>

          <InputSearch className="align-end" />
        </div>

        <HeaderTable
          titles={[
            "Cliente",
            "Cobranças Feitas",
            "Cobranças Recebidas",
            "Status",
            "",
          ]}
        />
        {!!Object.keys(clients).length && (
          <div className="container-client flex-row">
            <div className="container-home flex-column overflow-scroll">
              {clients.map((client) => (
                <div>
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
                </div>
              ))}
            </div>
          </div>
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
  );
}

export default Client;
