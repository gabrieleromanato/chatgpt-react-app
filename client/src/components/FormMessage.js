import '../styles/FormMessage.css';
import { useRef } from 'react';
import SendMessageIcon from './ui/SendMessageIcon';

export default function FormMessage({ addUserMessage }) {
    const msgRef = useRef('');
    const handleSubmitByKey = evt => {
        const code = evt.code;
        if(code === 'Enter') {
            evt.preventDefault();
            return addUserMessage(null, msgRef.current.value);
        }
    };

    return (
        <form className="form-message mt-auto" onSubmit={(e) => addUserMessage(e, msgRef.current.value)}>
            <div className="form-group">
                <textarea onKeyDown={(e) => handleSubmitByKey(e)} placeholder="Send a message." className="form-control" ref={msgRef}></textarea>
                <button type="submit">
                    <SendMessageIcon />
                </button>
            </div>
        </form>
    );
}