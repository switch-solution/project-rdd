"use client";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ProjectColumnEditSchema } from "@/src/defintion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
export default function ViewColumn({ projectSlug, fileSlug, columnSlug, column, standardFields, formatList }: {
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
        field: string,
        typeValue: 'Champ standard' | 'Méthode' | 'Valeur par default' | string,
    }[],
    formatList: {
        type: string,
        format: string,
    }[]
}) {
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

    return (
        <div>
            <Form {...form}>
                <form className="space-y-8">
                    <FormField
                        control={form.control}
                        name="projectSlug"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input type='hidden' required {...field} readOnly />
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
                                    <Input type='hidden' required {...field} readOnly />
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
                                    <Input type='hidden' required {...field} readOnly />
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
                                    <Input placeholder="Matricule" required {...field} readOnly />
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
                                    <Input type='number' required {...field} readOnly />
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
                                <FormLabel>Type de valeur</FormLabel>
                                <FormControl>
                                    <Input type='text' required {...field} readOnly />
                                </FormControl>
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
                                        <Input type='text' {...field} readOnly />
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
                                    <FormLabel>Champ standard</FormLabel>
                                    <FormControl>
                                        <Input type='text' required {...field} readOnly />
                                    </FormControl>
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
                                    <FormLabel>Champ standard</FormLabel>
                                    <FormControl>
                                        <Input type='text' required {...field} readOnly />
                                    </FormControl>
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
                                <FormControl>
                                    <Input type='text' required {...field} readOnly />
                                </FormControl>
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
                                <FormControl>
                                    <Input type='text' required {...field} readOnly />
                                </FormControl>
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
                                            <Input type='number' {...field} readOnly />
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
                                            <Input type='number' {...field} readOnly />
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
                                            <Input type='number' {...field} readOnly />
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
                                            <Input type='number' {...field} readOnly />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>

                                )}
                            />
                        </>

                    }



                </form>
            </Form>

        </div>

    )
}