export const ROUTE_GENERAL = {
    login: 'login',
    dashboard: '',
};

export const TYPE_NOTIFICATION = {
    NOT_INFO: 'info',
    NOT_SUCCESS: 'success',
    NOT_WARNING: 'warning',
    NOT_DANGER: 'danger',
    NOT_PRIMARY: ''
}

export const POSITION_NOTIFICATION = {
    POS_TOP_LEFT: ['top','left'],
    POS_TOP_CENTER: ['top','center'],
    POS_TOP_RIGHT: ['top','right'],
    POS_BOTTOM_LEFT: ['bottom','left'],
    POS_BOTTOM_CENTER: ['bottom','center'],
    POS_BOTTOM_RIGHT: ['bottom','right'],
}

export const ROUTE_DASHBOARD = {
    path_employees: 'employees',
    path_companies: 'companies',
    path_structures: 'structures',
    path_inspections: 'inspections',
    path_dashboardDataStudio: 'dashboardDataStudio',
    path_historyInspections: 'historyInspections',
    path_structureDetail: 'structureDetail',

    path_dashboardGraphics: 'dashboardGraphics',


    management: 'management',

    
    pr_dashboard: 'dashboard',
    pr_config: 'config',

    // RUTAS DASHBOARD 

    path_dashboardKPI: 'dashboard-kpi',

    // RUTAS DMS
    path_dms_datastudio: 'dashboardStudio',
    path_dms_inspections: 'dms-inspections',
    path_dms_structuresInfo: 'dms-structureInfo',

    // RUTAS CONFIG
    path_config_upload_file: 'config/upload-file',
    path_config_manage_users: 'config/manage-users',
    path_config_manage_companies: 'config/manage-companies',


};

export const TIME_OUT_SESSION = new Date(new Date().getTime() + (60 * 60000));
