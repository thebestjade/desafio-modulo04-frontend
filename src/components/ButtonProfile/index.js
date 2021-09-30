import { useState } from 'react';
import ModalForm from '../ModalForm';

import './styles.css'

function ButtonProfile() {
    const [isModalVisible, setisModalVisible] = useState(false);
    const [isInputVisible, setisInputVisible] = useState(false);


    return (
        <div className='align-self-end'>
            <button
                className='cursor-pointer button-decoration img-profile'
                onClick={ () => setisInputVisible(true)}
            >
            </button>
            {isInputVisible && 
                <div className='input-profile-logout'>
                    <button 
                    className='pd-mid button-decoration-none'
                    onClick={ () => setisModalVisible(true)}
                    >
                        Icon Editar
                    </button>
                    {isModalVisible && <ModalForm />}
                    <button className='pd-mid button-decoration-none'>
                        Icon Deslogar
                    </button>
                </div>}
        </div>
    );
}

export default ButtonProfile;