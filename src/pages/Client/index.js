/* eslint-disable react/jsx-no-comment-textnodes */
import './styles.css';
import '../../styles/form.css';
import Logo from '../../assets/logo-white.svg';
import SubmitButton from '../../components/SubmitButton';
import MenuSideBar from '../../components/MenuSideBar';
import ButtonProfile from '../../components/ButtonProfile';

function Client() {
    return (
        <div className="container-client flex-row">
            <div className='side-bar-client' >
                <img className='logo-form pt-md' src={Logo} alt="Logo da Cubos Academy" />
                <MenuSideBar label='HOME' icon='faHome' />
                <MenuSideBar label='CONTRATAÇÕES' />
                <MenuSideBar label='CLIENTES' url='/clientes' />
            </div>
            <div className='container-form-client flex-column'>
                <ButtonProfile />
                <span className='title-form-h5'>// ADICIONAR CLIENTE</span>
                <form className='form width-lg label-form'>
                    <div className='flex-column  content-center items-center'>
                        <div className='flex-column'>
                            <label htmlFor='name'>Nome</label>
                            <input className='input-form width-lg' id='name' type="text" />
                        </div>
                        <div className='flex-column'>
                            <label htmlFor='email'>E-mail</label>
                            <input className='input-form width-lg' id='email' type="text" />
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cpf'>CPF</label>
                                <input className='input-form width-mid' id='cpf' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='phone'>Telefone</label>
                                <input className='input-form width-mid' id='phone' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='cep'>CEP</label>
                                <input className='input-form width-mid' id='cep' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='street'>Logradouro</label>
                                <input className='input-form width-mid' id='street' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >

                            <div className='flex-column'>
                                <label htmlFor='local'>Bairro</label>
                                <input className='input-form width-mid' id='local' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='city'>Cidade</label>
                                <input className='input-form width-mid' id='city' type="text" />
                            </div>
                        </div>
                        <div className='flex-row form-gap' >
                            <div className='flex-column'>
                                <label htmlFor='complete'>Complemento</label>
                                <input className='input-form width-mid' id='complete' type="text" />
                            </div>
                            <div className='flex-column'>
                                <label htmlFor='reference'>Ponto de referência</label>
                                <input className='input-form  width-mid' id='reference' type="text" />
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