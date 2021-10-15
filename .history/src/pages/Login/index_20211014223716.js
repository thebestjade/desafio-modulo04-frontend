/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import TokenContext from "../../contexts/token/TokenContext";
import UserContext from "../../contexts/user/UserContext";
import Logo from '../../assets/logo-dark.svg';
import InputPassword from '../../components/InputPassword';
import AccessLink from '../../components/AccessLink';
import ButtonSubmit from '../../components/ButtonSubmit';

import './styles.css';
import '../../styles/form.css';
import useStyles from "../../styles/useStyles";

function Login() {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm({ mode: "onChange" });
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const useToken = useContext(TokenContext);
    const { setUser } = useContext(UserContext);

    async function loginUser(loginData) {
        try {

            setLoading(true);
            setReqError("");
        
            const response = await fetch('https://desafio04-backend.herokuapp.com/login', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: JSON.stringify(loginData),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                useToken.logar(data?.token, () => history.push("/"));
                setUser(data.userData);
                return;
            }

            setReqError(data);

        } catch (error) {
            setReqError(error.message);
        }
    }

    const closeAlert = () => {
        setReqError("");
    };

    return (
        <div className='container-form flex-column'>
            <form className='home form' onSubmit={handleSubmit(loginUser)}>
                <div className='text-center mb-lg'>
                    <img className='logo-form' src={Logo} alt="Logo da Cubos Academy" />
                </div>
                <div className='flex-column  content-center items-center'>
                    <div className='flex-column'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            id='email'
                            type="text"
                            placeholder='exemplo@gmail.com'
                            {...register('email', { required: true })}
                        />
                    </div>

                    <InputPassword
                        register={() => register('senha', { required: true })}
                    />

                    {reqError && (
                        <Alert severity="error" onClose={closeAlert}>
                            {reqError}
                        </Alert>
                    )}

                    <ButtonSubmit
                        label='Entrar'
                        color={isValid && '#DA0175'}
                    />

                    <Backdrop
                        className={classes.backdrop}
                        open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </form>
            <AccessLink text='Não tem uma conta? ' label='Cadastre-se' url='/cadastro' />
        </div>
    )
}

export default Login;