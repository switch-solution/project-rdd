import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerDataTable, ContainerForm } from "@/components/container/Container";
import { columns } from "@/app/file/[fileSlug]/columns/dataTablecolumns"
import { DataTable } from "@/components/ui/dataTable";
import Link from "next/link";
import { File } from "@/src/class/file";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page({ params }: { params: { fileSlug: string } }) {
    const session = await auth()
    if (!session) {
        redirect("/api/auth/signin")
    }
    if (!session.user?.id) {
        throw new Error("Vous êtes déjà connecté")
    }
    const file = new File(params.fileSlug)
    const fileDetail = await file.getDetail()
    const columnsDatas = await file.getColumns()
    const columnsList = columnsDatas.map((column) => {
        return {
            fileSlug: params.fileSlug,
            slug: column.slug,
            softwareLabel: column.softwareLabel,
            description: column.description,
            label: column.label,
            type: column.type,
        }
    })
    console.log(columnsList)
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
                <DataTable columns={columns} data={columnsList} inputSearch="sofwtareLabel" inputSearchPlaceholder="Chercher par libellé" href={`/file/create`} buttonLabel="Créer une nouvelle colonne" />
            </ContainerDataTable>
        </Container>
    );
}
