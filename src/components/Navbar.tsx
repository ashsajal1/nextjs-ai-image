import Link from 'next/link'
import React from 'react'
import NavButton from './NavButton'
import { GitHubLogoIcon, RocketIcon } from '@radix-ui/react-icons'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-between p-4 bg-gradient-to-br from-green-600 to-blue-600 h-[60px]'>
            <div className='xs:font-sm sm:font-bold text-slate-50'>AI Image Generator</div>
            <div className='flex items-center gap-2 text-sm'>
                <a href="https://github.com/ashsajal1/nextjs-ai-image" title="Source code" target='_blink'>
                    <NavButton label='Source Code'>
                        <GitHubLogoIcon />
                    </NavButton>
                </a>

                <Link href={'/ashsajal'}>
                    <NavButton hasBorder={false} label='About dev'>
                        <RocketIcon />
                    </NavButton>
                </Link>
            </div>
        </nav>
    )
}
