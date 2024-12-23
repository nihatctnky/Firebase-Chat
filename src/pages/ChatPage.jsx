
import { useState } from 'react';
import { auth, db } from './../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Main from './../components/Main';
import EmojiPicker from 'emoji-picker-react';





const ChatPage = ({ room, setRoom }) => {

    const [text, setText] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    // form gönderilince mesajı veritabanına kaydet
    const handleSubmit = async (e) => {
        e.preventDefault();

        // mesaj boş mu kontrol et
        if (text.trim() === "") return;

        // input temizle ve emoji pivker kapat
        setText("");
        setIsOpen(false);

        // mesajların gönderilecegi kolleksiyona belge oluştur
        const messagesCol = collection(db, "messages");

        // referansı alınan koleksiyon belge oluştur
        await addDoc(messagesCol, {
            text,
            room,
            author: {
                id: auth.currentUser.uid,
                name: auth.currentUser.displayName,
                photo: auth.currentUser.photoURL,
            },
            createdAt: serverTimestamp(),
        })


    }
    return (
        <div className="chat-page">
            <header>
                <p>{auth.currentUser.displayName}</p>
                <p>{room}</p>
                <button onClick={() => setRoom(null)}>Farklı Oda</button>
            </header>

            <Main room={room} />

            <form onSubmit={handleSubmit} className="message-form">
                <input type="text" placeholder="Mesajınızı Yazınız" onChange={(e) => setText(e.target.value)} value={text} />


                <div>
                    <EmojiPicker onEmojiClick={(e) => setText(text + e.emoji)} open={isOpen} />


                    <button className='emoji-btn' type="button" onClick={() => setIsOpen(!isOpen)}>😄</button>
                </div>

                <button type="submit">Gönder</button>
            </form>

        </div>
    )



}


export default ChatPage



