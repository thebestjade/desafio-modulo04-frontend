/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import './styles.css'


function ContainerCharge({ description, dueDate, id, name, status, value }) {

    return (
        <div className='container-charges flex-row'>
            <ul className='list flex-row items-center'>
                <span>#{id}</span>
                <span>{name}</span>
                <span>{description}</span>
                <span>{value}</span>
                <span className='status'
                    style={status.toUpperCase() === 'PAGO' ? { color: '#4EC06E' } : status.toUpperCase() === 'PENDENTE' ? { color: '#5197B5' } : { color: '#FF4D4D' }}
                >
                    {status.toUpperCase()}
                </span>
                <span>{dueDate}</span>
            </ul>
        </div>
    );
}

export default ContainerCharge;