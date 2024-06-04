"use client";
import Link from "next/link"
import {
    ArrowRight,
    Upload,
    File,
    ListFilter,

} from "lucide-react"
import { Badge } from "@/components/ui/badge"
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

export function Dashboard({ projectSlug, count, files, extrations }: {
    projectSlug: string, count: {
        countDsn: number,
        countNumSS: number,
        countEstablishment: number,
        countSociety: number,
        countTranscoPerson: number,
        countTranscoWorkContract: number,
        countTranscoJob: number,
        countExtraction: number,
        countPersonBank: number,
        countWorkContract: number,
        countTranscoSociety: number,

    },
    files: {
        projectId: string,
        fileLabel: string,
        softwareLabel: string,
        fileFormat: string,
        separator: string,
        iteratorLabel: string,
        history: boolean,
        slug: string
    }[],
    extrations: {
        label: string,
        description: string | null,
        status: string,
        slug: string,
        createdAt: Date
    }[]

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
                            <CardDescription>Extraction</CardDescription>
                            <CardTitle>{count.countExtraction}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Link href={`/project/${projectSlug}/extraction/create`}><Button>Créer une nouvelle extraction.</Button></Link>
                        </CardContent>
                    </Card>
                </div>
                <Tabs defaultValue="import">
                    <div className="flex items-center">
                        <TabsList>
                            <TabsTrigger value="import">Import</TabsTrigger>
                            <TabsTrigger value="transco">Transcodication</TabsTrigger>
                            <TabsTrigger value="extraction">Extraction</TabsTrigger>
                            <TabsTrigger value="param" className="hidden sm:flex">Paramétrage</TabsTrigger>
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
                                                <Link href={`/project/${projectSlug}/upload/dsn`}> <Upload /></Link>
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
                                                <Link href={`/project/${projectSlug}/upload/bank`}><Upload /></Link>
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
                                                <Badge variant='secondary'>Facultatif</Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className="text-xs" variant="secondary">
                                                    {count.countTranscoWorkContract}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="sm:table-cell">
                                                <Link href={`/project/${projectSlug}/transco/workcontract`}> <ArrowRight /></Link>
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
                    <TabsContent value="extraction">
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>Extraction</CardTitle>
                                <CardDescription>
                                    Run de migration
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Libellé</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Description
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Status
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Date de création
                                            </TableHead>
                                            <TableHead className="sm:table-cell">
                                                Ouvrir
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {extrations.map(extraction => {
                                            return (
                                                <TableRow key={extraction.slug}>
                                                    <TableCell>
                                                        <div className="font-medium">{extraction.label}</div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {extraction.description}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant="secondary">
                                                            {extraction.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {extraction.createdAt.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell className="sm:table-cell">
                                                        <Link href={`/project/${projectSlug}/extraction/${extraction.slug}`}> <ArrowRight /></Link>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        }

                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="param">
                        <Card x-chunk="dashboard-05-chunk-3">
                            <CardHeader className="px-7">
                                <CardTitle>Paramétrage</CardTitle>
                                <CardDescription>
                                    Détail du paramétrage des fichiers.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fichier</TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Format
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Itération
                                            </TableHead>
                                            <TableHead className="hidden sm:table-cell">
                                                Historique
                                            </TableHead>
                                            <TableHead className="sm:table-cell">
                                                Ouvrir
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {files.map(file => {
                                            return (
                                                <TableRow key={file.fileLabel}>
                                                    <TableCell>
                                                        <div className="font-medium">{file.fileLabel}</div>
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {file.fileFormat}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        {file.iteratorLabel}
                                                    </TableCell>
                                                    <TableCell className="hidden sm:table-cell">
                                                        <Badge className="text-xs" variant={file.history ? "default" : "secondary"}>
                                                            {file.history ? 'Historique' : 'Pas d\'historique'}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="sm:table-cell">
                                                        <Link href={`/project/${projectSlug}/param/${file.slug}`}> <ArrowRight /></Link>
                                                    </TableCell>
                                                </TableRow>

                                            )
                                        })}

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
                        </ul>
                        <Separator className="my-2" />
                        <div className="font-semibold">Volume.</div>

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
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nombre unique de numéro de contrat de travail</span>
                                <span>{count.countWorkContract}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nombre de RIB salariés</span>
                                <span>{count.countPersonBank}</span>
                            </li>
                        </ul>
                        <Separator className="my-2" />
                        <div className="font-semibold">Transcodification.</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Transco sociétés</span>
                                <span>{count.countTranscoSociety}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Transco matricule</span>
                                <span>{count.countTranscoPerson}</span>
                            </li>
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Transco contrat de de travail</span>
                                <span>{count.countTranscoWorkContract}</span>
                            </li>
                        </ul>

                        <Separator className="my-2" />
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span className="text-muted-foreground">Nombre de run de migration</span>
                                <span>{count.countExtraction}</span>
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
