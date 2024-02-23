"use client";
import { cn} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import React from "react";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "primary";
};

export const FormSubmit = ({
    children,
    disabled,
    className,
    variant
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            className={cn(className)}
            size="sm"
        >
            {children}
        </Button>
    )
}