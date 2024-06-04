import { ThemeToggle } from "@/src/theme/ThemeToggle";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link";
import { SignOut } from "@/components/auth/SignOut";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
    Home,
    LineChart,
    File,
    Building2,
    Users2,
    PanelLeft,
    MessageCircle,
    Pencil,
    Workflow,
    Check,
    User,
    Package
} from "lucide-react"
import { auth } from "@/lib/auth";
import { redirect } from 'next/navigation';

export default async function NavBar() {
    const session = await auth()
    if (!session) {
        redirect("/api/auth/signin")
    }


    return (
        <>
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <TooltipProvider>
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Home className="size-5" />
                                    <span className="sr-only">Accueil</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Accueil</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/template"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <Package className="size-5" />
                                    <span className="sr-only">Template</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Template</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/file"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <File className="size-5" />
                                    <span className="sr-only">Fichier</span>
                                </Link>
                            </TooltipTrigger>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/user"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <User className="size-5" />
                                    <span className="sr-only">Utilisateur</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Utilisateur</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    scroll={false}
                                    href="/feedback"
                                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:size-8"
                                >
                                    <MessageCircle className="size-5" />
                                    <span className="sr-only">Demande amélioration</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Demande amélioration</TooltipContent>
                        </Tooltip>
                    </nav>
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span>
                                        <ThemeToggle />
                                        <span className="sr-only">Thême</span>
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="right">Thême</TooltipContent>
                            </Tooltip>

                        </Tooltip>
                        <SignOut />

                    </nav>
                </TooltipProvider>
            </aside>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                        <PanelLeft className="size-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="sm:max-w-xs">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="/home"
                            className="group flex size-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                        >
                            <Home className="size-5 transition-all group-hover:scale-110" />
                            <span className="sr-only">Accueil</span>
                        </Link>
                        <Link
                            href={`/client/administration`}
                            className="flex items-center gap-4 px-2.5 text-foreground"
                        >
                            <Building2 className="size-5" />
                            Client
                        </Link>
                        <Link
                            href="/profile/"
                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                        >
                            <LineChart className="size-5" />
                            Profil
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
        </>
    )

}

