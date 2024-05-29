import { createSafeActionClient } from "next-safe-action";
import { auth } from "@/lib/auth"

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
