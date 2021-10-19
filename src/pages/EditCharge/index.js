/* eslint-disable no-sequences */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ButtonSubmit from "../../components/ButtonSubmit";
import ptBR from "date-fns/locale/pt-BR";

import "./styles.css";
import "../../styles/form.css";
import useStyles from "../../styles/useStyles";
import TokenContext from "../../contexts/token/TokenContext";
import ChargesContext from "../../contexts/charge/ChargesContexts";
import IconTrash from "../../assets/IconTrash";
import AlertRemove from "../../components/AlertRemove";
import { getCharges } from "../Charges";
import { getClients } from "../Clients/index";
import { currencyMask } from "../../helpers/currencyMask";

registerLocale("pt-BR", ptBR);

function EditCharge({ idCharge, setIdCharge, setIsOpenCharge }) {
  const classes = useStyles();

  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const { token } = useContext(TokenContext);
  const [clients, setClients] = useState([]);
  const { setCharges } = useContext(ChargesContext);
  const [charge, setCharge] = useState({});
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [reqSuccess, setReqSuccess] = useState("");
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const handleOpenAlert = (status) => {
    setIsOpenAlert(status);
  };

  const handleCloseModal = () => {
    setIdCharge(null);
    setIsOpenCharge(false);
  };
  const closeAlert = () => {
    setReqError("");
    setReqSuccess("");
  };

  async function getCharge() {
    setLoading(true);
    setReqError("");

    const response = await fetch(
      `https://desafio04-backend.herokuapp.com/cobrancas/${idCharge}`,
      {
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      getClients(token, setClients, setReqError);
      setLoading(false);
      return setCharge(data);
    }
    setReqError(data);
    setLoading(false);
  }

  async function updateCharge(updateData) {
    let newValue = updateData.valor;
    newValue = newValue.replace(/R\$ /g, "");
    const idCliente = clients
    .find((client) => client.name === updateData.clienteId)
    ?.id.toString();
    const newUpdateData = {
      ...updateData,
      valor: newValue,
      clienteId: idCliente,
    };

    try {
      setReqError("");
      setReqSuccess("");

      const response = await fetch(
        `https://desafio04-backend.herokuapp.com/editarCobranca/${idCharge}`,
        {
          method: "PUT",
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(newUpdateData),
          headers: {
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setReqSuccess(data);
        getCharges(token, setCharges, setReqError);
        const timer = setTimeout(() => {
          handleCloseModal();
          clearTimeout(timer);
        }, 2000);
        return;
      }

      setReqError(data);
    } catch (error) {
      setReqError(error.message);
    }
  }

  async function deleteCharge(idCharge) {
    try {
      setReqError("");
      setReqSuccess("");
      const response = await fetch(
        `https://desafio04-backend.herokuapp.com/deletarCobranca/${idCharge}`,
        {
          method: "DELETE",
          headers: {
            mode: "cors",
            "Content-type": "application/json",
            Authorization: token,
          },
        }
      );
      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        getCharges(token, setCharges, setReqError);
        setReqSuccess(data);
        const timer = setTimeout(() => {
          handleCloseModal();
          clearTimeout(timer);
        }, 2000);
        return;
      }

      setReqError(data);
    } catch (error) {
      setReqError(error);
    }
  }
  useEffect(() => {
    if (idCharge) {
      getCharge();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!loading && !!Object.keys(charge).length && (
        <>
          <div className="container-form flex-column modal-form padding-form-edit">
            <form
              className="form width-lg label-form"
              onSubmit={handleSubmit(updateCharge)}
              onKeyDown={(e) =>
                (e.code === "Enter" || e.code === "NumpadEnter") &&
                e.preventDefault()
              }
            >
              <button
                className="button-decoration-none align-self-end"
                onClick={handleCloseModal}
                type="button"
              >
                x
              </button>
              <div className="flex-column  content-center items-center">
                <div className="flex-column">
                  {clients.length > 0 && (
                    <>
                      <label htmlFor="clienteId">Cliente</label>
                      <Controller
                      control={control}
                      id="clienteId"
                      defaultValue={charge.name}
                      {...register("clienteId", { required: true })}
                      render={({ field }) => (
                        <select
                        className="input-form width-lg mb-md"
                        selected={field.value}
                        onChange={(clientId) => field.onChange(clientId)}
                        // defaultValue={charge.name}
                        {...register("clienteId", { required: true })}
                      >
                        {clients.map(({ id, name }) => (
                          <option value={name} key={id}>{name}</option>
                        ))}
                        {/* <option>Selecione o cliente</option> */}
                      </select>
                        // <ReactDatePicker
                        //   className="input-form"
                          
                        //   selected={field.value}
                        //   locale="pt-BR"
                        //   dateFormat="dd 'de' MMMM 'de' yyyy"
                        // />
                      )}
                    />
                      
                      {/* <Select
                        register={register}
                        className="input-form width-lg mb-md"
                        name="clienteId"
                        defaultValue={charge.name}
                        options={clients}
                      /> */}
                    </>
                  )}
                </div>
                <div className="flex-column">
                  <label htmlFor="descricao">Descrição</label>
                  <input
                    className="input-form width-lg input-description"
                    id="descricao"
                    defaultValue={charge.description}
                    type="text"
                    {...register("descricao", { required: true })}
                  />
                  <span className="label-description">
                    A descrição informada será impressa no boleto
                  </span>
                </div>
                <div className="flex-column">
                  <label htmlFor="status">Status</label>
                  <select
                    defaultValue={charge.status}
                    className="input-form width-lg mb-md"
                    id="status"
                    {...register("status", { required: true })}
                  >
                    <option value="pendente">Pendente</option>
                    <option value="pago">Pago</option>
                  </select>
                </div>
                <div className="flex-row form-gap">
                  <div className="flex-column">
                    <label htmlFor="valor">Valor</label>
                    <input
                      type="text"
                      {...register("valor", { required: true })}
                      placeholder="R$ 999.999,99"
                      defaultValue={currencyMask(charge.value)}
                      className="input-form width-mid"
                      onChange={(e) =>
                        setValue("valor", currencyMask(e.target.value))
                      }
                    />
                  </div>
                  <div className="flex-column">
                    <label htmlFor="vencimento">Vencimento</label>
                    <Controller
                      control={control}
                      id="vencimento"
                      defaultValue={new Date(charge.due_date)}
                      {...register("vencimento", { required: true })}
                      render={({ field }) => (
                        <ReactDatePicker
                          className="input-form"
                          onChange={(date) => field.onChange(date)}
                          selected={field.value}
                          locale="pt-BR"
                          dateFormat="dd 'de' MMMM 'de' yyyy"
                        />
                      )}
                    />
                  </div>
                </div>

                {reqSuccess && (
                  <Alert severity="success" onClose={closeAlert}>
                    {reqSuccess}
                  </Alert>
                )}

                {reqError && (
                  <Alert severity="error" onClose={closeAlert}>
                    {reqError}
                  </Alert>
                )}

                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <div className="align-self-start flex-row items-center">
                  <IconTrash />
                  <button
                    type="button"
                    onClick={() => handleOpenAlert(true)}
                    className="button-appearance-none"
                  >
                    <u style={({ color: "#868686" }, { marginLeft: "4px" })}>
                      Excluir cobrança
                    </u>
                  </button>
                  {isOpenAlert && (
                    <AlertRemove
                      deleteCharge={() => deleteCharge(charge.id)}
                      closeAlert={() => handleOpenAlert(false)}
                    />
                  )}
                </div>

                <div className="flex-row form-gap ml-auto">
                  <button
                    onClick={handleCloseModal}
                    className="btn-cancel mt-lg"
                    type="button"
                  >
                    Cancelar
                  </button>

                  <ButtonSubmit
                    label="Editar cobrança"
                    color={isValid && "#DA0175"}
                  />
                </div>
              </div>
            </form>
          </div>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </div>
  );
}

export default EditCharge;
