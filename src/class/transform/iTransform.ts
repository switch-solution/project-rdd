export type Society = {
    transcoSocietyNewId: string | null,
    dsnId: string,
    siren: string,
    apen: string,
    zipCode: string,
    city: string,
}
export type WorkContract = {
    dsnId: string,
    numSS: string,
    siren: string,
    nic: string,
    startDate: string,
    contractEndDate: string,
    status: string,
    pcs: string | null,
    pcsBis: string | null,
    mal: string,
    contractId: string,
    contract: string,
    ss: string,
    idcc: string,
    transcoContractNewId: string | null,
    transcoEmployeeNewId: string | null,
}
export type Person = {
    transcoEmployeeNewId: string | null,
    dsnId: string,
    numSS: string,
    siren: string,
    nic: string,
    lastname: string,
    surname: string,
    firstname: string,
    sex: string,
    birthday: string,
    placeOfBith: string,
    address1: string,
    codeZip: string,
    city: string,
    countryBirth: string,
    iban1?: string | null,
    iban2?: string | null,
    bic1?: string | null,
    bic2?: string | null,
    payrool?: boolean,
    bank1?: string | null,
    bank2?: string | null,
    advance?: boolean,
    expense?: boolean,
}

export type ExtractionData = {
    projectId: string,
    extractionLabel: string,
    fileLabel: string,
    columnLabel: string,
    columnValue: string,
    rowOrder: number,
    createdBy: string,
}
export type Column = {
    columnLabel: string
    fileLabel: string
    minLength: number | null
    maxLength: number | null
    type: string
    isRequired: boolean
    standardFieldLabel: string | null
    min: number | null
    max: number | null
    defaultValue: string | null
    format: string | null
    label: string
}
export type FormatDate = 'AAAA-MM-JJ' | 'AAAA/MM/JJ' | 'AAAAMMJJ' | 'JJ/MM/AAAA' | 'JJMMAAAA' | 'JJ-MM-AAAA'

export interface ITransform {
    projectId: string;
    extractionLabel: string;
    userId: string;
    fileLabel: string;
    numSS?: string;
    contractId?: string;
    siren?: string;
    data({ numSS, contractId, siren }: { numSS?: string, contractId?: string, siren?: string }): Promise<Society | Person | WorkContract>;
    transform(): Promise<void>;
    lastDsn(value: string): Promise<
        {
            dsnId: string;
            dsnMonth: string;
        }

    >;
    standardField(iterator: 'Société' | 'Contrat de travail'): Promise<
        {
            label: string;
            field: string;
        }[]

    >;
    columns(): Promise<Column[]>;
    lastRow(): Promise<number>;
    convertFormatDate(value: string, format: FormatDate): Promise<string>;
    saveData(datasList: ExtractionData[]): Promise<void>;
    process({ columns, datas, standardField }: { columns: Column[], datas: Society | Person | WorkContract, standardField: { label: string, field: string }[] }): Promise<void>;

}