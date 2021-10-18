/* eslint-disable react-hooks/exhaustive-deps */
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import ChargesContext from "../../contexts/charge/ChargesContexts";
import TokenContext from "../../contexts/token/TokenContext";
import IconPhone from "../../assets/IconPhone";
import IconMessage from "../../assets/IconMessage";
import "./styles.css";

function DetailClient({
  id,
  name,
  email,
  phone,
  totalCharges,
  totalChargesPaid,
  status,
  cpf,
  idClient,
  setIdClient,
  setIsOpenDetailClient,
}) {
  const { token } = useContext(TokenContext);
  const [clients, setClients] = useState({});
  const { charges, setCharges } = useContext(ChargesContext);
  const [reqError, setReqError] = useState("");

  useEffect(() => {
    async function getClient() {
      const response = await fetch(
        `https://desafio04-backend.herokuapp.com/clientes/${idClient}`,
        {
          headers: {
            "Content-type": "application/json",
            mode: "cors",
            Authorization: token,
          },
        }
      );

      const { client, clientCharges } = await response.json();
      if (response.ok) {
        setClients(client);
        return setCharges(clientCharges);
      }
      setReqError(client, clientCharges);
    }
    getClient();
  }, [token, setClients, setCharges]);

  const handleCloseModal = () => {
    setIdClient(null);
    setIsOpenDetailClient(false);
  };
  const closeAlert = () => {
    setReqError("");
  };

  return (
    <div className="container-form flex-column modal-form">
      <form className="flex-column label-form padding-form-detail">
        <button
          className="button-decoration-none align-self-end btn-out-detail"
          onClick={handleCloseModal}
        >
          x
        </button>
        <div className="container-detail-modal label-form ">
          <div>
            <div className="client-content-header pd-bt-mid">
              <h2 className="detail-name">{clients.name}</h2>
              <div>
                {clients.cpf &&
                  clients.cpf.replace(
                    /(\d{3})(\d{3})(\d{3})(\d{2})/,
                    "$1.$2.$3-$4"
                  )}
              </div>
            </div>
            <div className="detail-info">
              <ul className="client-content-body pd-bt-mid flex-row items-center">
                <li className="flex-row items-center">
                  <IconMessage />
                  {clients.email}
                </li>
                <li className="flex-row items-center">
                  <IconPhone />
                  {clients.phone &&
                    clients.phone.replace(
                      /^(\d\d)(\d{5})(\d{4}).*/,
                      "($1) $2-$3"
                    )}
                </li>
              </ul>
            </div>
            <div className="pd-bt-mid">
              <ul className="client-content flex-row pd-zero">
                <li>
                  <h4 className="label-content-detail">CEP</h4>
                  <div className="detail-width-md flex-row">{clients.cep}</div>
                </li>
                <li>
                  <h4 className="label-content-detail">BAIRRO</h4>
                  <div className="detail-width-md flex-row">
                    {clients.district}
                  </div>
                </li>
                <li>
                  <h4 className="label-content-detail">CIDADE</h4>
                  <div className="detail-width-md flex-row">{clients.city}</div>
                </li>
              </ul>
            </div>
            <div className="pd-bt-mid">
              <ul className="client-content-body flex-row pd-zero">
                <li>
                  <h4 className="label-content-detail">LOGRADOURO</h4>
                  <div className="detail-width-md flex-row">
                    {clients.public_place}
                  </div>
                </li>
              </ul>
            </div>
            <div className="pd-bt-mid">
              <ul className="client-content flex-row pd-zero">
                <li>
                  <h4 className="label-content-detail pd-right-xlg">
                    COMPLEMENTO
                  </h4>
                  <div className="detail-width-md flex-row">
                    {clients.complement}
                  </div>
                </li>
                <li>
                  <h4 className="label-content-detail">PONTO DE REFERÊNCIA</h4>
                  <div className="detail-width-lg flex-row">{clients.uf}</div>
                </li>
              </ul>
            </div>
          </div>
          <div className="charges-content">
            {charges.length > 0 ? (
              <li className="pd-right-sm detail-width-lg">
                {charges.map(({ id, description, due_date, value, status }) => (
                  <div className="container-charges-detail flex-row">
                    <div className="flex-column widht-container">
                      <span className="flex-row items-center">
                        <h4 className="pd-right-sm">#{id}</h4>
                        {description}
                      </span>
                      <span className="detail-date ">
                        {Intl.DateTimeFormat("pt-br", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        }).format(new Date(due_date))}
                      </span>
                    </div>
                    <div className="flex-column align-items-end">
                      <h5 className="detail-value">
                        {Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(value)}
                      </h5>
                      <span
                        className="status"
                        style={
                          status.toUpperCase() === "PAGO"
                            ? { color: "#4EC06E" }
                            : status.toUpperCase() === "PENDENTE"
                            ? { color: "#5197B5" }
                            : { color: "#FF4D4D" }
                        }
                      >
                        {status}
                      </span>
                    </div>
                  </div>
                ))}
              </li>
            ) : (
              <div className="items-center mg-error">
                {charges.length === 0 && (
                  <Alert severity="error" onClose={closeAlert}>
                    O cliente não possui cobranças cadastradas
                  </Alert>
                )}
              </div>
            )}
          </div>
          {reqError && (
            <Alert severity="error" onClose={closeAlert}>
              {reqError}
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}

export default DetailClient;
