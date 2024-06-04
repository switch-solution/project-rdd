import { auth } from "@/lib/auth";
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
import { prisma } from "@/lib/prisma"
import Link from "next/link";
import ViewColumn from "@/components/form/ViewColumn";
import { Format } from "@/src/class/format";
import { File } from "@/src/class/file";
export default async function Page({ params }: { params: { projectSlug: string, fileSlug: string, columnSlug: string } }) {
    const session = await auth()
    if (!session?.user?.id) {
        throw new Error('Vous n\'êtes pas connecté')
    }
    const userId = session.user.id
    const file = new File(params.fileSlug)
    const fileDetail = await file.getDetail()
    if (!fileDetail) {
        notFound()
    }
    const column = await file.getColumnDetail(params.columnSlug)
    const standardFields = await prisma.standard_Field.findMany()
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
                                <Link href={`/file`}>Fichier</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/file/${params.fileSlug}/columns`}>{fileDetail.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href={`/file/${params.fileSlug}/columns/${params.columnSlug}/edit`}>{column.label}</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </BreadcrumbList>
                </Breadcrumb>
            </ContainerBreadCrumb>
            <ContainerForm title="Edition mapping champ">
                <ViewColumn
                    projectSlug={params.projectSlug}
                    fileSlug={params.fileSlug}
                    columnSlug={params.columnSlug}
                    column={column}
                    standardFields={standardFields}
                    formatList={formatList}

                />
            </ContainerForm>
        </Container>
    )

}