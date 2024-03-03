"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { UpdateBoard } from "./schema";
import { createSafeAction } from "@/lib/create-safe-actions";

const handler = async(data: InputType): Promise<ReturnType> =>{
    const { userId, orgId} = auth();

    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        }
    }

    const { title, id } = data;
    let board;

    try {
        board = await db.board.update({
            where: { 
                id, 
                orgId,
            },
            data: {
                title,
            }
        })
    }catch(error){
        return {
            error: "failed to update"
        }
    }

    revalidatePath(`/noard/${id}`);

    return{
        data: board,
    }
}

export const updateBoard = createSafeAction(UpdateBoard, handler);