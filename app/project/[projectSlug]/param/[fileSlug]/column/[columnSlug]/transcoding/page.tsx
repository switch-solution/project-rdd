import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/container/Container";
import { DataTable } from "@/components/ui/dataTable";
import { columns } from "@/app/project/[projectSlug]/param/[fileSlug]/column/[columnSlug]/transcoding/dataTablecolumns";
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
import { ProjectColumn } from "@/src/class/projectColumn";
export default async function Page({ params }: { params: { projectSlug: string, fileSlug: string, columnSlug: string } }) {
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
    const projectColumn = new ProjectColumn(params.columnSlug)
    const transcodingList = await projectColumn.getTranscoding()
    const transcoding = transcodingList.map((transcoding) => {
        return {
            projectSlug: params.projectSlug,
            columnSlug: params.columnSlug,
            sourceValue: transcoding.sourceValue,
            targetValue: transcoding.targetValue
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
                <DataTable columns={columns} data={transcoding} inputSearch="sourceValue" inputSearchPlaceholder="Chercher par valeur source" href={`/project/${params.projectSlug}/param/${params.fileSlug}/column/${params.columnSlug}/transcoding/create`} buttonLabel="Créer une nouvelle transcodification" />
            </ContainerDataTable>
        </Container>
    )

}