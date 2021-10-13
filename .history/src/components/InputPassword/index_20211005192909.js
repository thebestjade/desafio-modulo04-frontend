import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './styles.css'

function InputPassword({ register }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='flex-column input-password'>
            <label htmlFor='senha'>Senha</label>
            <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                {...register()}
            />
            <FontAwesomeIcon
                className='icons-disabled eye-password'
                size='lg'
                icon={showPassword ? faEye : faEyeSlash}
                onClick={() => setShowPassword(!showPassword)}
            />
        </div>
    );
}

export default InputPassword;