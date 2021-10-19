import './styles.css'

function AlertRemove({ closeAlert, deleteCharge }) {

    return (
        <div className='modal-remove'>
            <span>Apagar item?</span>
            <div className='flex-row'>
                <button
                    type="button"
                    onClick={deleteCharge}
                    style={{ backgroundColor: '#3A9FF1' }}
                >
                    Sim
                </button>
                <button
                    type="button"
                    onClick={closeAlert}
                    style={{ backgroundColor: '#FF576B' }}
                >
                    Não
                </button>
            </div>
        </div>
    );
}

export default AlertRemove;