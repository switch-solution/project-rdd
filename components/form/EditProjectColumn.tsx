"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { editProjectColumn } from "@/src/actions/projectColumn/projectColumn.actions";
import { ProjectColumnEditSchema } from "@/src/defintion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import Link from "next/link";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function EditProjectColumn({ projectSlug, fileSlug, columnSlug, column, standardFields, formatList }: {
    projectSlug: string, fileSlug: string, columnSlug: string
    column: {
        label: string,
        type: string,
        format: string | null,
        standardFieldLabel: string | null,
        defaultValue?: string | null,
        isRequired: boolean,
        order: number,
        min: number | null,
        max: number | null,
        minLength: number | null,
        maxLength: number | null,
        typeValue: string,
    },
    standardFields: {
        fieldLabel: string,
        typeValue: 'Champ standard' | 'Méthode' | 'Valeur par default' | string,
    }[],
    formatList: {
        type: string,
        format: string,
    }[]
}) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ProjectColumnEditSchema>>({
        resolver: zodResolver(ProjectColumnEditSchema),
        defaultValues: {
            projectSlug,
            fileSlug,
            columnSlug,
            format: column.format ? column.format : undefined,
            label: column.label,
            type: column.type as 'string' | 'integer' | 'float' | 'date',
            standardFieldLabel: column.standardFieldLabel ? column.standardFieldLabel : undefined,
            defaultValue: column.defaultValue ? column.defaultValue : undefined,
            isRequired: column.isRequired,
            order: column.order,
            min: column.min ? column.min : undefined,
            max: column.max ? column.max : undefined,
            minLength: column.minLength ? column.minLength : undefined,
            maxLength: column.maxLength ? column.maxLength : undefined,
            typeValue: column.typeValue as 'Champ standard' | 'Méthode' | 'Valeur par default',

        },
    })

    const onSubmit = async (data: z.infer<typeof ProjectColumnEditSchema>) => {
        try {
            setLoading(true)
            const action = await editProjectColumn(data)
            if (action?.serverError) {
                setLoading(false)
                toast(`${action.serverError}`, {
                    description: new Date().toLocaleDateString(),
                    action: {
                        label: "fermer",
                        onClick: () => console.log("fermeture"),
                    },
                })
            }

            setLoading(false)

        } catch (err) {
            setLoading(false)
            console.error(err)

        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="projectSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="fileSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="columnSlug"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type='hidden' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Libellé de la colonne</FormLabel>
                            <FormControl>
                                <Input placeholder="Matricule" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Position dans le fichier</FormLabel>
                            <FormControl>
                                <Input type='number' required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}
                />
                <FormField
                    control={form.control}
                    name="typeValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Méthode d&apos;alimentation</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner un type de champ" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Champ standard">Champ standard</SelectItem>
                                    <SelectItem value="Méthode">Méthode</SelectItem>
                                    <SelectItem value="Valeur par default">Valeur par default</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.getValues('typeValue') === 'Valeur par default' &&
                    <FormField
                        control={form.control}
                        name="defaultValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Valeur par default</FormLabel>
                                <FormControl>
                                    <Input type='text' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>

                        )}
                    />
                }
                {form.getValues('typeValue') === 'Champ standard' &&
                    <FormField
                        control={form.control}
                        name="standardFieldLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Associer un champ standard</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un champ standard" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {standardFields.filter(standard => standard.typeValue === 'Champ standard').map(field => {
                                            return <SelectItem key={field.fieldLabel} value={field.fieldLabel}>{field.fieldLabel}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }
                {form.getValues('typeValue') === 'Méthode' &&
                    <FormField
                        control={form.control}
                        name="standardFieldLabel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Associer un champ standard</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selectionner un champ standard" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {standardFields.filter(standard => standard.typeValue === 'Méthode').map(field => {
                                            return <SelectItem key={field.fieldLabel} value={field.fieldLabel}>{field.fieldLabel}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                }

                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner un type de champ" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="string">Texte</SelectItem>
                                    <SelectItem value="integer">Entier</SelectItem>
                                    <SelectItem value="float">Décimale</SelectItem>
                                    <SelectItem value="date">Date</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="format"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Format</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner un type de champ" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {formatList.filter(type => type.type === form.getValues("type")).map(format => {
                                        return <SelectItem key={format.format} value={format.format}>{format.format}</SelectItem>
                                    })}

                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {form.getValues('type') === 'integer' || form.getValues('type') === 'float' &&
                    <>
                        <FormField
                            control={form.control}
                            name="min"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valeur minimum</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valeur maximum</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                    </>
                }
                {form.getValues('type') === 'string' &&
                    <>
                        <FormField
                            control={form.control}
                            name="minLength"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre minimum de caractère</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="maxLength"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre maximum de caractère</FormLabel>
                                    <FormControl>
                                        <Input type='number' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                    </>

                }


                <Button type="submit" disabled={loading}>Envoyer</Button>

            </form>
        </Form>

    )
}