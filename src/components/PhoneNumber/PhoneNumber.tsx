import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import styles from './PhoneNumber.module.css';

const PhoneNumber = ({idInstance, apiTokenInstance}: {apiTokenInstance: string, idInstance: string}) => {
    const [phoneNumber, setphoneNumber] = useState('');
    let phoneNumberRef = useRef<HTMLInputElement>(null);

    const setPhone = () => {
        if (phoneNumberRef.current) { 
          setphoneNumber(phoneNumberRef.current.value)
        }
      };

  return (
    <div className={styles.wrapper}>
        <input className={styles.phone__input} type="text" ref={phoneNumberRef} onInput={setPhone} placeholder='Enter recipient number starting with 7*********'/>
        <Link to="/chat" state={{ idInstance: idInstance, apiTokenInstance: apiTokenInstance, phoneNumber: phoneNumber }}>
            <button className={styles.btn}>Создать чат</button>
        </Link>
    </div> 
  );
}

export default PhoneNumber;