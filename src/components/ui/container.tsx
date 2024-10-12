import React, { PropsWithChildren } from 'react'

export default function Container({ children }: PropsWithChildren) {
    return (
        <div className='lg:container lg:mx-auto -full xl:max-w-screen-xl px-4'>
            {children}
        </div>
    )
}
