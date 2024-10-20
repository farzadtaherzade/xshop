'use client'

import NotFoundComment from "./not-found-comment";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import CommentForm from "./comment-form";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Prisma } from '@prisma/client'
import { Rating } from "react-simple-star-rating";
import { useOptimistic } from "react";
import { SessionType } from "@/lib/definitions";

export type CommentWithUser = Prisma.CommentGetPayload<{
    include: { User: true }
}>

export default function Comments({ comments, productId, session }: { comments: CommentWithUser[], productId: string, session: SessionType }) {
    const [optimisticComments, addOptimisticComments] = useOptimistic(comments,
        (state, newComment: CommentWithUser) => {
            return [...state, newComment]
        }
    )

    return (
        <div className="w-full grid md:grid-cols-12 pt-32 gap-3">
            <div className="md:col-span-8 space-y-8">
                {optimisticComments.length ? optimisticComments.map(c => (
                    <div key={c.id} className="rounded-lg border dark:border-opacity-5 dark:border-neutral-100 px-6 py-8 space-y-5">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-x-4 h-12">
                                <Avatar className="h-full w-12">
                                    <AvatarFallback>
                                        {c.User.username.slice(0, 2)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col items-start justify-between h-full ">
                                    <p className="">{c.User.username.slice(0, 2)}</p>
                                    <span className="text-xs">{c.createdAt.toUTCString()}</span>
                                </div>
                            </div>
                            <Rating
                                readonly={true}
                                emptyStyle={{ display: "flex" }}
                                fillStyle={{ display: "-webkit-inline-box" }}
                                initialValue={c.rate}
                                size={18}
                            />
                        </div>
                        <pre>
                            {c.text}
                        </pre>
                    </div>
                )) : <NotFoundComment />}
            </div>
            <div className="md:col-span-4 h-fit w-full">
                <div className="w-full h-full px-8 py-6 gap-5 flex flex-col rounded-lg border dark:border-opacity-5 dark:border-neutral-100 ">
                    <span className="">Add Comment</span>
                    <p className="text-[15px] text-neutral-400 dark:border-neutral-100">Thank you for your comment. It will be reviewed and, once approved, you will receive an email notification.</p>
                    <Dialog>
                        <DialogTrigger>Open</DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Comment</DialogTitle>
                                <DialogDescription>
                                    <CommentForm productId={productId} addOptimisticComments={addOptimisticComments} session={session} />
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
