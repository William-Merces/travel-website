export const formatCurrency = (amount: number, currency: string = 'BRL'): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency,
    }).format(amount);
};

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(new Date(date));
};

export const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
};
