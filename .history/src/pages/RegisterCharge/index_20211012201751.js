/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import { useHistory } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ClientsContext from "../../contexts/client/ClientsContext";
import ButtonSubmit from '../../components/ButtonSubmit';
import ButtonProfile from '../../components/ButtonProfile';
import TokenContext from "../../contexts/token/TokenContext";
import SideBar from "../../components/SideBar";
import ptBR from "date-fns/locale/pt-BR"

import './styles.css';
import '../../styles/form.css';
import useStyles from "../../styles/useStyles";

registerLocale('pt-BR', ptBR);

function CreateCharge() {
    const { token } = useContext(TokenContext);
    const { clients, setClients } = useContext(ClientsContext);

    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        control,
        register, formState: { isValid }
    } = useForm({ mode: 'onChange' });
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const [reqSuccess, setReqSuccess] = useState("");


    useEffect(() => {
        async function getClient() {

            const response = await fetch('https://desafio04-backend.herokuapp.com/clientes', {
                headers: {
                    "Content-type": "application/json",
                    Authorization: token,
                },
            });

            const { clients } = await response.json();
            if (response.ok) {
                return setClients(clients);
            }

        }
        getClient();

    }, [token, setClients]);


    async function addCharge(addData) {

        const newDueDate = new Date(addData.vencimento).getTime();
        const newAddData = { ...addData, vencimento: newDueDate }

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch("https://desafio04-backend.herokuapp.com/cadastrarCobranca", {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify(newAddData),
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

    return (
        <div className="container-client flex-row">
            <SideBar />
            <div className='container-form-client flex-column'>
                <ButtonProfile />
                <span className='title-form-h5'>// CRIAR COBRANÇA</span>
                <form className='form width-lg label-form' onSubmit={handleSubmit(addCharge)} onKeyDown={e => e.code === 'Enter' && e.preventDefault()}>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Cliente</label>
                            <select
                                className='input-form width-lg mb-md'
                                id='name'
                                {...register("nome", { required: true })}
                            >
                                {clients.map(({ id: clienteId, name }) => (
                                    <option
                                        value={Number(clienteId)}
                                    >
                                        {console.log(clienteId)}
                                        {name}
                                    </option>
                                ))}
                                <option selected="selected">Selecione o cliente</option>
                            </select>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='description'>Descrição</label>
                            <input
                                className='input-form width-lg input-description'
                                id='description'
                                type="text"
                                {...register('descrição', { required: true })}
                            />
                            <span className='label-description'>A descrição informada será impressa  no boleto</span>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='status'>Status</label>
                            <select
                                className='input-form width-lg mb-md'
                                id='name'
                                {...register("status", { required: true })}
                            >
                                <option>
                                    Pendente
                                </option>
                                <option>
                                    Pago
                                </option>
                                <option selected>Selecione um status</option>

                            </select>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='value'>Valor</label>
                                <input
                                    placeholder='R$ 0,00'
                                    className='input-form width-mid' id='value' type="text"
                                    {...register('valor', { required: true })}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='dueDate'>Vencimento</label>
                                <Controller
                                    control={control}
                                    id='dueDate'
                                    {...register('vencimento', { required: true })}
                                    render={({ field }) => (
                                        <ReactDatePicker
                                            className='input-form'
                                            onChange={(date) => field.onChange(date)}
                                            selected={field.value}
                                            locale='pt-BR'
                                            dateFormat="dd 'de' MMMM 'de' yyyy"
                                        />
                                    )}
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
                                label='Criar cobrança'
                                color={isValid && '#DA0175'}
                            />
                        </div>
                    </div>
                </form>


            </div>
        </div>
    )
}

export default CreateCharge;