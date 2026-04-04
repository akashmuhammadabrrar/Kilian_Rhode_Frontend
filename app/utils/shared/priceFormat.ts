export const formatPrice = (value: string | number | undefined | null) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
        return "";
    }
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    }).format(Number(value));
};