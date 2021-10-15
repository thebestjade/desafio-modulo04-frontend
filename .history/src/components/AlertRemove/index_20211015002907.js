import { useHistory } from 'react-router';
import './styles.css'

function AlertRemove( handleOpenAlert ) {
    const history = useHistory();

    return (
        <div className='modal-remove'>
            <span>Apagar item?</span>
            <div className='flex-row'>
                <button
                    style={{ backgroundColor: '#3A9FF1' }}
                >
                    Sim
                </button>
                <button
                    onClick={handleOpenAlert}
                    style={{ backgroundColor: '#FF576B' }}
                >
                    Não
                </button>
            </div>
        </div>
    );
}

export default AlertRemove;