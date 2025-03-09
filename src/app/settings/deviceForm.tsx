"use client"
import {axiosClient} from "@/services/api/axiosInterceptor";
import {Button} from "@/components/ui/button";
import React from "react";

export function DeviceForm() {
    const onSubmit = () => {
        axiosClient.post("/users/current/devices");
    }

    return (
        <Button onClick={onSubmit}>
            Add the current device
        </Button>
    )
}