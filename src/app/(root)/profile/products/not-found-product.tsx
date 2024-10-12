import Image from 'next/image'
import NotFoundProductVector from "@/assets/9276433-removebg-preview.png"

export default function NotFoundProduct() {
    return (
        <div className='flex flex-col items-center mt-10'>
            <h4 className='text-4xl text-primary'>Sorry No Product Founded!</h4>
            <Image
                src={NotFoundProductVector}
                height={455} // Desired size with correct aspect ratio
                width={455} // Desired size with correct aspect ratio
                alt="not found product"
                className='bg-transparent'
            />
        </div>
    )
}
