"use server";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { CreateList } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    
    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        };
    }

    const { title, boardId } = data;

    
    let list;

    try {

        const board = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        });

        if(!board) {
            return {
                error: "Board not found!",
            };
        }

        const LastList = await db.list.findFirst({
            where: { boardId : boardId},
            orderBy: { order: "desc"},
            select: {order: true}
        });

        const newOrder = LastList ? LastList.order + 1 : 1

        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder,
            },
        });
    }catch(error){
        console.log(error);
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${boardId}`);
    return {
        data: list
    }
}

export const createList = createSafeAction(CreateList, handler);