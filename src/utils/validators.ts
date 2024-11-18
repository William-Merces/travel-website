export const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password: string): boolean => {
    return password.length >= 8;
};

export const validateDate = (date: Date): boolean => {
    return date instanceof Date && !isNaN(date.getTime());
};