import { columns } from "@/app/project/[projectSlug]/extraction/[extractionSlug]/dataTablecolumns"
import { DataTable } from "@/components/ui/dataTable";
import { auth } from "@/lib/auth";
import { Project } from "@/src/class/project";
import { notFound } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/container/Container";
import { Extraction } from "@/src/class/extraction";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
import { it } from "node:test";
import { Transco } from "@/src/class/transco";
export default async function Page({ params }: { params: { projectSlug: string, extractionSlug: string } }) {
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
    const extraction = new Extraction(params.extractionSlug)
    const extractionDetail = await extraction.getExtraction()
    if (!extractionDetail) {
        notFound()
    }
    const { transcoSociety } = await project.getTransco()
    const filesList = await extraction.getFiles()
    const files = filesList.files.map((file) => {
        return {
            projectSlug: params.projectSlug,
            extractionSlug: params.extractionSlug,
            fileLabel: file.fileLabel,
            status: file.status,
            iteratorLabel: file.iteratorLabel,
            projectFileSlug: file.projectFileSlug,
            countValue: filesList.countFiles.count,
            idList: file.iteratorLabel === 'Société' ? transcoSociety.map((society) => { return society.siren }) : []
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
                                <Link href={`/project/${params.projectSlug}/extraction/${params.extractionSlug}`}>{extractionDetail.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={files} inputSearch="siren" inputSearchPlaceholder="Chercher par siren" />
            </ContainerDataTable>

        </Container>
    )

}