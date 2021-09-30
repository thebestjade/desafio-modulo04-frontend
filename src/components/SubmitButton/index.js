import './styles.css'
           
function SubmitButton({ label }) {
    return(
        <div>
            <button className='btn-disabled-primary mt-lg width-mid'>{label}</button>
        </div>
    );
}

export default SubmitButton;


