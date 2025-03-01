import {DialogContent, DialogFooter} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {CommandShortcut} from "@/components/ui/command";
import {Separator} from "@/components/ui/separator";
import {Label} from "../ui/label";
import {DifficultySlider} from "@/components/task/difficultySlider";
import {ProjectSelect} from "@/components/task/projectSelect";

export function TaskDialogContent() {
    return (
        <DialogContent className="sm:max-w-[425px]">
            <Input
                id="name"
                placeholder="What needs to be done?"
                className={"border-0 focus-visible:border-0 focus-visible:ring-0"}
            />
            <Separator/>
            <div className="grid gap-4 p-2">
                <div className={"flex flex-row space-x-4"}>
                    <ProjectSelect/>
                </div>

                <div className={"flex flex-row space-x-4"}>
                    <Label>Difficulty</Label>
                    <DifficultySlider className={"w-full"}/>
                </div>
            </div>
            <DialogFooter>
                <Button type="submit">Save changes <CommandShortcut>⌘ + ⏎</CommandShortcut></Button>
            </DialogFooter>
        </DialogContent>
    )
}


