import Image from 'next/image'
import NotFoundProductVector from "@/assets/9276433.jpg"

export default function NotFoundProduct() {
    return (
        <div className='flex flex-col'>
            <Image
                src={NotFoundProductVector}
                height={455} // Desired size with correct aspect ratio
                width={455} // Desired size with correct aspect ratio
                alt="not found product"
            />
        </div>
    )
}
