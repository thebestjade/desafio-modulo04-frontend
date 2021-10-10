/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Home from "../Home";
import TokenContext from "../../contexts/token/TokenContext";
import UserContext from "../../contexts/user/UserContext";
import SubmitButton from '../../components/SubmitButton';
import getCityByCep from '../../services/viaCep';
import { toast } from 'react-toastify';



import './styles.css';
import '../Home/styles.css';
import useStyles from "../../styles/useStyles";

function EditClient() {

    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm({ mode: 'onChange' });
    const { token } = useContext(TokenContext);
    const { user, setUser } = useContext(UserContext);
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

    async function GetUser() {


        setReqError('')

        const response = await fetch("https://desafio04-backend.herokuapp.com/perfil", {
            headers: {
                "Content-type": "application/json",
                mode: 'cors',
                Authorization: token,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return setUser(data);
        }
        setReqError(data);
    }

    async function updateClient(updateData) {

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch("https://desafio04-backend.herokuapp.com/editarCliente", {
                method: "PUT",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(updateData),
                headers: {
                    "Content-type": "application/json",
                    Authorization: token
                },
            });

            const data = await response.json();

            setLoading(false);

            if (response.ok) {
                setReqSuccess(data);
                GetUser();
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

    return (
        <div >
            <Home />
            {Object.keys(user).length &&
                <>
                    <div className='container-form flex-column modal-form '>
                    <form className='form width-lg label-form' onSubmit={handleSubmit(updateClient)} onKeyDown={e => e.code === 'Enter' && e.preventDefault()}>
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
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cpf'>CPF</label>
                                <input
                                    maxLength={11}
                                    className='input-form width-mid' id='cpf' type="text"
                                    {...register('cpf', { required: true })}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='phone'>Telefone</label>
                                <input
                                    maxLength={11}
                                    className='input-form width-mid' id='phone' type="text"
                                    {...register('telefone', { required: true })}
                                />
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
                            <button className='btn-cancel mt-lg' >Cancelar</button>
                            <SubmitButton
                                label='Adicionar cliente'
                                color={isValid && '#DA0175'}
                            />
                        </div>
                    </div>
                </form>
                    </div>
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </>
            }
        </div>
    )
}

export default EditClient;