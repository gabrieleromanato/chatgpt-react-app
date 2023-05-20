import '../styles/Refresh.css';
import PlusIcon from './ui/PlusIcon';

export default function Refresh({ refreshChat }) {
    return (
        <div className="refresh">
            <button type="button" onClick={refreshChat}>
                <PlusIcon /> New chat
            </button>
        </div>
    )
}