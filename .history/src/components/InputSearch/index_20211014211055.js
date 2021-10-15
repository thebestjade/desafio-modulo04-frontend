import './styles.css'

function InputSearch() {
    return (
        <div>
            <button
                type="submit"
                className='btn-disabled-primary mt-lg width-mid'
                style={{backgroundColor: color}}
                >
                {label}
            </button>
        </div>
    );
}

export default InputSearch;


