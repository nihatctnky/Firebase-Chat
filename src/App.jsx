import { useEffect, useState } from "react"
import LoginPage from "./pages/LoginPage"
import RoomPage from "./pages/RoomPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import ChatPage from "./pages/ChatPage";



const App = () => {

  const [isAuth, setIsAuth] = useState(false);

  // Hangi odaya girdigi state 
  const [room, setRoom] = useState(null)

  // Sayfa yenilendiginde kullanıcı bilgilerini getirir

  useEffect(() => {
    // oturum açık olan kullanıcı bilgilerini getirir
    onAuthStateChanged(auth, (user) => {
      setIsAuth(user ? true : false);
    })
  }, [])


  //  yetkisi yoksa login pageekrana bas
  if (!isAuth) return <LoginPage />

  // yetkisi varsa oda seçme sayfasını ekrana bas
  return (
    <div className="container">
      {room ? <ChatPage room={room} setRoom={setRoom} /> : <RoomPage setRoom={setRoom} />
      }
    </div>
  )
}

export default App