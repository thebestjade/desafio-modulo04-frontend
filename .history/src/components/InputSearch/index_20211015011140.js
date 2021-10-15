import IconSearch from '../../assets/IconSearch'
import './styles.css'


function InputSearch() {
    return (
        <div>
            <input type="text" />
            <button>
                <IconSearch />
                <h5>BUSCAR</h5>
            </button>
        </div>
    );
}

export default InputSearch;


