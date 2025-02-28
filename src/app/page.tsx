import NotificationSetup from "@/components/NotificationSetup";
import React from "react";
import {NotificationTest} from "@/components/NotificationTest";

function HomePage() {

    return (
        <>
            <h1>yet-another-planner</h1>
            <NotificationSetup/>
            <NotificationTest/>
        </>
    )
}

export default HomePage
