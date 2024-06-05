import { prisma } from "@/lib/prisma"
import type { FormatDate, ExtractionData, Column } from "@/src/class/transform/iTransform";
import { Society, Person, WorkContract } from "@/src/class/transform/iTransform";
export class Transform {

    projectId: string;
    extractionLabel: string;
    userId: string;
    fileLabel: string;
    numSS?: string;
    contractId?: string;
    siren?: string;
    constructor(props: { projectId: string; extractionLabel: string; userId: string; fileLabel: string; numSS?: string; contractId?: string; siren?: string; }) {
        this.projectId = props.projectId
        this.extractionLabel = props.extractionLabel
        this.userId = props.userId
        this.fileLabel = props.fileLabel
        this.numSS = props.numSS
        this.contractId = props.contractId
        this.siren = props.siren

    }
    lastRow = async (): Promise<number> => {
        const rowOrder = await prisma.extraction_Data.findFirst({
            where: {
                projectId: this.projectId,
                extractionLabel: this.extractionLabel,
                fileLabel: this.fileLabel

            },
            select: {
                rowOrder: true
            },
            orderBy: {
                rowOrder: 'desc'
            }
        })
        return rowOrder?.rowOrder ? rowOrder.rowOrder : 0
    }
    lastDsn = async (value: string): Promise<{
        dsnId: string;
        dsnMonth: string;
    }> => {
        try {
            const dsn = await prisma.dsn_Value_Exist.findFirstOrThrow({
                where: {
                    value,
                    projectId: this.projectId
                },
                select: {
                    dsnId: true,
                    dsnMonth: true
                },
                orderBy: {
                    dsnMonth: 'desc'
                }
            })
            return dsn
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }

    }
    process = async ({
        columns,
        datas,
        standardField
    }: {
        columns: Column[],
        datas: Society | Person | WorkContract,
        standardField: {
            label: string,
            field: string
        }[]
    }
    ) => {
        try {
            const lastRow = await this.lastRow()
            const datasList: ExtractionData[] = []
            for (const column of columns) {
                let value = ''
                if (column.defaultValue) {
                    value = column.defaultValue
                }
                if (column.standardFieldLabel) {
                    const findKey = standardField.find((element) => element.label === column.standardFieldLabel)
                    const field = findKey?.field as keyof typeof datas
                    if (field) {
                        value = String(datas[field] ? datas[field] : '')
                    }

                }
                //Check format 
                if (column.type === 'date' && column.format) {
                    value = await this.convertFormatDate(value, column.format as FormatDate)
                }
                datasList.push({
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel,
                    columnLabel: column.label,
                    columnValue: value,
                    rowOrder: lastRow ? lastRow + 1 : 1,
                    createdBy: this.userId,
                })
            }
            await this.saveData(datasList)

        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    saveData = async (datasList: ExtractionData[]) => {
        try {
            await prisma.extraction_Data.createMany({
                data: datasList
            })
        } catch (err) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    columns = async () => {
        try {
            const columns = await prisma.project_Column.findMany({
                where: {
                    projectId: this.projectId,
                    fileLabel: this.fileLabel
                },
                select: {
                    columnLabel: true,
                    fileLabel: true,
                    minLength: true,
                    maxLength: true,
                    type: true,
                    isRequired: true,
                    standardFieldLabel: true,
                    min: true,
                    max: true,
                    defaultValue: true,
                    format: true,
                    label: true

                }

            })
            return columns
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }

    }
    loadStandardField = async (iteratorLabel: 'Société' | 'Individu' | 'Contrat de travail' | 'Etablissement') => {
        try {
            const load = await prisma.iterator_Standard_Field.findMany({
                where: {
                    iteratorLabel: iteratorLabel,
                },
                select: {
                    fieldLabel: true,
                }
            })
            const standardField = await prisma.standard_Field.findMany({
                where: {
                    label: {
                        in: load.map((element) => element.fieldLabel)
                    }
                },
                select: {
                    label: true,
                    field: true
                }
            })


            return standardField
        } catch (err) {
            console.error(err)
            throw new Error('Erreur lors de la récupération de la société')
        }
    }

    convertFormatDate = async (value: string, format: FormatDate) => {
        //DSN format date DDMMYYYY
        const day = value.slice(0, 2)
        const month = value.slice(2, 4)
        const year = value.slice(4, 8)
        switch (format) {
            case 'AAAA-MM-JJ':
                return `${year}-${month}-${day}`
                break
            case 'AAAA/MM/JJ':
                return `${year}/${month}/${day}`
                break
            case 'AAAAMMJJ':
                return `${year}${month}${day}`
                break
            case 'JJ/MM/AAAA':
                return `${day}/${month}/${year}`
                break
            case 'JJ-MM-AAAA':
                return `${day}-${month}-${year}`
                break
            case 'JJMMAAAA':
                return `${day}${month}${year}`
                break
            default:
                throw new Error(`Format de date ${format} non supporté `)
        }
    }


}