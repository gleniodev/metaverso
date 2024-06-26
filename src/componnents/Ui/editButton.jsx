import { PencilLine } from 'lucide-react'

export function EditButton(onClick) {
    return (
        <button onClick={onClick}>
        <PencilLine size={16} />
    </button>
    )
}