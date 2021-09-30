import './styles.css'
           
function ContainerHome({ label }) {
    return(
        <div className='flex-column'>
            <div className='container-header'>
                <h5>{label}</h5>
            </div>
            <div className='body container-body'>

            </div>
        </div>
    );
}

export default ContainerHome;