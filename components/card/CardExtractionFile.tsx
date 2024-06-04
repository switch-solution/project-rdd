"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ButtonExportXlsx } from "../button/ButtonExportXlsx";

export default function CardExtractionFile({
    fileLabel,
    data
}: {
    fileLabel: string,
    data: { [key: string]: string }[]
}
) {

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>{fileLabel}</CardTitle>
                <CardDescription>Nombre de lignes : {data.length}</CardDescription>
            </CardHeader>
            <CardContent>

                <ButtonExportXlsx
                    fileLabel={fileLabel}
                    data={data} />
            </CardContent>
            <CardFooter className="flex justify-between">

            </CardFooter>
        </Card>

    )
}