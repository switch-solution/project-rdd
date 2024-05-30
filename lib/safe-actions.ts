import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth"
import { Project } from "@/src/class/project";
export class ActionError extends Error { }

export const action = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }
        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware() {
        const session = await auth()
        if (!session) {
            throw new ActionError("Vous devez être connecté pour effectuer cette action.")
        }
        return { userId: session.user?.id }
    }
});

export const authorizationProject = createSafeActionClient({
    handleReturnedServerError(error) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
        if (error instanceof ActionError) {
            return error.message;
        }
        // Every other error that occurs will be masked with the default message.
        return "Oups! Une erreur est survenue. Veuillez réessayer plus tard.";
    },
    async middleware(values) {
        if (typeof values === 'object' && values !== null && 'projectSlug' in values && typeof (values as any).projectSlug === 'string') {
            const session = await auth()
            if (!session?.user?.id) {
                throw new ActionError("Vous devez être connecté pour effectuer cette action.")
            }
            const project = new Project((values as any).projectSlug)
            const projectDetail = await project.project()
            if (!projectDetail) {
                throw new ActionError("Le projet n'existe pas.")
            }
            const authorization = await project.userExist(session.user.id)
            if (!authorization) {
                throw new ActionError("Vous n'avez pas accès à ce projet.")
            }
            const userId = session.user.id
            return { userId, projectId: projectDetail.id }

        }
        throw new ActionError("Une erreur est survenue.")

    }
});

