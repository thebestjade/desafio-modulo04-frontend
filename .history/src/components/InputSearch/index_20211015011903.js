import IconSearch from '../../assets/IconSearch'
import './styles.css'


function InputSearch() {
    return (
        <div>
            <input type="text" />
            <button className='btn-search fllex-row items-center'>
                <IconSearch />
                BUSCAR
            </button>
        </div>
    );
}

export default InputSearch;


