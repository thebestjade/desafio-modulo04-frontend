import './styles.css';
import '../../styles/form.css';
import Logo from '../../assets/logo.svg';
import InputPassword from '../../components/InputPassword';
import AccessLink from '../../components/AccessLink';
import SubmitButton from '../../components/SubmitButton';

function Cadastre() {
     return(
        <div className='container-form-cadastre flex-column'>
            <form className='form'>
                <div className='text-center mb-lg'>
                    <img className='logo-form' src={Logo} alt="Logo da Cubos Academy" />
                </div>
                <div className='flex-column  content-center items-center'>
                    <div className='flex-column'>
                        <label htmlFor='nome'>Nome</label>
                        <input id='name' type="text"/>
                        <label htmlFor='email'>E-mail</label>
                        <input id='email' type="text" placeholder='exemplo@gmail.com' />
                    </div>
                    <InputPassword />
                    <SubmitButton label='Criar conta'/>
                </div>
            </form>
            <AccessLink text='Já possui uma conta? ' label='Acesse agora' url='/login' />
        </div> 
    )
}

export default Cadastre;