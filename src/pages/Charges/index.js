import React, { useContext, useEffect } from "react";
import { Alert } from "@material-ui/lab";
import ChargesContext from "../../contexts/charge/ChargesContexts";
import TokenContext from "../../contexts/token/TokenContext";
import ButtonProfile from "../../components/ButtonProfile";
import HeaderTable from "../../components/HeaderTable";
import ContainerCharge from "../../components/ContainerCharge";
import SideBar from "../../components/SideBar";

import "./styles.css";
import EditUser from "../EditUser";
import ModalContext from "../../contexts/modal/ModalContext";
import ClientsContext from "../../contexts/client/ClientsContext";
import { useState } from "react";
import EditCharge from "../EditCharge";
import InputSearch from "../../components/InputSearch";
import { getClients } from "../Clients/index";

export async function getCharges(
  token,
  setCharges,
  setReqError,
  urlToFetch = null
) {
  setReqError("");
  const url = urlToFetch || "https://desafio04-backend.herokuapp.com/cobrancas";
  try {
    const response = await fetch(url, {
      headers: {
        "Content-type": "application/json",
        mode: "cors",
        Authorization: token,
      },
    });

    const data = await response.json();

    if (response.ok) {
      return setCharges(data);
    }

    setReqError(data);
  } catch (error) {
    setReqError(error);
  }
}

function Charges() {
  const { charges, setCharges } = useContext(ChargesContext);
  const { setClients } = useContext(ClientsContext);
  const { token } = useContext(TokenContext);
  const [reqError, setReqError] = useState("");
  const { isOpenUser } = useContext(ModalContext);
  const [idCharge, setIdCharge] = useState(null);
  const [isOpenCharge, setIsOpenCharge] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const handleOpenEditCharge = (id) => {
    setIdCharge(id);
    setIsOpenCharge(true);
  };

  useEffect(() => {
    getCharges(token, setCharges, setReqError);
    if (isOpenCharge && idCharge) {
      getClients(token, setClients, setReqError);
    }
    // eslint-disable-next-line
  }, [token, setCharges]);

  const closeAlert = () => {
    setReqError("");
  };

  const handleInputSearch = (e) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    if (searchValue.length === 0) {
      setFilteredItems([]);
    }
  }, [searchValue]);

  const handleSearch = () => {
    if (charges.length > 0) {
      const filteredData = charges.filter(
        (item) =>
          (!!item.name && item.name.toLowerCase().includes(searchValue)) ||
          (!!item.id && item.id.toString().includes(searchValue))
      );
      return setFilteredItems(filteredData);
    } else {
      setFilteredItems([]);
    }
  };

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
          <InputSearch
            entity="cobrancas"
            className="align-end"
            value={searchValue}
            onChange={handleInputSearch}
            onClick={handleSearch}
          />
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
          {filteredItems.length > 0
            ? filteredItems.map((charge) => (
                <button
                  className="button-appearance-none"
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
              ))
            : charges.map((charge) => (
                <button
                  className="button-appearance-none"
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
              ))}
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

export default Charges;
