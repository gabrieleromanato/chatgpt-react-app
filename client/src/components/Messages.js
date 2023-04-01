import './Messages.css';

export default function Messages({ messages }) {
    return (
        <ol className="messages">
            {messages.map((msg, i) => (
                
                <li key={i} className={`message ${msg.type}`}>
                    {msg.text}
                </li>
            ))}
        </ol>
    )
}