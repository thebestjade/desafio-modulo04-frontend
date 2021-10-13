/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import './styles.css'


function ContainerCharge({ description, dueDate, id, name, status, value }) {

    const stt = 'pendente'
    return (
        <div className='container-charges flex-row'>
            <ul className='list flex-row items-center'>
                <span>{description}</span>
                <span>{dueDate}</span>
                <span>{id}</span>
                <span>{name}</span>
                <span className='status' 
                    style={stt.toUpperCase() === 'PAGO' ? { color: '#4EC06E' } : stt.toUpperCase() === 'PENDENTE' ? { color: '#5197B5' } : { color: '#FF4D4D' }} 
                >
                    {status.toUpperCase()}
                </span>
                <span>{value}</span>
            </ul>
        </div>
    );
}

export default ContainerCharge;