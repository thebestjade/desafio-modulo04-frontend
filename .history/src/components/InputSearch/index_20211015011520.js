import IconSearch from '../../assets/IconSearch'
import './styles.css'


function InputSearch() {
    return (
        <div>
            <input type="text" />
            <button className='btn-search'>
                <IconSearch />
            </button>
        </div>
    );
}

export default InputSearch;


