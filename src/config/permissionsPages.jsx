export const role_permissions = {
    ADMIN: {
        allowedPaths: ['/adminSection/show-customers', '/adminSection/show-users'],
        restrictedPaths: ['/adminSection/show-companies']
    },
    SUPERADMIN: {
        allowedPaths: ['/adminSection/show-companies', '/adminSection/show-users'],
        restrictedPaths: ['/adminSection/show-customers', '/adminSection/show-crew']
    }
}

export const canAccess = (role, path) => {
    const roleConfig = role_permissions[role];
    if (!roleConfig) {
        return false; // Rol no encontrado
    }

    // Verifica si la ruta está en las rutas restringidas para el rol
    if (roleConfig.restrictedPaths.includes(path)) {
        return false;
    }

    // Verifica si la ruta está en las rutas permitidas para el rol
    return roleConfig.allowedPaths.includes(path);
};