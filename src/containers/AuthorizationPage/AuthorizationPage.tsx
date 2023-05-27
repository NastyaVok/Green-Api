import { useState, useRef } from 'react';
import { URL } from '../../constants/api';
import { getApiResource } from '../../utils/network';

import PhoneNumber from '../../components/PhoneNumber/PhoneNumber';

import styles from './AutorizationPage.module.css';

const AuthoriazationPage = () => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const [login, setLogin] = useState(false);

  let idInstanceRef = useRef<HTMLInputElement>(null);
  let apiTokenInstanceRef = useRef<HTMLInputElement>(null);

  const setInput = () => {
    if (idInstanceRef.current) { 
      setIdInstance(idInstanceRef.current.value)
    }
    if (apiTokenInstanceRef.current) { 
      setApiTokenInstance(apiTokenInstanceRef.current.value)
    }
  };
  
  const signIn = () => {
    const AUTHORIZED = URL+idInstance+'/getStateInstance/'+apiTokenInstance;

    const getResource = async (url: string) => { 
      const res = await getApiResource(url);
      if (res.stateInstance === 'authorized') {
        setLogin(true);
      } else {
        setLogin(false);
        if (idInstanceRef.current) { 
          setIdInstance(idInstanceRef.current.value='')
        }
        if (apiTokenInstanceRef.current) { 
          setApiTokenInstance(apiTokenInstanceRef.current.value='')
        }
      }
    };

    getResource(AUTHORIZED)
  }

  return (
    <div className={styles.container}>
        {login 
          ? 
          <PhoneNumber idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
          : 
          <div className={styles.wrapper}>
            <input className={styles.idInstance__input} type="text" ref={idInstanceRef} onInput={setInput} placeholder='Id Instance'/><br/>
            <input className={styles.ApiTokenInstance__input} type="te t"ref={apiTokenInstanceRef} onInput={setInput} placeholder='Api Token Instance'/><br/>
            <button className={styles.btn} onClick={signIn}>Войти</button>
          </div>
        }
    </div>
  );
}

export default AuthoriazationPage;