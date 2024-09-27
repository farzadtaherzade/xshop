'use client'

import { cn } from '@/lib/utils'
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

interface ImagesCarouselType {
    mainImage: string,
    images: string[],
    alt: string
}

export default function ImagesCarousel({ mainImage, images, alt }: ImagesCarouselType) {
    const [currentImage, setCurrentImage] = useState<string>(mainImage)

    return (
        <div className='w-full h-full flex flex-col-reverse gap-y-6 sm:grid sm:grid-cols-[150px_1fr] sm:gap-x-4'>
            <div className='w-full h-full grid grid-rows-1 grid-cols-3 gap-x-2 sm:grid-rows-2 sm:grid-cols-1'>
                {images.map((image, i) => (
                    <div className='relative w-full h-[150px] rounded-md cursor-pointer' key={i} onClick={() => {
                        setCurrentImage(image)
                    }}>
                        <img src={image} alt="dsdsa" className={cn(
                            'w-full h-full rounded-md object-cover duration-400',
                            {
                                " border-2 border-primary": currentImage == image
                            }
                        )} />
                    </div>
                ))}
            </div>
            <div className='relative w-full h-[55vh]'>
                <img src={currentImage} alt={alt} className="h-full w-full rounded-lg object-cover" />
            </div>
        </div>
    )
}
