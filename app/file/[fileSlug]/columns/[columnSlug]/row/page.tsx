import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerDataTable, ContainerForm } from "@/components/container/Container";
import { columns } from "@/app/file/[fileSlug]/columns/[columnSlug]/row/dataTablecolumns"
import { DataTable } from "@/components/ui/dataTable";
import Link from "next/link";
import { File } from "@/src/class/file";
import { Column } from "@/src/class/column";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { fileSlug: string, columnSlug: string } }) {
    const session = await auth()
    if (!session) {
        redirect("/api/auth/signin")
    }
    if (!session.user?.id) {
        throw new Error("Vous êtes déjà connecté")
    }
    const file = new File(params.fileSlug)
    const fileDetail = await file.getDetail()
    if (!fileDetail) {
        notFound()
    }
    const column = new Column(params.columnSlug)
    const rowsList = await column.getRow()
    const rows = rowsList.map((row) => {
        return {
            slug: row.slug,
            value: row.value,
            order: row.order,
        }
    })
    return (
        <Container>
            <ContainerBreadCrumb>
                <Breadcrumb className="flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Accueil</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/file/`}>Fichiers</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/file/${params.fileSlug}/columns`}>{fileDetail?.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={rows} inputSearch="sofwtareLabel" inputSearchPlaceholder="Chercher par libellé" href={`/file/create`} buttonLabel="Créer une nouvelle colonne" />
            </ContainerDataTable>
        </Container>
    );
}
