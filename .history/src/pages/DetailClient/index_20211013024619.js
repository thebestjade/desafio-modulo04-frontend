/* eslint-disable no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Alert } from "@material-ui/lab";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import './styles.css'


function DetailClient() {
    const history = useHistory();

    return (
        <div className='container-status flex-row'>
            <>
                <div className='container-form flex-column modal-form '>
                    <a className='align-self-end' href='#close'
                        onClick={() => history.goBack()}
                    >x</a>
                    <ul className='list flex-row items-center'>
                        <li>
                            nome {clients.name}
                        </li>
                        <li>
                            cpf {clients.cpf}
                        </li>
                        <li>
                            email {clients.email}
                        </li>
                        <li>
                            telefone {clients.phone}
                        </li>
                        <li>
                            cep {clients.cep}
                        </li>
                        <li>
                            bairro {clients.district}
                        </li>
                        <li>
                            cidade {clients.city}
                        </li>
                        <li>
                            logradouro {clients.public_place}
                        </li>
                        <li>
                            complemento {clients.complement}
                        </li>
                        <li>
                            referencia {clients.reference}
                        </li>
                        <li>
                            uf {clients.uf}
                        </li>
                        <li>
                            {charges.map(({ id, descripition, due_date, value, status }) => (
                                <li>
                                    {id}
                                    {descripition}
                                    {due_date}
                                    {value}
                                    {status}
                                </li>
                            ))}
                        </li>
                    </ul>
                    {reqError && (<Alert severity="error" onClose={closeAlert}>
                        {reqError}
                    </Alert>)}

                </div>
            </>
        </div >
    );
}

export default DetailClient;