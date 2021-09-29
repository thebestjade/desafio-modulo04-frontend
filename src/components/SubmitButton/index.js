import './styles.css'
           
function SubmitButton({ label }) {
    return(
        <div>
            <button className='btn-disabled-primary mt-lg'>{label}</button>
        </div>
    );
}

export default SubmitButton;


