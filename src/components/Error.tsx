export default function Error({ error }: { error: string }) {
    return (
        <div className="bg-red-50 rounded p-2 text-red-600 text-sm">{error}</div>
    )
}
