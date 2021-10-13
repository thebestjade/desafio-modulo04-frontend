import React, { useContext, useEffect } from "react";
import { useLocation } from 'react-router';
import { useHistory } from "react-router-dom";

import './styles.css';
import ChargesContext from "../../contexts/charges/ChargesContexts";
import TokenContext from "../../contexts/token/TokenContext";

import Logo from '../../assets/logo-white.svg';
import MenuSideBar from '../../components/MenuSideBar';
import ButtonProfile from '../../components/ButtonProfile';
import IconHome from "../../assets/IconHome";
import IconMoney from "../../assets/IconMoney";
import IconUser from "../../assets/IconUser";
import HeaderTable from '../../components/HeaderTable';
import ContainerCharge from '../../components/ContainerCharge';
import SideBar from "../../components/SideBar";

function Charges() {
    const location = useLocation();
    const history = useHistory();

    
    const { charges, setCharges } = useContext(ChargesContext);
    const { token } = useContext(TokenContext);

   
    useEffect(() => {
        async function getCharges() {

            const response = await fetch('https://desafio04-backend.herokuapp.com/cobrancas', {
                headers: {
                    "Content-type": "application/json",
                    mode: 'cors',
                    Authorization: token,
                },
            });

            const data = await response.json();

            if (response.ok) {
                return setCharges(data);
            }

        }
        getCharges();

    }, [token, setCharges]);

    return (
        <div className="container-client flex-row">
            <SideBar />
            <div className=' container-home flex-column overflow-scroll'>
                <ButtonProfile />

                <div className='container-charge '>
                    <HeaderTable titles={['ID', 'Cliente', 'Descrição', 'Valor', 'Status', 'Vencimento']} />
                    {charges.map((charge) => (
                        <ContainerCharge
                            description={charge.description}
                            dueDate={Intl.DateTimeFormat('pt-br', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(charge.due_date))
                        }
                            id={charge.id}
                            name={charge.name}
                            status={charge.status}
                            value={charge.value}
                        />))}
                </div>
            </div>
        </div>
    )
}

export default Charges;