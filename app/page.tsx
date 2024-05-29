import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container, ContainerBreadCrumb, ContainerDataTable, ContainerForm } from "@/components/container/Container";
import { prisma } from "@/lib/prisma"
import { columns } from "./dataTablecolumns"
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
  const userId = session.user.id
  const userProject = await prisma.user_Project.findMany({
    where: {
      userId
    },
    include: {
      Project: true
    }

  })
  const projects = userProject.map((project) => {
    return {
      label: project.Project.label,
      slug: project.Project.slug,
      description: project.Project.description,
    }
  })
  if (projects.length === 0) {
    redirect("/project/create")
  }
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
        <DataTable columns={columns} data={projects} inputSearch="label" inputSearchPlaceholder="Chercher par libellé" href={`/project/create`} buttonLabel="Créer un nouveau projet" />
      </ContainerDataTable>
    </Container>
  );
}
