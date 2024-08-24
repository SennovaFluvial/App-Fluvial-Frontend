export const role_permissions = {
    ADMIN: {
        paths: {
            '/adminSection/show-customers': true,
            '/adminSection/show-users': true,
            '/adminSection/add-captain': true,
            '/adminSection/add-sailor': true,
            '/adminSection/add-boat-driver': true,
            '/adminSection/add-vehicle': true,
            '/adminSection/show-companies': false
        }
    },
    SUPERADMIN: {
        paths: {
            '/adminSection/show-companies': true,
            '/adminSection/show-users': true,
            '/adminSection/show-customers': false,
            '/adminSection/show-crew': false,
            '/adminSection/add-captain': false,
            '/adminSection/add-sailor': false,
            '/adminSection/add-boat-driver': false,
            '/adminSection/add-vehicle': false
        }
    }
}

export const canAccess = (role, path) => {
    const roleConfig = role_permissions[role];
    return roleConfig?.paths?.[path] ?? false;
};