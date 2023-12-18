const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

const validatePasswordStrength = (password: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
};

const arePasswordsEqual = (password: string, repassword: string): boolean => {
    return password === repassword;
};

export const match = {
    validateEmail,
    validatePasswordStrength,
    arePasswordsEqual,
};