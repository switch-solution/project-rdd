export const convertToDate = (dateString: string): Date => {
    const day = parseInt(dateString.substr(0, 2), 10);
    const month = parseInt(dateString.substr(2, 2), 10) - 1; // Les mois sont indexés à partir de 0 en JavaScript
    const year = parseInt(dateString.substr(4, 4), 10);

    return new Date(year, month, day);
}