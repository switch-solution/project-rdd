"use client";
import { useState } from "react";
import Image from "next/image"
import Link from "next/link"
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Copy,
    CreditCard,
    File,
    Home,
    LineChart,
    ListFilter,
    MoreVertical,
    Package,
    Package2,
    PanelLeft,
    Search,
    Settings,
    ShoppingCart,
    Truck,
    Users2,
} from "lucide-react"
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"
import { Import } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export function Dashboard({ projectSlug, count }: {
    projectSlug: string, count: {
        countDsn: number,
        countNumSS: number,
        countEstablishment: number,
        countSociety: number,
        countTranscoPerson: number,
        countTranscoWorkContract: number,
        countTranscoJob: number

    }
}) {

    return (

        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                    <Card
                        className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
                    >
                        <CardHeader className="pb-3">
                            <CardTitle>Editer le projet</CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                                Editer les informations du projet
                            </CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Button>Editer</Button>
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-05-chunk-1">
                        <CardHeader className="pb-2">
                            <CardDescription>Utillisateurs</CardDescription>
                            <CardTitle className="text-4xl">1</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +25% from last week
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={25} aria-label="25% increase" />
                        </CardFooter>
                    </Card>
                    <Card x-chunk="dashboard-05-chunk-2">
                        <CardHeader className="pb-2">
                            <CardDescription>Avancement</CardDescription>
                            <CardTitle className="text-4xl">5</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground">
                                +10% from last month
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Progress value={50} aria-label="50% increase" />
                        </CardFooter>
                    </Card>
                </div>
                <Tabs defaultValue="import">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="import">Import</TabsTrigger>
                            <TabsTrigger value="transco">Transcodication</TabsTrigger>
                            <TabsTrigger value="extraction">Extraction</TabsTrigger>
                        </TabsList>
                        <div className="ml-auto flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-7 gap-1 text-sm"
                                    >
                                        <ListFilter className="h-3.5 w-3.5" />
                                        <span className="sr-only sm:not-sr-only">Filter</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuCheckboxItem checked>
                                        Fulfilled
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Declined
                                    </DropdownMenuCheckboxItem>
                                    <DropdownMenuCheckboxItem>
                                        Refunded
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                size="sm"
                                variant="outline"
                                className="h-7 gap-1 text-sm"
                            >
                                <File className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only">Export</span>
                            </Button>
                        </div>
                    </div>
                    <TabsContent value="import">
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>Fichiers</CardTitle>
                                <CardDescription>
                                    Fichier à importer
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fichier</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Type
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Status
                                            </TableHead>
                                            <TableHead className="sm:table-cell">
                                                Importer
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Déclaration Sociale Nominative</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                DSN
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    En attente
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/upload/dsn`}> <Import /></Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Banque</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                DSN
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    En attente
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/upload/bank`}><Import /></Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="transco">
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>Transcodification</CardTitle>
                                <CardDescription>
                                    Liste des tables de transcodification
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Libellé</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Status
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Nombre d&apos;enregistrements
                                            </TableHead>
                                            <TableHead className="sm:table-cell">
                                                Ouvrir
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Société</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge>Obligatoire</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    {count.countSociety}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/society`}> <ArrowRight /></Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Etablissement</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge>Obligatoire</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    {count.countEstablishment}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/establishment`}> <ArrowRight /></Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Matricule salarié</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge>Obligatoire</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    {count.countTranscoPerson}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/person`}> <ArrowRight /></Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Contrat de travail</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge>Obligatoire</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    {count.countTranscoWorkContract}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/workcontrat`}> <ArrowRight /></Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Absence</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge>Obligatoire</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    0
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/absence`}> <ArrowRight /></Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>
                                                <div className="font-medium">Rubrique de paie</div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge>Obligatoire</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    0
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/payrool`}> <ArrowRight /></Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
            <Card
                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
                <CardHeader className="flex flex-row items-start bg-muted/50">
                    <div className="grid gap-0.5">
                        <CardTitle className="group flex items-center gap-2 text-lg">
                            Statistique du projet.
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-6 text-sm">
                    <div className="grid gap-3">
                        <div className="font-semibold">Détail intégration.</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Fichier DSN
                                </span>
                                <span>{count.countDsn}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Fichier banque
                                </span>
                                <span>0</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">
                                    Fichier classification
                                </span>
                                <span>0</span>
                            </li>
                        </ul>
                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nombre unique de numéro de SIREN</span>
                                <span>{count.countSociety}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nombre unique de numéro de NIC</span>
                                <span>{count.countEstablishment}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nombre unique de numéro de Sécurité Sociale</span>
                                <span>{count.countNumSS}</span>
                            </li>
                        </ul>
                    </div>

                </CardContent>
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    <div className="text-xs text-muted-foreground">
                        Mise à jour <time dateTime={new Date().toLocaleDateString()}>{new Date().toLocaleDateString()}</time>
                    </div>
                </CardFooter>
            </Card>

        </div>
    )
}
