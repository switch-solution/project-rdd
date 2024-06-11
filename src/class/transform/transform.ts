import { prisma } from "@/lib/prisma"
import type { FormatDate, ExtractionData, Column, PersonEmail, Transcoding } from "@/src/class/transform/iTransform";
import { Society, Person, WorkContract, Child, Establishment } from "@/src/class/transform/iTransform";
import type { IteratorLabel } from "@/src/helpers/typeTransco";
import * as crypto from "crypto";

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

    process = async ({
        columns,
        datas,
        standardField
    }: {
        columns: Column[],
        datas: Society | Person | WorkContract | PersonEmail | Child | Establishment,
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

                //Transcoding

                let findTranscoding = await this.getTranscoding(column.label, value)
                if (findTranscoding) {
                    value = findTranscoding.targetValue
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
            //Concat all values
            let concatValue = ''
            for (const value of datasList) {
                concatValue += `${this.extractionLabel}_${this.fileLabel}_${value.columnValue}_${value.columnValue}`
            }
            //Generate hash
            const hash = crypto.createHash('sha256');
            hash.update(concatValue);
            const hashRow = hash.digest('hex');
            const hashExist = await prisma.extraction_Data.findFirst({
                where: {
                    projectId: this.projectId,
                    hash: hashRow
                }
            })
            if (!hashExist) {
                await this.saveData(datasList, hashRow)
            }

        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    saveData = async (datasList: ExtractionData[], hash: string) => {
        try {
            await prisma.extraction_Data.createMany({
                data: datasList.map((row) => {
                    return {
                        ...row,
                        hash
                    }
                })
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

    getTranscoding = async (columnLabel: string, sourceValue: string): Promise<Transcoding | null> => {
        try {
            const transcoding = await prisma.project_Column_Transco_Value.findFirst({
                where: {
                    projectId: this.projectId,
                    fileLabel: this.fileLabel,
                    columnLabel: columnLabel,
                    sourceValue: sourceValue
                },
                select: {
                    targetValue: true
                }

            })

            return transcoding
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    loadStandardField = async (iteratorLabel: IteratorLabel) => {
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