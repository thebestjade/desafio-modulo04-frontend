/* eslint-disable react/jsx-no-comment-textnodes */
import './styles.css';
import InputPassword from '../../components/InputPassword';
import SubmitButton from '../../components/SubmitButton';

function ModalForm() {
    return (
        <div className='container-form flex-column modal-form'>
            <form className='form'>
                <a className='align-self-end' href='#close'>x</a>
                <div className='text-center mb-lg'>
                    <h4>// EDITAR USUÁRIO</h4>
                </div>
                <div className='flex-column  content-center items-center'>
                    <div className='flex-column'>
                        <label htmlFor='name'>Nome</label>
                        <input id='name' type="text"/>
                    </div>
                    <div className='flex-column'>
                        <label htmlFor='email'>E-mail</label>
                        <input id='email' type="text" placeholder='exemplo@gmail.com' />
                    </div>
                    <InputPassword />
                    <div className='flex-column'>
                        <label htmlFor='phone'>Telefone</label>
                        <input id='phone' type="text"/>
                    </div>
                    <div className='flex-column'>
                        <label htmlFor='cpf'>CPF</label>
                        <input id='cpf' type="text" />
                    </div>
                    <SubmitButton label='Editar conta' />
                </div>
            </form>
        </div>
    )
}

export default ModalForm;