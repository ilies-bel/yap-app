"use client"
import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {httpClient} from "@/services/api/apiClient";

export function UserForm() {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        httpClient.post("/users", {name});
    }

    return (
        <form onSubmit={onSubmit}>
            <div className={"flex-col flex space-y-4"}>
                <Label>
                    Username
                </Label>
                <Input name={"name"}/>
            </div>
        </form>
    )
}

