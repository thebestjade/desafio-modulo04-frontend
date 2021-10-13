import { useState } from 'react';
import { useContext } from 'react';


import './styles.css'
import IconLogout from "../../assets/IconLogout";
import IconEdit from "../../assets/IconEdit";
import ModalContext from "../../contexts/modal/ModalContext";


function ButtonProfile( url ) {
    const { isOpen, setIsOpen } = useContext(ModalContext);

    const [isInputVisible, setIsInputVisible] = useState(false);

    function logout() {
        localStorage.clear();
        window.location.href = '/login';
    }

    return (
        <div className='align-self-end'>
            <button
                className='cursor-pointer button-decoration img-profile'
                onClick={isInputVisible ? () => setIsInputVisible(false) : () => setIsInputVisible(true)}
            >
            {isInputVisible &&
                <div className='input-profile-logout'>
                    <button
                        className='flex-row items-center pd-mid button-decoration-none'
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {<IconEdit />}
                        Editar
                    </button>
                    <button
                        onClick={() => logout()}
                        className='flex-row items-center pd-mid button-decoration-none'>
                        {<IconLogout />}
                        Deslogar
                    </button>
                </div>
            }
            </button>
        </div>
    );
}

export default ButtonProfile;