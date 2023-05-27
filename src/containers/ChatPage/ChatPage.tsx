import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { getApiResource, postApiResource, deleteApiResource } from '../../utils/network';
import { URL } from '../../constants/api';
import styles from './ChatPage.module.css'

interface IMessage {
      date: string,
      message: string,
      setClass: string,
      setClassWrapper: string
};

const ChatPage = () => {
    const location = useLocation();
    const { idInstance, apiTokenInstance, phoneNumber } = location.state;
  
    const SENDMESSAGE = URL+idInstance+'/sendMessage/'+apiTokenInstance;
    const GETNOTIFICATION = URL+idInstance+'/receiveNotification/'+apiTokenInstance;
    const DELETENOTIFICATION = URL+idInstance+'/deleteNotification/'+apiTokenInstance;

    const [message, setMessage] = useState('');
    const [addedMessage, setAddedMessage] = useState<IMessage[]>([]);
    const [receiverName, setReceiverName] = useState(null);

    const classReceiver = styles.receiver;
    const classSender = styles.sender;

    const classReceiverWrapper = styles.wrapper__receiver;
    const classSenderWrapper = styles.wrapper__sender;

    let messageRef = useRef<HTMLInputElement>(null);

    const setText = () => {
        if (messageRef.current) { 
            setMessage(messageRef.current.value)
          } 
    };

    const sendMessage = () => {
        const data = {
          chatId: `${phoneNumber}@c.us`,
	        message: message
        }

        const postResource = async (url: string, data: {}) => { 
            await postApiResource(url, data);

            let dateHours = String(new Date().getHours()).length < 2 ? '0' + new Date().getHours() : new Date().getHours();
            let dateMinutes = String(new Date().getMinutes()).length < 2 ? '0' + new Date().getMinutes() : new Date().getMinutes();

            let date = dateHours +':'+ dateMinutes;

            setAddedMessage((prev) => [...prev,{
              date: date,
              message: message,
              setClass: classSender,
              setClassWrapper: classSenderWrapper
          }]);

          };
        postResource(SENDMESSAGE, data)
        if (messageRef.current) { 
          messageRef.current.value = ''
        }
    };
    
    useEffect(() => {

      (setInterval(() => {
        let id: number;
        
        const getResource = async (url: string) => { 
            const res = await getApiResource(url);
      
            if (res != null) {
            const condition = res.body.typeWebhook === "incomingMessageReceived" && res.body.messageData.typeMessage === 'textMessage' && res.body.senderData.sender === `${phoneNumber}@c.us`;

            if(condition) {
              if (receiverName === null) {
                setReceiverName(res.body.senderData.senderName)
              }
              let text = res.body.messageData.textMessageData.textMessage;

              let dateHours = String(new Date().getHours()).length < 2 ? '0' + new Date().getHours() : new Date().getHours();
              let dateMinutes = String(new Date().getMinutes()).length < 2 ? '0' + new Date().getMinutes() : new Date().getMinutes();

              let date = dateHours +':'+ dateMinutes;
              setAddedMessage((prev) => [...prev,{
                date: date,
                message: text,
                setClass: classReceiver,
                setClassWrapper: classReceiverWrapper
              }])  

              id = res.receiptId;
              const deleteResource = async (url: string, id: number) => { 
              await deleteApiResource(url+`/${id}`);
            };
            deleteResource(DELETENOTIFICATION, id);
            } 
            
            id = res.receiptId;
            const deleteResource = async (url: string, id: number) => { 
              await deleteApiResource(url+`/${id}`);
            };
            deleteResource(DELETENOTIFICATION, id);
          };
        }
        getResource(GETNOTIFICATION)
      }, 5000));
    }, []);

  return (
    <div className={styles.container}>
        <div className={styles.wrapper__header}>{receiverName ? receiverName : `${phoneNumber}@c.us`}</div>
        <div className={styles.wrapper__chat}>
            <ul className={styles.list}>
                {addedMessage && addedMessage.map(({date,message, setClass, setClassWrapper}, id) => {
                  return (
                  <li className={setClass} key={id}>
                        <div className={setClassWrapper}>
                            <p className={styles.message}>{message}</p>
                            <p className={styles.date}>{date}</p>
                        </div>
                    </li>
                  )
                })}
            </ul>
        </div>
        <div className={styles.wrapper__message}>
            <input className={styles.message__input} type="text" ref={messageRef} onInput={setText} /><br/>
            <button className={styles.btn} onClick={() => sendMessage()}>Отправить</button>
        </div>
    </div>
  );
}

export default ChatPage;
