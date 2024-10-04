/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { createProduct } from "@/actions/product"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { UploadIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"


const formSchema = z.object({
    title: z.string().min(2).max(50),
    description: z.string().min(20).max(300),
    price: z.number(),
    published: z.boolean().default(false),
    slug: z.string().toLowerCase().regex(/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/),
    images: z.custom<File[]>(),
})

export default function ProductForm() {
    const { toast } = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            slug: "",
            published: true,
            images: []
        },
    })
    const [multipleImages, setMultipleImages] = useState<string[]>([]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // toast({
        //     title: 'forms',
        //     description: `
        //     <pre>
        //         ${JSON.stringify(values)}
        //     </pre>
        //     `
        // })
        // console.log(values.images)
        const formData = new FormData()

        for (const key of Object.keys(multipleImages)) {
            formData.append('files', values.images[Number(key)])
        }

        const { error, message, product } = await createProduct(
            values.title,
            values.description,
            values.published,
            values.slug,
            values.price,
            formData
        )
        if (error) {
            console.log(error)
            toast({
                variant: "destructive",
                title: error,
            })
        } else {

            toast({
                title: message,
                description: String(product),
            })
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" >
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description <span className={cn(
                                    "visible text-green-500 text-xs",
                                    {
                                        "text-destructive": field.value.length > 300,
                                    },
                                    {
                                        "hidden": field.value.length == 0

                                    }
                                )}>{field.value.length}</span>
                            </FormLabel>
                            <FormControl>
                                <Textarea placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Slug</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} onChange={(e) => {
                                    field.onChange(e.target.value.replace(" ", "-"))
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} onChange={(e) => {
                                    field.onChange(Number(e.target.value))
                                }} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-5 min-h-[9rem] gap-2">
                    <FormField
                        control={form.control}
                        name="images"
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                                <FormLabel htmlFor="images-input">
                                    <div className="flex justify-center items-center text-center bg-gray-500 w-full h-full rounded-xl hover:bg-opacity-55 bg-opacity-35 duration-150">
                                        <span className="flex gap-x-1 items-center">
                                            <UploadIcon />
                                            Upload
                                        </span>
                                    </div>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...fieldProps}
                                        type="file"
                                        placeholder="Images"
                                        multiple
                                        onChange={(e) => {
                                            if (e.target.files && multipleImages.length < 3) {
                                                const newFiles = Array.from(e.target.files);

                                                const imageArray = newFiles.map((file) =>
                                                    URL.createObjectURL(file)
                                                );
                                                setMultipleImages((prevImages) => prevImages.concat(imageArray));

                                                const existingFiles = form.getValues("images") || [];
                                                const updatedFiles = [...existingFiles, ...newFiles].slice(0, 3); // Limit to 3 files
                                                onChange(updatedFiles)
                                                console.log(form.getValues('images'))
                                            }
                                        }} className="hidden" id="images-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {
                        multipleImages.map((image, index) => (
                            <div className="w-full h-[9rem] relative" key={image}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="absolute -top-2 -right-2 w-6 h-6"
                                    onClick={() => {
                                        setMultipleImages(multipleImages.filter((img) => img !== image))
                                        const updatedFiles = form.getValues("images")?.filter((_, i) => i !== index);
                                        form.setValue("images", updatedFiles);

                                        // Revoke the object URL to free up memory
                                        URL.revokeObjectURL(image);
                                    }}
                                >
                                    <XIcon className="w-4 h-4" />
                                </Button>
                                <img className="w-full h-full rounded-xl" src={image} />
                            </div>
                        ))
                    }
                </div>
                <Button variant="secondary" size="lg" type="submit">Create Product</Button>
            </form>
        </Form>
    )
}
