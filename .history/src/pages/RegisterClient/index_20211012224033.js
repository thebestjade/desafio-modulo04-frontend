import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ButtonSubmit from '../../components/ButtonSubmit';
import ButtonProfile from '../../components/ButtonProfile';
import { toast } from 'react-toastify';
import InputMask from "react-input-mask";
import useStyles from "../../styles/useStyles";
import getCityByCep from '../../services/viaCep';
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from "../../components/SideBar";

import './styles.css';
import '../../styles/form.css';
import EditUser from "../EditUser";
import ModalContext from "../../contexts/modal/ModalContext";


function Client() {
    const { token } = useContext(TokenContext);
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register, formState: { isValid }
    } = useForm({ mode: 'onChange' });
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

        if (cep.indexOf('-') !== -1) {
            const cepToSearch = cep.trim().replace('-', '');
            if (cepToSearch.length === 8) {
                loadCityByCep(cepToSearch);
            }
        } else {
            if (cep.length === 8) {
                loadCityByCep(cep);
            }
        }
    }, [cep])



    async function addClient(addData) {

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch("https://desafio04-backend.herokuapp.com/cadastrarCliente", {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(addData),
                headers: {
                    "Content-type": "application/json",
                    mode: "cors",
                    Authorization: token,
                },
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setReqSuccess(data);
                const timer = setTimeout(() => {
                    history.push('/');
                    clearTimeout(timer);
                }, 2000);
                return;
            }

            setReqError(data);
        } catch (error) {
            setReqError(error.message);
        }
    };

    const closeAlert = () => {
        setReqError("");
        setReqSuccess("");
    };

    const { isOpen } = useContext(ModalContext);

    return (
        <div className="container-client flex-row">
            {isOpen && <EditUser />}
            <SideBar />
            <div className='container-form-client flex-column'>
                <ButtonProfile />
                <span className='title-form-h5'>// ADICIONAR CLIENTE</span>
                <form className='form width-lg label-form' onSubmit={handleSubmit(addClient)} onKeyDown={e => (e.code === 'Enter' || e.code === 'NumpadEnter') && e.preventDefault()}>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Nome</label>
                            <input
                                className='input-form width-lg'
                                id='name'
                                type="text"
                                {...register("nome", { required: true })}
                            />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                className='input-form width-lg'
                                id='email'
                                type="text"
                                {...register('email', { required: true })}
                            />
                        </div>
                        <div className='flex-row form-gap form-inline' >
                            <div className='flex-column'>
                                <label htmlFor='cpf'>CPF</label>
                                <InputMask
                                    className='input-form'
                                    mask="999.999.999-99"
                                    {...register("cpf")}
                                >
                                    {(inputProps) => (<input
                                        {...inputProps}
                                        name='cpf'
                                        type="text"

                                    />)
                                    }
                                </InputMask>
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='phone'>Telefone</label>
                                <InputMask
                                    className='input-form'
                                    mask="(99)99999-9999"
                                    {...register("phone")}
                                >
                                    {(inputProps) => (<input
                                        {...inputProps}
                                        name='phone'
                                        type="text"

                                    />)
                                    }
                                </InputMask>
                            </div>
                        </div>
                        <div className='flex-row form-gap form-inline' >
                            <div className='flex-column'>
                                <label htmlFor='cep'>CEP</label>
                                <InputMask
                                    value={cep}
                                    onChange={(e) => setCep(e.target.value)}
                                    className='input-form'
                                    mask="999.999.999-99"
                                    {...register("cep")}
                                >
                                    {(inputProps) => (<input
                                        {...inputProps}
                                        name='cep'
                                        type="text"

                                    />)
                                    }
                                </InputMask>
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='street'>Logradouro</label>
                                <input
                                    className='input-form width-mid'
                                    id='street'
                                    type="text"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex-row form-gap form-inline' >
                            <div className='flex-column'>
                                <label htmlFor='local'>Bairro</label>
                                <input
                                    className='input-form width-mid'
                                    id='local'
                                    type="text"
                                    value={district}
                                    onChange={(e) => setDistrict(e.target.value)}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='city'>Cidade</label>
                                <input
                                    className='input-form width-mid'
                                    id='city'
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='flex-row form-gap form-inline' >
                            <div className='flex-column'>
                                <label htmlFor='complete'>Complemento</label>
                                <input
                                    className='input-form width-mid' id='complete' type="text"
                                    {...register('complemento')}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='reference'>Estado</label>
                                <input
                                    className='input-form  width-mid' id='reference' type="text"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                />
                            </div>
                        </div>

                        {reqSuccess && (<Alert severity="success" onClose={closeAlert}>
                            {reqSuccess}
                        </Alert>)}

                        {reqError && (<Alert severity="error" onClose={closeAlert}>
                            {reqError}
                        </Alert>)}

                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <div className='flex-row form-gap ml-auto'>

                            <button
                                className='btn-cancel mt-lg'
                                onClick={() => history.goBack()}
                            >
                                Cancelar
                            </button>

                            <ButtonSubmit
                                label='Adicionar cliente'
                                color={isValid && '#DA0175'}
                            />
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default Client;