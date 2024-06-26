import { Trash2 } from 'lucide-react'

export function DeleteButton(onClick) {
    return (
        <button onClick={onClick}>
        <Trash2 size={16} />
    </button>
    )
}