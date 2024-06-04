import { auth } from "@/lib/auth";
import { Project } from "@/src/class/project";
import { notFound } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerForm } from "@/components/container/Container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { ProjectFile } from "@/src/class/projectFile";
import { ProjectColumn } from "@/src/class/projectColumn";
import EditProjectColumn from "@/components/form/EditProjectColumn";
import { Format } from "@/src/class/format";
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
    const column = new ProjectColumn(params.columnSlug)
    const columnDetail = await column.getColumnDetail()
    const standardFields = await file.getStandardFields()
    const format = new Format()
    const formatList = await format.getFormat()
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
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/project/${params.projectSlug}/param/${params.fileSlug}/column/${params.columnSlug}/edit`}>{columnDetail.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm title="Edition mapping champ">
                <EditProjectColumn
                    projectSlug={params.projectSlug}
                    fileSlug={params.fileSlug}
                    columnSlug={params.columnSlug}
                    column={columnDetail}
                    standardFields={standardFields}
                    formatList={formatList}

                />
            </ContainerForm>
        </Container>
    )

}