import IconSearch from '../../assets/IconSearch'
import './styles.css'


function InputSearch() {
    return (
        <div>
            <input type="text" />
            <button className='btn-search fllex-row'>
                <div>
                    <IconSearch />
                    <h5>BUSCAR</h5>
                </div>
            </button>
        </div>
    );
}

export default InputSearch;


