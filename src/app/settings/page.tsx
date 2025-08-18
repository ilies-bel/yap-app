import NotificationSetup from "@/components/NotificationSetup";
import React from "react";
import {NotificationTest} from "@/components/NotificationTest";
import {Separator} from "@/components/ui/separator";
import {UserForm} from "@/app/settings/userForm";
import {DeviceForm} from "@/app/settings/deviceForm";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import Link from "next/link";

function SettingsPage() {
    return (
        <div>
            <div className="mb-6">
                <Link href="/dashboard">
                    <Button variant="ghost" size="sm" className="mb-4">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>
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

