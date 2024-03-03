"use server";
import { InputType, ReturnType } from "./types";
import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db"; 
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-actions";
import { CreateBoard } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { userId, orgId } = auth();
    console.log({
        userId,
        orgId
    })
    if(!userId || !orgId){
        return {
            error: "Unauthorized"
        };
    }

    const { title, image } = data;

    const [
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName
    ] = image.split("|");
    
    if(!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
        return {
            error: "Missing fields. failed to creat board",
        };
    }
    let board;

    try {
        board = await db.board.create({
            data: {
                title,
                imageId,
                orgId,
                imageThumbUrl,
                imageFullUrl,
                imageLinkHTML,
                imageUserName,
            },
        });
    }catch(error){
        console.log(error);
        return {
            error: "Failed to create"
        }
    }

    revalidatePath(`/board/${board.id}`);
    redirect(`/board/${board.id}`);
}

export const createBoard = createSafeAction(CreateBoard, handler);