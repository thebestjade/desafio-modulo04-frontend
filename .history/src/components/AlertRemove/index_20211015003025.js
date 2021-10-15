import './styles.css'

function AlertRemove( handleOpenAlert ) {

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
                    onClick={() => handleOpenAlert(false)}
                    style={{ backgroundColor: '#FF576B' }}
                >
                    Não
                </button>
            </div>
        </div>
    );
}

export default AlertRemove;