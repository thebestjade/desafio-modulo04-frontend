/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";
import SubmitButton from '../../components/SubmitButton';

import useStyles from "../../styles/useStyles";

import './styles.css';
import '../../styles/form.css';
import Logo from '../../assets/logo-white.svg';
import MenuSideBar from '../../components/MenuSideBar';
import ButtonProfile from '../../components/ButtonProfile';
import IconHome from "../../assets/IconHome";
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";

import { getCityByCep } from '../../services/viaCep'

function Client() {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");


    const [cep, setCep] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [street, setStreet] = useState("");


    async function loadCityByCep(myCep) {
        const [localidade, logradouro, bairro] = await getCityByCep(myCep);
        if (!logradouro) {
            return;
        }

        console.log(logradouro);
        console.log(bairro);

        setCity(logradouro);
        setDistrict(bairro);
        setStreet(localidade);
    }

    useEffect(() => {

        if (cep.length < 9 && city.length > 0) {
            setCity('');
        }

        if (cep.indexOf('-') !== -1) {
            if (cep.length === 9) {
                loadCityByCep(cep);
            }
            return;
        }

        if (cep.length === 8) {
            loadCityByCep(cep);
        }

    }, [cep])



    async function addClient(addData) {

        try {
            setLoading(true);
            setReqError("");

            const response = await fetch("https://desafio04-backend.herokuapp.com/editarUsuario", {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(addData),
                headers: {
                    "Content-type": "application/json",
                },
            });

            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                return history.push("/clientes");
            }

            setReqError(data);
        } catch (error) {
            setReqError(error.message);
        }
    };

    const closeAlert = () => {
        setReqError("");
    };

    return (
        <div className="container-client flex-row">
            <div className='side-bar-client text-center' >
                <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />

                <MenuSideBar
                    label='HOME'
                    url={'/'}
                    icon={<IconHome />}
                    color={location.pathname === '/' && '#374952'}
                />

                <MenuSideBar
                    color={location.pathname === '/contratacoes' && '#374952'}
                    label='CONTRATAÇÕES'
                    url='/contratacoes'
                    icon={<IconMoney />}
                />

                <MenuSideBar
                    color={location.pathname === '/adicionarCliente' && '#374952'}
                    label='CLIENTES'
                    url='/adicionarCliente'
                    icon={<IconUser />}
                />

                <button className='btn-enable-charges items-center'>Criar cobrança</button>
            </div>
            <div className='container-form-client flex-column'>
                <ButtonProfile />
                <span className='title-form-h5'>// ADICIONAR CLIENTE</span>
                <form className='form width-lg label-form' onSubmit={handleSubmit(addClient)}>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Nome</label>
                            <input
                                {...register("nome", { required: true })}
                                className='input-form width-lg'
                                id='name'
                                type="text"
                            />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='email'>E-mail</label>
                            <input
                                {...register('email', { required: true })}
                                className='input-form width-lg'
                                id='email'
                                type="text"
                            />
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cpf'>CPF</label>
                                <input className='input-form width-mid' id='cpf' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='phone'>Telefone</label>
                                <input className='input-form width-mid' id='phone' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cep'>CEP</label>
                                <input
                                    className='input-form width-mid'
                                    id='cep'
                                    type="text"
                                    value={cep}
                                    maxLength={9}
                                    onChange={(e) => setCep(e.target.value)}
                                />
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
                        <div className='flex-row form-gap' >

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
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='complete'>Complemento</label>
                                <input className='input-form width-mid' id='complete' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='reference'>Ponto de referência</label>
                                <input className='input-form  width-mid' id='reference' type="text" />
                            </div>
                        </div>

                        {reqError && (
                            <Alert severity="error" onClose={closeAlert}>
                                {reqError}
                            </Alert>
                        )}

                        <div className='flex-row form-gap ml-auto'>
                            <button className='btn-cancel mt-lg'>Cancelar</button>

                            <SubmitButton
                                label='Adicionar cliente'
                            />

                        </div>
                    </div>
                </form>

                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>

            </div>
        </div>
    )
}

export default Client;