/* eslint-disable no-unused-vars */
import IconMenssage from '../../assets/IconMessage';
import IconPhone from '../../assets/IconPhone';
import './styles.css'


function ContainerCharge({description, dueDate, id, name, status, value}) {

    return (
        <div className='container-charges flex-row'>
            <ul className='list flex-row items-center'>
                    <span>{description}</span>
                    <span>{dueDate}</span>
                    <span>{id}</span>
                    <span>{name}</span>
                    <span>{status}</span>
                    <span>{value}</span>
            </ul>
        </div>
    );
}

export default ContainerCharge;