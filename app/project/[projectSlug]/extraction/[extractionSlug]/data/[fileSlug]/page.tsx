import CardExtractionFile from "@/components/card/CardExtractionFile";
import { auth } from "@/lib/auth";
import { Project } from "@/src/class/project";
import { notFound } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerDataTable, ContainerForm } from "@/components/container/Container";
import { Extraction } from "@/src/class/extraction";
import { Data } from "@/src/class/data";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";
export default async function Page({ params }: { params: { projectSlug: string, extractionSlug: string, fileSlug: string } }) {
    console.log('params', params)
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

    const file = await extraction.getFile(params.fileSlug)
    if (!file) {
        notFound()
    }
    const data = await new Data(
        projectDetail.id,
        file.fileLabel,
        extractionDetail.label
    ).getDatas()



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
                <CardExtractionFile
                    fileLabel={file.fileLabel}
                    data={data}
                />
            </ContainerDataTable>

        </Container>
    )

}