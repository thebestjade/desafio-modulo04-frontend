import './styles.css'
           
function SubmitButton({ label }) {
    return(
        <div>
            <button className='btn-dark-blue mt-lg'>{label}</button>
        </div>
    );
}

export default SubmitButton;


