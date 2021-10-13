/* eslint-disable no-unused-vars */
import './styles.css'


function ContainerCharge({ description, dueDate, id, name, status, value }) {

    return (
        <div className='container-charges flex-row'>
            <ul className='list flex-row items-center'>
                <span>{description}</span>
                <span>{dueDate}</span>
                <span>{id}</span>
                <span>{name}</span>
                <span className='status' style={status.toUpperCase() === 'PAGO' ? { color: '#4EC06E' } : null}
                    style={status.toUpperCase() === 'VENCIDO' ? { color: '#FF4D4D' } : null}
                    style={status.toUpperCase() === 'PENDENTE' ? { color: '#5197B5' } : null}
                >
                    {status.toUpperCase()}
                </span>
                <span>{value}</span>
            </ul>
        </div>
    );
}

export default ContainerCharge;