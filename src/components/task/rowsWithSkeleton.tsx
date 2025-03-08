import {TableCell, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";
import {ReactNode} from "react";


interface SkeletonRowsProps {
    children: ReactNode,
    loading: boolean,
}

function generateFakeRows(rowAmount: number) {
    return Array.from(Array(rowAmount).keys()).map((_, index) => ({
        key: `key_${index}`,
    }));
}


export function RowsWithSkeleton({children, loading}: SkeletonRowsProps) {
    const rows = generateFakeRows(5);

    return (
        <>
            {loading ? rows.map(row => (
                <TableRow key={row.key}>
                    <TableCell>
                        <Skeleton className="h-4 w-full"/>
                    </TableCell>
                </TableRow>
            )) : children}
        </>
    )
}