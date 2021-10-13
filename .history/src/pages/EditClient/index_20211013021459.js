/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import InputMask from "react-input-mask";
import { useHistory, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Client from '../Clients'
import TokenContext from "../../contexts/token/TokenContext";
import ButtonSubmit from '../../components/ButtonSubmit';


import './styles.css';
import '../Home/styles.css';
import useStyles from "../../styles/useStyles";
import getCityByCep from "../../services/viaCep";
import { toast } from "react-toastify";

function EditClient() {

    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { isValid },
    } = useForm({ mode: 'onChange' });

    const { clienteId } = useParams();
    const { token } = useContext(TokenContext);
    const [clients, setClients] = useState({});
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const [reqSuccess, setReqSuccess] = useState("");
    const [cep, setCep] = useState("");


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
        setClients({...clients, city: localidade, public_place: logradouro, district: bairro, uf: uf});
        
    }

    useEffect(() => {

        if (cep.indexOf('-') !== -1) {
            const cepToSearch = cep.replace(/\D/g, '');
            if (cepToSearch.length === 8) {
                loadCityByCep(cepToSearch);
            }
        } else {
            if (cep.length === 8) {
                loadCityByCep(cep);
            }
        }
    }, [cep])

    async function getClient() {
        setReqError('')

        const response = await fetch(`https://desafio04-backend.herokuapp.com/clientes/${clienteId}`, {
            mode: 'cors',
            headers: {
                "Content-type": "application/json",
                Authorization: token,
            },
        });
        const data = await response.json();
        console.log(data)
        if (response.ok) {
            return setClients(data.client);
        }
        setReqError(data);
    }

    async function updateClient(updateData) {

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch(`https://desafio04-backend.herokuapp.com/editarCliente/${clienteId}`, {
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
                getClient();
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

    useEffect(() => {
        getClient();
    }, []);

    return (
        <div >
            <Client />
            {Object.keys(clients).length &&
                <>
                    <div className='container-form flex-column modal-form '>
                        <form className='form wclienteIdth-lg label-form' onSubmit={handleSubmit(updateClient)} onKeyDown={e => (e.code === 'Enter' || e.code === 'NumpadEnter') && e.preventDefault()}>
                            <a className='align-self-end' href='#close'
                                onClick={() => history.goBack()}
                            >x</a>
                            <div className='flex-column  content-center items-center'>
                                <div className='flex-column'>
                                    <label htmlFor='name'>Nome</label>
                                    <input
                                        className='input-form width-lg'
                                        id='name'
                                        type="text"
                                        defaultValue={clients.name}
                                        {...register("nome", { required: true })}
                                    />
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input
                                        className='input-form width-lg'
                                        id='email'
                                        type="text"
                                        defaultValue={clients.email}
                                        {...register('email', { required: true })}
                                    />
                                </div>
                                <div className='flex-row form-gap' >
                                    <div className='flex-column'>
                                        <label htmlFor='cpf'>CPF</label>
                                        <InputMask
                                            className='input-form'
                                            mask="999.999.999-99"
                                            defaultValue={clients.cpf}
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
                                            defaultValue={clients.phone}
                                            {...register("telefone")}
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
                                <div className='flex-row form-gap' >
                                    <div className='flex-column'>
                                        <label htmlFor='cep'>CEP</label>
                                        <InputMask
                                            className='input-form'
                                            mask="99999-999"
                                            defaultValue={clients.cep}
                                            {...register("cep", {onChange: (e) => {setCep(e.target.value)}})}
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
                                            defaultValue={clients.public_place}
                                            className='input-form width-mid'
                                            id='street'
                                            type="text"
                                            {...register("logradouro")}
                                        />
                                    </div>
                                </div>
                                <div className='flex-row form-gap' >
                                    <div className='flex-column'>
                                        <label htmlFor='local'>Bairro</label>
                                        <input
                                            defaultValue={clients.district}
                                            className='input-form width-mid'
                                            id='local'
                                            type="text"
                                            {...register("bairro")}
                                        />
                                    </div>
                                    <div className='flex-column'>
                                        <label htmlFor='city'>Cidade</label>
                                        <input
                                            defaultValue={clients.city}
                                            className='input-form width-mid'
                                            id='city'
                                            type="text"
                                            {...register("cidade")}
                                        />
                                    </div>
                                </div>
                                <div className='flex-row form-gap' >
                                    <div className='flex-column'>
                                        <label htmlFor='complete'>Complemento</label>
                                        <input
                                            defaultValue={clients.complement}
                                            className='input-form width-mid' id='complete' type="text"
                                            {...register('complemento')}
                                        />
                                    </div>
                                    <div className='flex-column'>
                                        <label htmlFor='reference'>Estado</label>
                                        <input
                                            defaultValue={clients.uf}
                                            className='input-form  width-mid' 
                                            id='reference' type="text"
                                            {...register('uf', { required: true })}
                                        />
                                    </div>
                                    {console.log(clients.uf)}
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
                                        onClick={() => history.push('/clientes')}
                                    >
                                        Cancelar
                                    </button>

                                    <ButtonSubmit
                                        label='Editar cliente'
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
    );
}


export default EditClient;