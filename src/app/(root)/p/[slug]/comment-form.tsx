"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Rating } from 'react-simple-star-rating'
import { Textarea } from "@/components/ui/textarea"
import { createComment } from "@/actions/comment"
import { Input } from "@/components/ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog"
import { CommentWithUser } from "./comments"
import { useId } from "react"
import { SessionType } from "@/lib/definitions"


const schema = z.object({
    text: z.string().min(10, {
        message: "Text must be at least 10 characters.",
    }),
    rate: z.number().int()
})

export default function CommentForm({ productId, addOptimisticComments, session }: { productId: string, session: SessionType, addOptimisticComments: (comment: CommentWithUser) => void }) {
    const id = useId()
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            text: "",
            rate: 1
        },
    })

    async function onSubmit(data: z.infer<typeof schema>) {
        const formData = new FormData()
        addOptimisticComments({
            text: data.text,
            approved: true,
            rate: data.rate,
            productId,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: Number(id),
            User: {
                avatar: "",
                id: session?.userId as string,
                createdAt: new Date(),
                updatedAt: new Date(),
                username: session?.username ?? "",
                email: session?.email ?? "",
                password: "",
                isAdmin: session?.isAdmin ?? false
            },
            userId: session?.userId ?? ""
        })
        formData.append("text", data.text)
        formData.append("rate", String(data.rate))
        formData.append("productId", productId)
        createComment(formData)
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">created</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6 py-5">
                <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Textarea {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rate"
                    render={({ field }) => (
                        <FormItem >
                            <Input type="hidden" className="overflow-hidden hidden" name="rate" value={field.value} />
                            <FormControl>
                                <Rating
                                    onClick={(value: number, index: number) => {
                                        field.onChange(value)
                                        console.log(index)
                                    }}
                                    emptyStyle={{ display: "flex" }}
                                    fillStyle={{ display: "-webkit-inline-box" }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Input type="hidden" className="overflow-hidden hidden" name="productId" value={productId} />

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button disabled={form.formState.isSubmitting} type="submit">Submit</Button>
                    </DialogClose>
                </DialogFooter>
            </form>
        </Form>
    )
}
