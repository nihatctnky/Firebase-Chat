import { collection, onSnapshot, query, orderBy, where } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { db } from './../firebase';
import Message from "./Message";


const Main = ({ room }) => {

    const [messages, setMessages] = useState([]);
    const lastMessage = useRef();

    // veritabanından gönderilen mesajları al
    useEffect(() => {
        // abone oluncak  kolleksiyonun referansını al
        const messagesCol = collection(db, "messages");

        //   sorgu ayarını yap
        const q = query(
            messagesCol,
            where("room", "==", room),
            orderBy("createdAt", "asc")
        )



        // kolleksiyondaki anlık güncelleemeye abone al
        const unsub = onSnapshot(q, (data) => {

            // mesajların geçici olarak tutulacagı dizi
            const temp = []

            // docs dizisindeki herbir doküman datasına erişip geçici diziye aktar
            data.docs.forEach((doc) => temp.push(doc.data()))

            // state güncelle
            setMessages(temp);

            // kullanıcı bu sayfadan ayrılınca kolleksiyonu izlemee
            return () => unsub();
        })
    }, [])

    // İlk odaya girildiginde hermesaj atıldıgında en aşagıya in
    useEffect(() => {
        lastMessage.current.scrollIntoView();
    }, [messages])

    return (
        <main>
            {messages.length < 1 ? (<div className="warn">
                <p>Sohbete İlk Mesajı Gösterin</p>
            </div>) : (
                messages.map((i, key) => <Message key={key} data={i} />)
            )}

            <div ref={lastMessage} />

        </main>
    )
}

export default Main