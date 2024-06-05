import { columns } from "@/app/project/[projectSlug]/transco/person/dataTablecolumns"
import { DataTable } from "@/components/ui/dataTable";
import { Container, ContainerBreadCrumb, ContainerDataTable } from "@/components/container/Container";
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
import CreateTransco from "@/components/button/CreateTransco";
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
    const transcoPersonList = await project.getTranscoPerson()
    const transcoPerson = transcoPersonList.map((transco) => {
        return {
            projectSlug: params.projectSlug,
            slug: transco.slug,
            firstname: transco.firstname,
            lastname: transco.lastname,
            numSS: transco.numSS,
            siret: transco.siret,
            newId: transco.transcoEmployeeNewId,
            oldId: transco.oldId
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
                                <Link href={`/project/${params.projectSlug}/transco/person`}>Transodification des matricules</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <CreateTransco projectSlug={params.projectSlug} type="person" buttonLabel="Générer transco matricule" />
                <DataTable columns={columns} data={transcoPerson} inputSearch="numSS" inputSearchPlaceholder="Chercher par numéro de sécurité sociale" />
            </ContainerDataTable>
        </Container>
    )

}