import icon from './img/whatsapp.png'
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <img className={styles.icon} src={icon} alt='whatsapp-icon'/>
                <h2 className={styles.title}>WHATSAPP WEB</h2>
            </div>
        </div>
    )
};

export default Navbar;