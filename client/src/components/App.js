import { useState, useEffect } from 'react';
import '../styles/App.css';
import Login from './Login';
import FormMessage from './FormMessage';
import Messages from './Messages';
import Refresh from './Refresh';
import { sendQuestion } from '../api';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addChatMessage = text => {
      setIsLoading(true);
      sendQuestion(text).then(resp => {
          if(resp.response) {
             setMessages(previous => {
                return [...previous, { text: resp.response, type: 'chat' }];
             });
          } else {
             setMessages(previous => {
                return [...previous, { text: 'Oops, something went wrong!', type: 'error' }];
             }); 
          }
          setIsLoading(false);
      }).catch(err => console.log(err));
  };



  const addUserMessage = (evt = null, text = '') => {
     if(evt) {
         evt.preventDefault();
     } 
     setMessages(previous => {
        return [...previous, { text, type: 'user' }];
     });
     addChatMessage(text);
  };

  const refreshChat = () => {
      setMessages([]);
      localStorage.removeItem('token');
      window.location = window.location.href;
  };


  useEffect(() => {
     document.title = 'ChatGPT App'; 
     setLoggedIn(localStorage.getItem('token') !== null);
     setIsLoading(false);
     setMessages([]);
  }, []);


  return (
    <main className="app">
        {!loggedIn && <Login setLoggedIn={setLoggedIn} /> } 
        {loggedIn && 
        <div className="chat-wrap">
          <Messages messages={messages} isLoading={isLoading} />
          <FormMessage addUserMessage={addUserMessage} />
          <Refresh refreshChat={refreshChat} />
        </div>  } 
    </main>
  );
}
