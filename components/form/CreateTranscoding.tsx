"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createTranscoding } from "@/src/actions/projectTranscoding/projectTranscoding.actions";
import { TranscodingCreateSchema } from "@/src/defintion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function CreateTranscoding({ projectSlug, fileSlug, columnSlug }: { projectSlug: string, fileSlug: string, columnSlug: string }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof TranscodingCreateSchema>>({
        resolver: zodResolver(TranscodingCreateSchema),
        defaultValues: {
            projectSlug: projectSlug,
            fileSlug: fileSlug,
            columnSlug: columnSlug,
            sourceValue: "",
            targetValue: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof TranscodingCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createTranscoding(data)
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
                    name="sourceValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valeur source</FormLabel>
                            <FormControl>
                                <Input required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="targetValue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Valeur de destination</FormLabel>
                            <FormControl>
                                <Input required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <Button type="submit" disabled={loading}>Envoyer</Button>

            </form>
        </Form>

    )
}