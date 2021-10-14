import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ButtonSubmit from "../../components/ButtonSubmit";
import ButtonProfile from "../../components/ButtonProfile";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";
import useStyles from "../../styles/useStyles";
import getCityByCep from "../../services/viaCep";
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from "../../components/SideBar";

import "./styles.css";
import "../../styles/form.css";
import EditUser from "../EditUser";
import ModalContext from "../../contexts/modal/ModalContext";

function Client() {
  const { isOpenUser } = useContext(ModalContext);
  const { token } = useContext(TokenContext);
  const classes = useStyles();
  const history = useHistory();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const [reqError, setReqError] = useState("");
  const [reqSuccess, setReqSuccess] = useState("");

  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [street, setStreet] = useState("");
  const [state, setState] = useState("");

  async function loadCityByCep(myCep) {
    const { localidade, logradouro, bairro, uf } = await getCityByCep(myCep);
    if (!localidade) {
      toast.error("Falha ao encontrar cidade", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        hideProgressBar: false,
      });
      return;
    }
    setCity(localidade);
    setDistrict(bairro);
    setStreet(logradouro);
    setState(uf);
  }

  useEffect(() => {
    if (cep.indexOf("-") !== -1) {
      const cepToSearch = cep.replace(/\D/g, "");
      if (cepToSearch.length === 8) {
        loadCityByCep(cepToSearch);
      }
    } else {
      if (cep.length === 8) {
        loadCityByCep(cep);
      }
    }
  }, [cep]);

  async function addClient(addData) {
      const newAddData = {...addData, logradouro: street, estado: state, cidade: city, bairro: district }
    try {
      setLoading(true);
      setReqError("");
      setReqSuccess("");

      const response = await fetch(
        "https://desafio04-backend.herokuapp.com/cadastrarCliente",
        {
          method: "POST",
          cache: "no-cache",
          credentials: "same-origin",
          body: JSON.stringify(newAddData),
          headers: {
            "Content-type": "application/json",
            mode: "cors",
            Authorization: token,
          },
        }
      );

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        setReqSuccess(data);
        const timer = setTimeout(() => {
          history.push("/clientes");
          clearTimeout(timer);
        }, 2000);
        return;
      }

      setReqError(data);
    } catch (error) {
      setReqError(error.message);
    }
  }

  const closeAlert = () => {
    setReqError("");
    setReqSuccess("");
  };

  return (
    <div className="container-client flex-row">
      {isOpenUser && <EditUser />}
      <SideBar />
      <ButtonProfile />
      <div className="container-form-client flex-column overflow-scroll mt-xlg">
        <span className="title-form-h5">{`// ADICIONAR CLIENTE`}</span>
        <form
          className="form width-lg label-form"
          onSubmit={handleSubmit(addClient)}
          onKeyDown={(e) =>
            (e.code === "Enter" || e.code === "NumpadEnter") &&
            e.preventDefault()
          }
        >
          <div className="flex-column  content-center items-center">
            <div className="flex-column">
              <label htmlFor="nome">Nome</label>
              <input
                className="input-form width-lg"
                id="nome"
                type="text"
                {...register("nome", { required: true })}
              />
            </div>
            <div className="flex-column">
              <label htmlFor="email">E-mail</label>
              <input
                className="input-form width-lg"
                id="email"
                type="text"
                {...register("email", { required: true })}
              />
            </div>
            <div className="flex-row form-gap form-inline">
              <div className="flex-column">
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  className="input-form"
                  mask="999.999.999-99"
                  {...register("cpf", { required: true, pattern: /(\d{3}.){2}\d{3}-\d{2}/g })}
                >
                  {(inputProps) => (
                    <input {...inputProps} name="cpf" id="cpf" type="text" />
                  )}
                </InputMask>
              </div>
              <div className="flex-column">
                <label htmlFor="telefone">Telefone</label>
                <InputMask
                  className="input-form"
                  mask="(99)99999-9999"
                  {...register("telefone", {
                    required: true,
                    pattern: /\([0-9]{2}\)[0-9]{4,5}-[0-9]{4}/g,
                  })}
                >
                  {(inputProps) => (
                    <input
                      {...inputProps}
                      name="telefone"
                      id="telefone"
                      type="text"
                    />
                  )}
                </InputMask>
              </div>
            </div>
            <div className="flex-row form-gap form-inline">
              <div className="flex-column">
                <label htmlFor="cep">CEP</label>
                <InputMask
                  className="input-form"
                  mask="99999-999"
                  {...register("cep", {
                    onChange: (e) => {
                      setCep(e.target.value);
                    },
                  })}
                >
                  {(inputProps) => (
                    <input {...inputProps} name="cep" id="cep" type="text" />
                  )}
                </InputMask>
              </div>
              <div className="flex-column">
                <label htmlFor="logradouro">Logradouro</label>
                <input
                  className="input-form width-mid"
                  id="logradouro"
                  type="text"
                  value={street}
                  {...register("logradouro", {
                    onChange: (e) => setStreet(e.target.value),
                  })}
                />
              </div>
            </div>
            <div className="flex-row form-gap form-inline">
              <div className="flex-column">
                <label htmlFor="bairro">Bairro</label>
                <input
                  className="input-form width-mid"
                  id="bairro"
                  type="text"
                  value={district}
                  {...register("bairro", {
                    onChange: (e) => setDistrict(e.target.value),
                  })}
                />
              </div>
              <div className="flex-column">
                <label htmlFor="cidade">Cidade</label>
                <input
                  className="input-form width-mid"
                  id="cidade"
                  type="text"
                  value={city}
                  {...register("cidade", {
                    onChange: (e) => setCity(e.target.value),
                  })}
                />
              </div>
            </div>
            <div className="flex-row form-gap form-inline">
              <div className="flex-column">
                <label htmlFor="complemento">Complemento</label>
                <input
                  className="input-form width-mid"
                  id="complemento"
                  type="text"
                  {...register("complemento")}
                />
              </div>
              <div className="flex-column">
                <label htmlFor="estado">Estado</label>
                <input
                  className="input-form  width-mid"
                  id="estado"
                  type="text"
                  value={state}
                  {...register("estado", {
                    onChange: (e) => setState(e.target.value),
                  })}
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

            <div className="flex-row form-gap ml-auto">
              <button
                className="btn-cancel mt-lg"
                onClick={() => history.goBack()}
              >
                Cancelar
              </button>

              <ButtonSubmit
                label="Adicionar cliente"
                color={isValid && "#DA0175"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Client;
