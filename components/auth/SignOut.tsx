import { signOut } from "@/lib/auth"
import { LogOutIcon } from "lucide-react"
export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await signOut()
            }}
        >
            <button type="submit"><LogOutIcon /></button>
        </form>
    )
}