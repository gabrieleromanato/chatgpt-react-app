import './FormMessage.css';
import { useRef } from 'react';

export default function FormMessage({ addUserMessage }) {
    const msgRef = useRef('');

    return (
        <form className="form-message mt-auto" onSubmit={(e) => addUserMessage(e, msgRef.current.value)}>
            <div className="form-group mb-4">
                <textarea className="form-control" ref={msgRef}></textarea>
            </div>
            <div>
                <button type="submit" className="btn btn-primary btn-block w-100">
                    Send
                </button>
            </div>
        </form>
    );
}