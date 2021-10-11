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
import { toast } from 'react-toastify';
import useStyles from "../../styles/useStyles";
import getCityByCep from '../../services/viaCep';
import TokenContext from "../../contexts/token/TokenContext";

import './styles.css';
import '../../styles/form.css';


function CreateCharge() {
    const { token } = useContext(TokenContext);
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
                <span className='title-form-h5'>// CRIAR COBRANÇA</span>
                <form className='form width-lg label-form' onSubmit={handleSubmit(addClient)} onKeyDown={e => e.code === 'Enter' && e.preventDefault()}>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Cliente</label>
                            <input
                                className='input-form width-lg'
                                id='name'
                                type="text"
                                {...register("nome", { required: true })}
                            />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='description'>Descrição</label>
                            <input
                                className='input-form width-lg'
                                id='email'
                                type="text"
                                {...register('email', { required: true })}
                            />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='status'>Status</label>
                            <input
                                className='input-form width-lg'
                                id='email'
                                type="text"
                                {...register('email', { required: true })}
                            />
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cpf'>Valor</label>
                                <input
                                    className='input-form width-mid' id='cpf' type="text"
                                    {...register('cpf', { required: true })}
                                />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='phone'>Vencimento</label>
                                <input
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

export default CreateCharge;