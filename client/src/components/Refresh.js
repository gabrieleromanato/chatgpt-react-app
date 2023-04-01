import './Refresh.css';

export default function Refresh({ refreshChat }) {
    return (
        <div className="refresh">
            <button type="button" className="btn btn-secondary" onClick={refreshChat}>
                New Chat
            </button>
        </div>
    )
}