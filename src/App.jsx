import { useState } from 'react';
import { Trashcan } from './assets/icons.jsx';
import './App.css';

function App() {
  const [id, setId] = useState(1);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([]);

  const send = () => {
    if (input === "") return;

    setMessage([...message, {
      id: id,
      txt: input,
    }]);

    setId(id + 1);
    setInput("");
  };

  const handelOnKeyDown = (event) => {
    if (event.key === "Enter") send();
  };

  const Message = ({ id, txt }) => {
    const [modal, setModal] = useState(false);

    const DelModal = () => {
      return (
        <>
          <div id='back-drop' onClick={() => setModal(false)} />
          <div id='del-modal'>
            <p> {txt}를 삭제할까요? </p>
            <div>
              <button className='active' onClick={() => del(id) }> 삭제 </button>
              <button className='deactive' onClick={() => setModal(false) }> 취소 </button>
            </div>
          </div>
        </>
      );
    };

    const del = (deleteId) => {
      setMessage(message.filter((item) => item.id !== deleteId));
    };

    return (
      <div id={id} className='message'>
        {modal && <DelModal />}
        <p> {txt} </p>
        <div className='icon' onClick={() => setModal(true)}> <Trashcan /> </div>
      </div>
    );
  };


  return (
    <div id='container'>
      <div id='message-container'>
        {message.map((item) => ( <Message key={item.id} id={item.id} txt={item.txt} /> ))}
      </div>
      <div className='flex'>
        <input
          className='input'
          type='text'
          value={input}
          onChange={(event) => {setInput(event.target.value)}}
          onKeyDown={(event) => handelOnKeyDown(event)}
        />
        <button className='button' onClick={() => send() }> 전송 </button>
      </div>
    </div>
  );
};

export default App;