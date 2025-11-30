export class ValidationUtils {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPhone(phone: string): boolean {
        const phoneRegex = /^\+?[\d\s-()]{10,}$/;
        return phoneRegex.test(phone);
    }

    static isValidDate(date: any): boolean {
        return date instanceof Date && !isNaN(date.getTime());
    }
}
