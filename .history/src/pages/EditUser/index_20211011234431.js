/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useContext, useState } from "react";
import InputMask from "react-input-mask";
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
import InputPassword from '../../components/InputPassword';

import './styles.css';
import '../Home/styles.css';
import useStyles from "../../styles/useStyles";

function EditUser() {

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


    async function getUser() {

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

    async function updateUser(updateData) {

        try {
            setLoading(true);
            setReqError("");
            setReqSuccess("");


            const response = await fetch("https://desafio04-backend.herokuapp.com/editarUsuario", {
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
                getUser();
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
                        <form className='form margin-top-modal' onSubmit={handleSubmit(updateUser)}>
                            <a className='align-self-end' href='#close'
                                onClick={() => history.push('/')}
                            >x</a>
                            <div className='text-center mb-lg align-self-start'>
                                <h4>// EDITAR USUÁRIO</h4>
                            </div>
                            <div className='flex-column  content-center items-center'>
                                <div className='flex-column'>
                                    <label htmlFor='nome'>Nome</label>
                                    <input
                                        id='nome' type="text"
                                        defaultValue={user.name}
                                        {...register('nome', { required: true })}
                                    />
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor='email'>E-mail</label>
                                    <input
                                        id='email' type="text"
                                        defaultValue={user.email}
                                        {...register('email', { required: true })}
                                    />

                                </div>

                                <div className='flex-column'>
                                    <label htmlFor='phone'>Telefone</label>
                                    <InputMask
                                        mask="(99)99999-9999"
                                        paceholder='Insira o telefone'
                                        {...register("telefone")}
                                    >
                                        {(inputProps) => (<input
                                            {...inputProps}
                                            name='phone'
                                            type="text"
                                            defaultValue={user.phone}
                                            />)
                                        }
                                    </InputMask>
                                </div>
                                <div className='flex-column'>
                                    <label htmlFor='cpf'>CPF</label>
                                    <InputMask
                                        mask="999.999.999-99"
                                        {...register("cpf")}
                                    >
                                       {(inputProps) => (<input
                                            {...inputProps}
                                            name='cpf'
                                            type="text"
                                            defaultValue={user.cpf}
                                            />)
                                        }
                                    </InputMask>
                                </div>

                                <InputPassword
                                    register={() => register('senha')}
                                />

                                {reqSuccess && (<Alert severity="success" onClose={closeAlert}>
                                    {reqSuccess}
                                </Alert>)}

                                {reqError && (<Alert severity="error" onClose={closeAlert}>
                                    {reqError}
                                </Alert>)}

                                <Backdrop
                                    className={classes.backdrop}
                                    open={loading}>
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                                <SubmitButton
                                    label='Editar conta'
                                    color={isValid && '#DA0175'}
                                />

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

export default EditUser;