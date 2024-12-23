
import { auth } from './../firebase';
import generateColor from './../utils/generateColor';

const Message = ({ data }) => {
    // eger mesajı oturumu açıkolan kullanıcıatıysa sag
    if (auth.currentUser.uid === data.author.id) {
        return <div className="msg-user">{data.text}</div>
    }


    // Eger mesajı farklı bir kullanıcı attıysa sol
    return (
        <div className="msg-other">

            <img src={data.author.photo} />
            <div>
                <span style={{
                    color: generateColor(data.author.id, data.author.name),
                }}
                >
                    {data.author.name}</span>


                <p className="msg-text">{data.text}</p>
            </div>
        </div>
    )
}

export default Message