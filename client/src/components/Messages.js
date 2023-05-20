import '../styles/Messages.css';
import ReactMarkdown from 'react-markdown';
import Loader from './Loader';

export default function Messages({ messages, isLoading }) {
    return (
        <ol className="messages">
            {messages.map((msg, i) => (
                
                <li key={i} className={`message ${msg.type}`}>
                    {msg.type === 'chat' ? <ReactMarkdown>{msg.text}</ReactMarkdown> : msg.text}
                </li>
            ))}
            {isLoading && <Loader />}
        </ol>
    )
}