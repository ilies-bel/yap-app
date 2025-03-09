import NotificationSetup from "@/components/NotificationSetup";
import React from "react";
import {NotificationTest} from "@/components/NotificationTest";
import {Separator} from "@/components/ui/separator";
import {UserForm} from "@/app/settings/userForm";
import {DeviceForm} from "@/app/settings/deviceForm";

function SettingsPage() {
    return (
        <div>
            <section className={"grid gap-2 grid-cols-2 pb-4"}>
                <header>
                    <h1>Name</h1>
                </header>
                <article className={"bg-gray-900 p-4"}>
                    <UserForm/>
                </article>

            </section>

            <section className={"grid gap-2 grid-cols-2 pb-4"}>
                <header>
                    <h1>Devices</h1>
                </header>
                <article className={"bg-gray-900 p-4"}>
                    <DeviceForm/>
                </article>
            </section>

            <section className={"grid gap-2 grid-cols-2 pb-4"}>
                <header>
                    <h1>Contexts</h1>
                </header>
                <article>
                    Choose
                </article>

            </section>
            <Separator></Separator>
            <div>
                <h1>Notifications</h1>
                <NotificationSetup/>
                <NotificationTest/>
            </div>
        </div>

    )
}

export default SettingsPage

