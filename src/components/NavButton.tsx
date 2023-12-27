import React from 'react'

export default function NavButton({ children, label, hasBorder=true }: { children: React.ReactNode, label:string, hasBorder?:boolean }) {
    return (
        <div className={`flex gap-2 items-center text-slate-50 hover:text-green-100 ${hasBorder? "border-r pr-2":""}`}>
            {children}
            <span>{label}</span>
        </div>
    )
}
