// Hardcoded admin credentials for frontend-only authentication
// Replace with real backend authentication later

export const ADMIN_CREDENTIALS = {
    email: 'admin@example.com',
    password: 'admin123',
};

export const isAdminUser = (email, password) => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};
