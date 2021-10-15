import IconSearch from '../../assets/IconSearch'
import './styles.css'


function InputSearch() {
    return (
        <div>
            <input type="text" />
            <button className='btn-search fllex-row'>
                <div>
                    <IconSearch />
                    BUSCAR
                </div>
            </button>
        </div>
    );
}

export default InputSearch;


