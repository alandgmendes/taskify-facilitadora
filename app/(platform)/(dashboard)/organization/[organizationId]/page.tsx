import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { Board } from "./board";
import { Form } from "./form";

const OrganizationIdPage = async() =>{

    const boards = await db.board.findMany();
    await db.$disconnect();
    
    return(
        <div>
            <div className="space-y-2">
                <Form />
                {boards.map((board) =>(
                    <Board key={board.id} id={board.id} title={board.title} />
                ) )}
            </div>
        </div>
    );
};

export default OrganizationIdPage;