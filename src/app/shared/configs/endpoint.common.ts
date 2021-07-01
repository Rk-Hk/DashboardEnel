// Login
export const URL_API_LOGIN = {
    signIn: 'users/sign-in',
    changePassword: 'users/changePassword'
};

// Users
export const URL_API_USER = {
    users: 'users',
    company: 'company'
};

// Structures
export const URL_API_STRUCTURES = {
    getStructures: 'structure',
    getListWEBStructures:'web/structuresComplete',
    getStructuresByID: 'inspectionDms',
    getInspectionsByStructure: 'inspectionDmsByStructure',
    getAllFilters: 'filterToStructure',
    createNewStructure: 'web/newStructure',
    deleteStructure: 'web/deleteStructure',
    exportInspections: 'exportInspectionsDms',
    exportStructures: 'exportStructures'
};

/** Dashboard URL */

export const URL_API_DASHBOARD = {
    uploadExcel: 'importInspectionsBase',
    getDataDashboard: 'getDataDashboard'
}