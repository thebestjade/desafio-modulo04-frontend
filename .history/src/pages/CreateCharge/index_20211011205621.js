import React, { useState, useEffect, useContext } from "react";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import SubmitButton from '../../components/SubmitButton';
import Logo from '../../assets/logo-white.svg';
import MenuSideBar from '../../components/MenuSideBar';
import ButtonProfile from '../../components/ButtonProfile';
import IconHome from "../../assets/IconHome";
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import useStyles from "../../styles/useStyles";
import TokenContext from "../../contexts/token/TokenContext";

import './styles.css';
import '../../styles/form.css';
import ClientsContext from "../../contexts/clients/ClientsContext";


function CreateCharge() {
    const { token } = useContext(TokenContext);
    const { clients, setClients } = useContext(ClientsContext);

    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
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

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch("https://desafio04-backend.herokuapp.com/cadastrarCobranca", {
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
                    url='/clientes'
                    icon={<IconUser />}
                />

                <button className='btn-enable-charges items-center'>Criar cobrança</button>
            </div>
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
                                {clients.map(({ id, name }) => (
                                    <option 
                                    value={id}
                                    >
                                        {name}
                                    </option>
                                ))}
                                <option selected="selected">Selecione um cliente</option>
                            </select>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='description'>Descrição</label>
                            <input
                                className='input-form width-lg input-description'
                                id='email'
                                type="text"
                                {...register('email', { required: true })}
                            />
                            <span className='label-description'>A descrição informada será impressa  no boleto</span>
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='status'>Status</label>
                            <input
                                className='input-form width-lg'
                                placeholder='Selecione um status'
                                id='email'
                                type="text"
                                {...register('email', { required: true })}
                            />
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cpf'>Valor</label>
                                <input
                                    placeholder='R$ 0,00'
                                    className='input-form width-mid' id='cpf' type="text"
                                    {...register('cpf', { required: true })}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='phone'>Vencimento</label>
                                <input
                                    type="date"
                                    className='input-form width-mid' id='phone' type="text"
                                    {...register('telefone', { required: true })}
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