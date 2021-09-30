/* eslint-disable react/jsx-no-comment-textnodes */
import './styles.css';
import '../../styles/form.css';
import Logo from '../../assets/logo-white.svg';
import InputPassword from '../../components/InputPassword';
import SubmitButton from '../../components/SubmitButton';
import MenuSideBar from '../../components/MenuSideBar';


function Client() {
    return (
        <div className="container-client flex-row">
            <div className='side-bar' >
                <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />
                <MenuSideBar label='HOME' icon='faHome' />
                <MenuSideBar label='CONTRATAÇÕES' />
                <MenuSideBar label='CLIENTES' url='/clientes' />
            </div>
            <div className='container-form-client flex-column'>
                <h5>// ADICIONAR CLIENTE</h5>
                <form className='form width-lg label-form'>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='email'>Nome</label>
                            <input className='input-form width-lg' id='email' type="text" />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='email'>E-mail</label>
                            <input className='input-form width-lg' id='email' type="text" />
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='email'>CPF</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='email'>Telefone</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='email'>CEP</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='email'>Logradouro</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >

                            <div className='flex-column'>
                                <label htmlFor='email'>Bairro</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='email'>Cidade</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='email'>Complemento</label>
                                <input className='input-form width-mid' id='email' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='email'>Ponto de referência</label>
                                <input className='input-form  width-mid' id='email' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap ml-auto'>
                            <button className='btn-cancel mt-lg'>Cancelar</button>
                            <SubmitButton label='Adicionar cliente' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Client;