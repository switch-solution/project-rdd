"use client";
import { useState } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { createProject } from "@/src/actions/project/project.actions"
import { ProjectCreateSchema } from "@/src/defintion";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
export default function CreateProject({ softwares }: { softwares: { label: string }[] }) {
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof ProjectCreateSchema>>({
        resolver: zodResolver(ProjectCreateSchema),
        defaultValues: {
            label: "",
            description: "",
            softwareLabel: ""
        },
    })

    const onSubmit = async (data: z.infer<typeof ProjectCreateSchema>) => {
        try {
            setLoading(true)
            const action = await createProject(data)
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
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nom de votre projet</FormLabel>
                            <FormControl>
                                <Input placeholder="Mon nouveau projet" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description de votre projet</FormLabel>
                            <FormControl>
                                <Input placeholder="Mon nouveau projet" required {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>

                    )}

                />
                <FormField
                    control={form.control}
                    name="softwareLabel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Logiciel</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selectionner un logiciel" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {softwares.map((item) => (<SelectItem key={item.label} value={item.label}>{item.label}</SelectItem>))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" disabled={loading}>Envoyer</Button>

            </form>
        </Form>

    )
}