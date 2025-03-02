export function TaskDialogItem({children}: { children: React.ReactNode }) {
    return (
        <div className={"flex flex-row space-x-4 py-2"}>
            {children}
        </div>
    )
}