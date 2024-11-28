import React from 'react';
import styles from '../../assets/css/Sections/chatSection.module.css';
import { CancelButton } from '../components/BackButton.jsx';
import { useLocation } from 'react-router-dom';

export const ChatSection = () => {
    const location = useLocation();
    const from = location.state?.from || 'menu';

    return (
        <>
            <div className={styles.outerContainer}>
                <div className={styles.chatContainer}>
                    <h2 className={styles.chatTitle}>Asistente Inteligente</h2>
                    <div className={styles.chatInputContainer}>
                        <input
                            type="text"
                            className={styles.chatInput}
<<<<<<< HEAD
                            placeholder={(
                                <>
                                    Envía un mensaje al chat Inteligente <i className="fa-solid fa-comments"></i>
                                </>
                            )}
=======
                            placeholder="Envía un mensaje al Asistente Inteligente"
>>>>>>> 93d783d198526e1462366d5fb6561e0ab8c7f59d
                        />
                        <button className={styles.chatSendButton}>
                            <i className="fa-solid fa-paper-plane"></i>
                        </button>
                    </div>
                    <div className={styles.chatResponse}>
                       
                    </div>
                    <div className={styles.backButtonContainer}>
                        <CancelButton from={from} />
                    </div>
                </div>
            </div>
        </>
    );
};