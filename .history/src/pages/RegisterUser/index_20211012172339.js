import { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from "react-hook-form";
import {
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import Logo from '../../assets/logo-dark.svg';
import InputPassword from '../../components/InputPassword';
import AccessLink from '../../components/AccessLink';
import ButtonSubmit from '../../components/ButtonSubmit';

import './styles.css';
import '../../styles/form.css';
import useStyles from "../../styles/useStyles";

function Cadastre() {
    const classes = useStyles();
    const history = useHistory();
    const {
        handleSubmit,
        register,
        formState: { isValid }
    } = useForm({ mode: 'onChange' });
    const [loading, setLoading] = useState(false);
    const [reqError, setReqError] = useState("");
    const [reqSuccess, setReqSuccess] = useState("");


    async function Register(formData) {

        try {

            setLoading(true);
            setReqError("");
            setReqSuccess("");

            const response = await fetch('https://desafio04-backend.herokuapp.com/cadastrarUsuario', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok) {
                setReqSuccess(data);
                const timer = setTimeout(() => {
                    history.push('/login');
                    clearTimeout(timer);
                }, 3000);
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
        <div className='container-form-cadastre flex-column'>
            <form className='form' onSubmit={handleSubmit(Register)}>
                <div className='text-center mb-lg'>
                    <img className='logo-form' src={Logo} alt="Logo da Cubos Academy" />
                </div>
                <div className='flex-column  content-center items-center'>
                    <div className='flex-column'>
                        <label htmlFor='nome'>Nome</label>
                        <input
                            id='nome'
                            type="text"
                            {...register('nome', { required: true })}
                        />
                        <label htmlFor='email'>E-mail</label>
                        <input
                            id='email' type="text"
                            placeholder='exemplo@gmail.com'
                            {...register('email', { required: true })}
                        />
                    </div>
                    <InputPassword
                        register={() => register('senha', { required: true })}
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

                    <ButtonSubmit
                        color={isValid && '#DA0175'}
                        label='Criar conta'
                    />
                </div>
            </form>
            <AccessLink text='Já possui uma conta? ' label='Acesse agora' url='/login' />
        </div>
    )
}

export default Cadastre;