"use client";
import { Input } from '@/components/ui/input';
import { HTMLAttributes } from 'react';
import { useFormStatus } from 'react-dom';
interface FormInputProps extends HTMLAttributes<HTMLDivElement>  {
    errors?: {
        title?: string[];
    }
}
export const FormInput =({ errors }: FormInputProps)=>{
    const { pending } = useFormStatus();
    return (
        <div>
            <Input
                    id="title"
                    name="title"
                    required
                    placeholder="Enter board title"
                    disabled={pending}
                />
                {errors?.title ? (
                    <div>
                        {errors.title.map((error: string) => {
                            return (<p key={error} className="text-rose-500">
                                {error}
                            </p>);
                        })}
                    </div>
                ) : null}
        </div>
        
    )
}