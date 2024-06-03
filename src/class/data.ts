import { prisma } from "@/lib/prisma"

export class Data {
    projectId: string
    fileLabel: string
    extractionLabel: string
    constructor(projectId: string, fileLabel: string, extractionLabel: string) {
        this.projectId = projectId
        this.fileLabel = fileLabel
        this.extractionLabel = extractionLabel
    }

    getDatas = async () => {
        try {
            const colums = await this.getColumns()
            const lastRows = await this.getLastRowPosition()
            const rowsList: { [key: string]: string }[] = []
            const lastRowsBeforeData = await this.getLastRowBeforeData()
            if (lastRowsBeforeData) {
                for (let incrementRow = 1; incrementRow <= lastRowsBeforeData; incrementRow++) {
                    const datas = await this.loadRow(incrementRow)
                    let row: { [key: string]: string } = {}
                    for (const column of colums) {
                        const findData = datas.find((data) => data.columnLabel === column.columnLabel)
                        if (findData) {
                            row[column.columnLabel] = findData.value
                        } else {
                            row[column.columnLabel] = ''
                        }
                    }
                    rowsList.push(row)
                }
            }
            for (let incrementRow = 1; incrementRow <= lastRows; incrementRow++) {
                const datas = await this.loadDatas(incrementRow)
                let row: { [key: string]: string } = {}
                for (const column of colums) {
                    const findData = datas.find((data) => data.columnLabel === column.columnLabel)
                    if (findData) {
                        row[column.columnLabel] = findData.columnValue
                    } else {
                        row[column.columnLabel] = ''
                    }
                }
                rowsList.push(row)
            }
            return rowsList

        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    private loadDatas = async (row: number) => {
        try {
            const data = await prisma.extraction_Data.findMany({
                where: {
                    projectId: this.projectId,
                    extractionLabel: this.extractionLabel,
                    fileLabel: this.fileLabel,
                    rowOrder: row
                },
                select: {
                    columnLabel: true,
                    columnValue: true
                },
                orderBy: {
                    rowOrder: 'asc'
                }
            })
            return data
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    private loadRow = async (order: number) => {
        try {
            const rows = await prisma.project_Row.findMany({
                where: {
                    projectId: this.projectId,
                    fileLabel: this.fileLabel,
                    order: order
                },
                orderBy: {
                    order: 'asc'
                },
            })
            return rows
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    private getLastRowBeforeData = async () => {
        try {
            const row = await prisma.project_Row.findFirstOrThrow({
                where: {
                    projectId: this.projectId,
                    fileLabel: this.fileLabel
                },
                select: {
                    order: true
                },
                orderBy: {
                    order: 'desc'
                }
            })
            return row.order
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

    private getLastRowPosition = async () => {
        try {
            const lastRows = await prisma.extraction_Data.findFirstOrThrow({
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
            return lastRows?.rowOrder
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }
    private getColumns = async () => {
        try {
            const colums = await prisma.project_Column.findMany({
                where: {
                    projectId: this.projectId,
                    fileLabel: this.fileLabel
                },
                select: {
                    columnLabel: true,
                },
                orderBy: {
                    order: 'asc'
                }
            })
            if (!colums) {
                throw new Error('Aucune colonne trouvée')
            }
            return colums
        } catch (err: unknown) {
            console.error(err)
            throw new Error(err as string)
        }
    }

}