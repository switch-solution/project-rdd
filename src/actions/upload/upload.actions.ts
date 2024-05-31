"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { authorizationProject, ActionError } from "@/lib/safe-actions";
import { convertToDate } from "@/src/helpers/convertDate";
const dsnDataSchema = z.object({
    projectSlug: z.string(),
    dsnData: z.object({
        society: z.object({
            siren: z.string(),
            apen: z.string(),
            adress1: z.string(),
            zipCode: z.string(),
            city: z.string(),
        }),
        establishment: z.object({
            nic: z.string(),
            apet: z.string(),
            adress1: z.string(),
            postalCode: z.string().optional(),
            city: z.string(),
            legalStatus: z.string().optional(),
            idcc: z.string().optional(),

        }),
        dsn: z.object({
            month: z.string(),
            softwareName: z.string(),
            provider: z.string(),
            type: z.string(),
            totalRows: z.string(),
            dsnVersion: z.string(),
            softwareVersion: z.string(),
        }),
        jobs: z.array(z.object({
            employmentLabel: z.string(),
        })),
        idcc: z.array(z.object({
            idcc: z.string(),
        })),
        employees: z.array(z.object({
            numSS: z.string(),
            lastname: z.string(),
            surname: z.string(),
            firstname: z.string(),
            sex: z.string(),
            birthday: z.string(),
            placeOfBith: z.string(),
            address1: z.string(),
            codeZip: z.string(),
            city: z.string(),
            country: z.string().optional(),
            codeZipBith: z.string(),
            countryBirth: z.string(),
            address2: z.string().optional(),
            address3: z.string().optional(),
            email: z.string().email().optional(),
            employeeId: z.string().optional(),
            graduate: z.string().optional(),
            studies: z.string().optional(),
            date: z.string().optional(),
            ntt: z.string().optional(),
        })),
        workContracts: z.array(z.object({
            DNACodeUnitTime: z.string(),
            DSNWorkQuotaEstablishment: z.string(),
            DSNWorkQuotaWorkContract: z.string(),
            contract: z.string(),
            contractEndDate: z.string().optional(),
            contractId: z.string(),
            employmentLabel: z.string(),
            estabWorkPlace: z.string(),
            foreigner: z.string(),
            idWorkAccidentRisk: z.string(),
            idcc: z.string(),
            mal: z.string(),
            multipleEmployerCode: z.string(),
            multipleJobCode: z.string(),
            numSS: z.string(),
            pcs: z.string(),
            publicDispPolitic: z.string(),
            rateAt: z.string(),
            retirement: z.string(),
            ss: z.string(),
            startDate: z.string(),
            status: z.string(),
            statusEmployment: z.string(),
            vieillesse: z.string(),
            workAccidentRisk: z.string(),
            workTime: z.string(),


        }))

    }),

})
export const uploadFileDsn = authorizationProject(dsnDataSchema, async (values: z.infer<typeof dsnDataSchema>, { userId, projectId }) => {

    const { projectSlug, dsnData } = dsnDataSchema.parse(values)
    const dsnDetail = dsnData.dsn
    const dsnSociety = dsnData.society
    const dsnEstablishment = dsnData.establishment
    const dsnJobs = dsnData.jobs
    const employees = dsnData.employees
    const workContracts = dsnData.workContracts
    try {
        const dsnId = await prisma.dsn.create({
            data: {
                month: dsnDetail.month,
                softwareName: dsnDetail.softwareName,
                provider: dsnDetail.provider,
                type: dsnDetail.type,
                totalRows: dsnDetail.totalRows,
                dsnVersion: dsnDetail.dsnVersion,
                softwareVersion: dsnDetail.softwareVersion,
                createdBy: userId,
                Project: {
                    connect: {
                        slug: projectSlug
                    }
                }
            }
        })
        await prisma.society.create({
            data: {
                siren: dsnSociety.siren,
                apen: dsnSociety.apen,
                zipCode: dsnSociety.zipCode,
                city: dsnSociety.city,
                createdBy: userId,
                Dsn: {
                    connect: {
                        id: dsnId.id
                    }
                },
                Project: {
                    connect: {
                        slug: projectSlug
                    }
                }
            }

        })
        await prisma.dsn_Value_Exist.create({
            data: {
                dsnId: dsnId.id,
                projectId: projectId,
                dsnMonth: dsnDetail.month,
                table: 'Society',
                fieldLabel: 'siren',
                exist: true,
                value: dsnSociety.siren
            }
        })
        await prisma.establishment.create({
            data: {
                nic: dsnEstablishment.nic,
                ape: dsnEstablishment.apet,
                postalCode: dsnEstablishment.postalCode ? dsnEstablishment.postalCode : "",
                city: dsnEstablishment.city,
                legalStatus: dsnEstablishment.legalStatus ? dsnEstablishment.legalStatus : "",
                createdBy: userId,
                siren: dsnSociety.siren,
                dsnId: dsnId.id,
                projectId: projectId
            }
        })
        await prisma.dsn_Value_Exist.create({
            data: {
                dsnId: dsnId.id,
                projectId: projectId,
                dsnMonth: dsnDetail.month,
                table: 'Establishment',
                fieldLabel: 'nic',
                exist: true,
                value: dsnEstablishment.nic
            }
        })
        const persons = employees.map((employee) => {
            return {
                ...employee,
                birthday: convertToDate(employee.birthday),
                projectId: projectId,
                createdBy: userId,
                dsnId: dsnId.id,
                siren: dsnSociety.siren,
                nic: dsnEstablishment.nic
            }

        })
        await prisma.person.createMany({
            data: persons
        })
        const personExist = persons.map((person) => {
            return {
                dsnId: dsnId.id,
                projectId: projectId,
                dsnMonth: dsnDetail.month,
                table: 'Person',
                fieldLabel: 'numSS',
                exist: true,
                value: person.numSS
            }
        })
        await prisma.dsn_Value_Exist.createMany({
            data: personExist
        })
        const workContractsList = workContracts.map((workContract) => {
            return {
                ...workContract,
                contractEndDate: workContract.contractEndDate ? convertToDate(workContract.contractEndDate) : new Date(-0o1),
                startDate: convertToDate(workContract.startDate),
                projectId: projectId,
                createdBy: userId,
                dsnId: dsnId.id,
                nic: dsnEstablishment.nic,
                siren: dsnSociety.siren
            }
        })
        await prisma.workContract.createMany({
            data: workContractsList

        })
        const jobs = dsnJobs.map((job) => {
            return {
                employementLabel: job.employmentLabel,
                projectId,
                createdBy: userId,
                dsnId: dsnId.id,
            }
        })
        await prisma.job.createMany({
            data: jobs
        })

    } catch (err: unknown) {
        //Delete all datas
        await prisma.dsn.deleteMany({
            where: {
                projectId
            }
        })

        throw new ActionError(err as string)
    }


    revalidatePath(`/project/${projectSlug}`);
});