"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export const DeleteFormButton = () => {

    const { pending } = useFormStatus();
    return(
        <Button disabled={pending} type="submit" variant="destructive" size="sm" > 
            Delete
        </Button>
    );
}