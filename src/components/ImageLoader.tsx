export default function ImageLoader({ isLoading }: { isLoading: boolean }) {
    return (
        <div className={`w-[300px] h-[300px] bg-slate-200 ${isLoading ? "animate-pulse" : ""}`}>

        </div>
    )
}
