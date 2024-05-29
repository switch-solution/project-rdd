import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container, ContainerForm } from "@/components/container/Container";
import CreateProject from "@/components/form/CreateProject";
import { prisma } from "@/lib/prisma";
export default async function Page() {
    const session = await auth()
    if (!session) {
        redirect("/api/auth/signin")
    }
    if (!session.user?.id) {
        throw new Error("Vous êtes déjà connecté")
    }
    const softwares = await prisma.software.findMany()
    return (
        <Container>
            <ContainerForm title="Créer un nouveau projet">
                <CreateProject softwares={softwares} />
            </ContainerForm>
        </Container>
    );
}
