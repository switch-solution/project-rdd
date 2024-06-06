import { type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
export async function GET(request: NextRequest, { params }: { params: { projectId: string } }) {
    const project = await prisma.project.findFirst({
        where: {
            id: params.projectId
        },
        include: {
            Person: true,
            WorkContract: true,
            Society: true,
            Establishement: true,
            Person_Bank: true,
            Person_Children: true,
            Person_Mutual: true,
            Mutual: true,
            Extraction: {
                include: {
                    Extraction_File: {
                        include: {
                            Extraction_Data: true
                        }
                    }
                }
            },
            Dsn: true,
            Transco_Establishment: true,
            Transco_Society: true,
            Transco_WorkContract: true,
            Transco_Person: true,
        }
    })
    const projectData = {
        statistical: {
            person: project?.Person.length,
            workContract: project?.WorkContract.length,
            society: project?.Society.length,
            establishement: project?.Establishement.length,
            dsn: project?.Dsn.length,
            transcoPerson: project?.Transco_Person.length,
            transcoWorkContract: project?.Transco_WorkContract.length,
            transcoSociety: project?.Transco_Society.length,
            transcoEstablishment: project?.Transco_Establishment.length,
            extraction: project?.Extraction.length,
            extractionFile: project?.Extraction?.map((extraction) => extraction.Extraction_File.length).reduce((a, b) => a + b, 0),
            extractionData: project?.Extraction?.map((extraction) => extraction.Extraction_File.map((extractionFile) => extractionFile.Extraction_Data.length).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0)
        },
        datas: {
            dsn: project?.Dsn,
            person: project?.Person,
            workContract: project?.WorkContract,
            society: project?.Society,
            establishement: project?.Establishement,
            personBank: project?.Person_Bank,
            personChildren: project?.Person_Children,
            personMutual: project?.Person_Mutual,
            mutual: project?.Mutual
        },
        extraction: {
            data: project?.Extraction
        },
        transcos: {
            establishment: project?.Transco_Establishment,
            society: project?.Transco_Society,
            person: project?.Transco_Person,
            workContract: project?.Transco_WorkContract
        }

    }

    return new Response(JSON.stringify(projectData), { status: 200 })

}