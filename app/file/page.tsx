import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerDataTable, ContainerForm } from "@/components/container/Container";
import { prisma } from "@/lib/prisma"
import { columns } from "@/app/file/dataTablecolumns"
import { DataTable } from "@/components/ui/dataTable";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default async function Page() {
    const session = await auth()
    if (!session) {
        redirect("/api/auth/signin")
    }
    if (!session.user?.id) {
        throw new Error("Vous êtes déjà connecté")
    }
    const files = await prisma.file.findMany({
        orderBy: {
            softwareLabel: 'asc'
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
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerDataTable>
                <DataTable columns={columns} data={files} inputSearch="softwareLabel" inputSearchPlaceholder="Chercher par logiciel" href={`/file/create`} buttonLabel="Créer un nouveau fichier" />
            </ContainerDataTable>
        </Container>
    );
}
