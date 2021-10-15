import IconSearch from '../../assets/IconSearch'
import './styles.css'


function InputSearch() {
    return (
        <div className='search flex-row'>
            <input 
                placeholder='Procurar por nome, e-mail ou CPF'
                id='search-input' 
                className='input-search'
            />
            <button className='btn-search'>
                <IconSearch />
                <span>
                    BUSCAR
                </span>
            </button>
        </div>
    );
}

export default InputSearch;


