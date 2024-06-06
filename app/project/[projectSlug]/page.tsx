import { Container, ContainerBreadCrumb } from "@/components/container/Container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Dashboard } from "@/components/Dashboard";
import { auth } from "@/lib/auth";
import { Project } from "@/src/class/project";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
export default async function Page({ params }: { params: { projectSlug: string } }) {
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
    const {
        countDsn,
        countNumSS,
        countEstablishment,
        countSociety,
        countTranscoJob,
        countTranscoPerson,
        countTranscoWorkContract,
        countExtraction,
        countPersonBank,
        countWorkContract,
        countTranscoSociety,
        countMutual,
        countChildren
    } = await project.count()
    const projectFile = await project.getFiles()
    const extractions = await project.getExtraction()

    const templates = await prisma.template.findMany({
        orderBy: {
            label: 'asc'
        },
        select: {
            label: true,
            slug: true
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
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <Dashboard
                projectSlug={params.projectSlug}
                count={{
                    countDsn,
                    countNumSS,
                    countEstablishment,
                    countSociety,
                    countTranscoPerson,
                    countTranscoWorkContract,
                    countTranscoJob,
                    countExtraction,
                    countPersonBank,
                    countWorkContract,
                    countTranscoSociety,
                    countMutual,
                    countChildren
                }}
                files={projectFile}
                extrations={extractions}
                templates={templates}
            />
        </Container>
    )

}