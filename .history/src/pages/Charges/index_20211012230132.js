import React, { useContext, useEffect } from "react";
import ChargesContext from "../../contexts/charge/ChargesContexts";
import TokenContext from "../../contexts/token/TokenContext";
import ButtonProfile from '../../components/ButtonProfile';
import HeaderTable from '../../components/HeaderTable';
import ContainerCharge from '../../components/ContainerCharge';
import SideBar from "../../components/SideBar";

import './styles.css';
import EditUser from "../EditUser";
import ModalContext from "../../contexts/modal/ModalContext";

function Charges() {
 
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

    const { isOpen } = useContext(ModalContext);

    return (
        <div className="container-client flex-row">
            {isOpen && <EditUser />}
            <SideBar />
            <div className=' container-home flex-column overflow-scroll'>
                <ButtonProfile />
                <div className='container-charge '>
                    {charges?.map((charge) => (
                        <>
                            <HeaderTable titles={['ID', 'Cliente', 'Descrição', 'Valor', 'Status', 'Vencimento']} />
                            <ContainerCharge
                                description={charge.description}
                                dueDate={Intl.DateTimeFormat('pt-br', { year: 'numeric', month: 'numeric', day: 'numeric' }).format(new Date(charge.due_date))
                            }
                                id={charge.id}
                                name={charge.name}
                                status={charge.status}
                                value={charge.value}
                            />))
                        </>
                        }
                </div>
            </div>
        </div>
    )
}

export default Charges;