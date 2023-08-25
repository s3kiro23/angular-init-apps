export class ComplexFormValue {
    personnalInfo!: {
        firstname: string;
        lastname: string;
    };
    contactPreferences!: string;
    email?: {
        email: string;
        confirm: string;
    };
    phone?: string;
    logInfo!: {
        username: string;
        password: string;
        confirmPassword: string;
    };
}
