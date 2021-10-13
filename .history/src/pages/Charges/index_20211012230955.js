import React, { useContext, useEffect } from "react";
import { Alert } from '@material-ui/lab';
import ChargesContext from "../../contexts/charge/ChargesContexts";
import TokenContext from "../../contexts/token/TokenContext";
import ButtonProfile from '../../components/ButtonProfile';
import HeaderTable from '../../components/HeaderTable';
import ContainerCharge from '../../components/ContainerCharge';
import SideBar from "../../components/SideBar";

import './styles.css';
import EditUser from "../EditUser";
import ModalContext from "../../contexts/modal/ModalContext";
import { useState } from "react";

function Charges() {

    const { charges, setCharges } = useContext(ChargesContext);
    const { token } = useContext(TokenContext);
    const [reqError, setReqError] = useState("");
    const { isOpen } = useContext(ModalContext);


    useEffect(() => {
        async function getCharges() {
            setReqError('');

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

            setReqError(data);

        }
        getCharges();

    }, [token, setCharges]);

    const closeAlert = () => {
        setReqError("");
    };

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
                            />
                        </>
                    ))}
                </div>
                <div className='flex-row items-center'>
                    {reqError && (<Alert severity="error" onClose={closeAlert}>
                        {reqError}
                    </Alert>)}
                </div>
            </div>
        </div>
        
    )
}

export default Charges;