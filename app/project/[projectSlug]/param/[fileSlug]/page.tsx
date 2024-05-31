import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/container/Container";
import { DataTable } from "@/components/ui/dataTable";
import { columns } from "@/app/project/[projectSlug]/param/[fileSlug]/dataTablecolumns";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { auth } from "@/lib/auth";
import { Project } from "@/src/class/project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectFile } from "@/src/class/projectFile";
export default async function Page({ params }: { params: { projectSlug: string, fileSlug: string } }) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error('Vous n\'êtes pas connecté')
    }
    const userId = session.user.id
    const project = new Project(params.projectSlug)
    const projectDetail = await project.project()
    if (!projectDetail) {
        notFound()
    }
    const authorization = await project.userExist(userId)
    if (!authorization) {
        throw new Error('Vous n\'avez pas accès à ce projet')
    }
    const file = new ProjectFile(params.fileSlug)
    const fileDetail = await file.getFileDetail()
    if (!fileDetail) {
        notFound()
    }
    const columnsList = await file.getColumns(projectDetail.id)
    const projectColums = columnsList.map((column) => {
        return {
            fileSlug: params.fileSlug,
            projectSlug: params.projectSlug,
            slug: column.slug,
            columnLabel: column.columnLabel,
            type: column.type,
            standardFieldLabel: column.standardFieldLabel,
            defaultValue: column.defaultValue,
            isRequired: column.isRequired,
            order: column.order
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
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/project/${params.projectSlug}`}>{projectDetail.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/project/${params.projectSlug}/param/${params.fileSlug}/`}>{fileDetail.fileLabel}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={projectColums} inputSearch="columnLabel" inputSearchPlaceholder="Chercher par libellé" />
            </ContainerDataTable>
        </Container>
    )

}