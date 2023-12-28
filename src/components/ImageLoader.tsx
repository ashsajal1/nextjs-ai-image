export default function ImageLoader({ isLoading }: { isLoading: boolean }) {
    return (
        <div className={`sm:w-[300px] sm:h-[300px] w-[166px] h-[166px] bg-slate-200 ${isLoading ? "animate-pulse" : ""}`}>

        </div>
    )
}
