export type Language = "es" | "en";

export interface Translations {
  // Navigation
  nav_proposal: string;
  nav_form: string;
  nav_admin: string;
  nav_analytics: string;
  nav_methodology: string;
  nav_guest_access: string;
  nav_consultant: string;
  nav_edit_profile: string;
  nav_edit_profile_title: string;
  nav_full_name: string;
  nav_consultant_role: string;
  nav_save_changes: string;
  nav_cancel: string;
  nav_reset_default: string;
  nav_brand_title: string;
  nav_brand_subtitle: string;
  nav_language: string;
  nav_switch_to: string;

  // Common UI
  btn_back: string;
  btn_back_to_list: string;
  btn_print_pdf: string;
  btn_view_full: string;
  btn_view_a4: string;
  btn_print_now: string;
  btn_copy_whatsapp: string;
  btn_copied: string;
  btn_export_excel: string;
  btn_search: string;
  btn_filter: string;
  btn_save: string;
  btn_edit: string;
  btn_delete: string;
  btn_confirm: string;
  btn_new_interview: string;
  badge_official: string;
  badge_confidential: string;

  // Report & A4 Print
  report_header_title: string;
  report_header_subtitle: string;
  report_evaluation_badge: string;
  report_assessed_company: string;
  report_contact: string;
  report_sector: string;
  report_size: string;
  report_collaborators: string;
  report_official_verdict: string;
  report_score_label: string;
  report_maturity_index: string;
  report_pentagonal_radar: string;
  report_dimension_scores: string;
  report_diagnostic_criteria: string;
  report_recommended_solution: string;
  report_immediate_action_plan: string;
  report_step_prefix: string;
  report_operational_assessment: string;
  report_goals_expectations: string;
  report_integration: string;
  report_frequency: string;
  report_confidence: string;
  report_current_tool: string;
  report_storage_sources: string;
  report_priority_process: string;
  report_expected_value: string;
  report_obstacles: string;
  report_consultant_notes: string;
  report_page_info: string;
  report_a4_notice: string;

  // Maturity Levels
  level_1_title: string;
  level_1_short: string;
  level_1_criteria: string;
  level_1_solution: string;
  level_2_title: string;
  level_2_short: string;
  level_2_criteria: string;
  level_2_solution: string;
  level_3_title: string;
  level_3_short: string;
  level_3_criteria: string;
  level_3_solution: string;

  // Dimensions
  dim_storage: string;
  dim_integration: string;
  dim_frequency: string;
  dim_quality: string;
  dim_reporting: string;

  // Proposal Module
  prop_tab_institutional: string;
  prop_tab_custom: string;
  prop_badge: string;
  prop_title: string;
  prop_subtitle: string;
  prop_select_client: string;
  prop_client_selected: string;
  prop_copy_instruction: string;
  prop_copied_toast: string;
  prop_whatsapp_ready: string;

  // Form Module
  form_badge: string;
  form_title: string;
  form_subtitle: string;
  form_step_1: string;
  form_step_2: string;
  form_step_3: string;
  form_step_4: string;
  form_step_5: string;
  form_btn_next: string;
  form_btn_prev: string;
  form_btn_submit: string;
  form_company_name: string;
  form_contact_name: string;
  form_contact_role: string;
  form_sector_label: string;
  form_size_label: string;

  // Admin Module
  admin_title: string;
  admin_subtitle: string;
  admin_search_placeholder: string;
  admin_filter_all_levels: string;
  admin_filter_all_sectors: string;
  admin_col_company: string;
  admin_col_contact: string;
  admin_col_sector: string;
  admin_col_level: string;
  admin_col_score: string;
  admin_col_date: string;
  admin_col_actions: string;
  admin_empty: string;

  // Analytics Module
  analytics_title: string;
  analytics_subtitle: string;
  analytics_total_assessments: string;
  analytics_average_score: string;
  analytics_predominant_level: string;
  analytics_most_frequent_sector: string;
  analytics_max_score: string;
  analytics_min_score: string;
  analytics_maturity_dist: string;
  analytics_sectors_dist: string;
  analytics_obstacles_dist: string;
  analytics_priority_processes: string;
  analytics_radar_title: string;
  analytics_radar_subtitle: string;
  analytics_a4_badge: string;
  analytics_a4_notice: string;
  analytics_executive_insights: string;
  analytics_bottleneck_label: string;
  analytics_opportunity_label: string;
  analytics_market_diagnostic: string;
  analytics_empty_title: string;
  analytics_empty_desc: string;
  analytics_empty_seed: string;
  analytics_clients_suffix: string;
  analytics_mentions_suffix: string;
}

export const translations: Record<Language, Translations> = {
  es: {
    // Navigation
    nav_proposal: "Propuesta de Trabajo",
    nav_form: "Primera Entrevista",
    nav_admin: "Administración",
    nav_analytics: "Analítica de Clientes",
    nav_methodology: "Matriz & Metodología",
    nav_guest_access: "Acceso Invitado",
    nav_consultant: "Consultor Invitado",
    nav_edit_profile: "Editar Perfil",
    nav_edit_profile_title: "Configurar Perfil del Consultor",
    nav_full_name: "Nombre y Apellido",
    nav_consultant_role: "Cargo / Especialidad",
    nav_save_changes: "Guardar Cambios",
    nav_cancel: "Cancelar",
    nav_reset_default: "Restablecer",
    nav_brand_title: "Information + Solutions",
    nav_brand_subtitle: "Data Solutions",
    nav_language: "Idioma",
    nav_switch_to: "English",

    // Common UI
    btn_back: "Volver",
    btn_back_to_list: "Volver al Listado",
    btn_print_pdf: "Imprimir / Guardar como PDF",
    btn_view_full: "Vista Completa",
    btn_view_a4: "Vista Hoja A4 (1 Pág)",
    btn_print_now: "Imprimir Ahora",
    btn_copy_whatsapp: "Copiar Propuesta para WhatsApp",
    btn_copied: "¡Copiado para WhatsApp!",
    btn_export_excel: "Exportar a Excel",
    btn_search: "Buscar",
    btn_filter: "Filtrar",
    btn_save: "Guardar",
    btn_edit: "Editar",
    btn_delete: "Eliminar",
    btn_confirm: "Confirmar",
    btn_new_interview: "Nueva Entrevista",
    badge_official: "Documento Oficial",
    badge_confidential: "Confidencial",

    // Report & A4 Print
    report_header_title: "INFORMACIÓN + SOLUTIONS",
    report_header_subtitle: "Data Solutions & Business Intelligence · Relevamiento de Madurez",
    report_evaluation_badge: "INFORME DE EVALUACIÓN BI",
    report_assessed_company: "EMPRESA EVALUADA",
    report_contact: "Contacto",
    report_sector: "Sector",
    report_size: "Tamaño",
    report_collaborators: "colaboradores",
    report_official_verdict: "Dictamen Oficial",
    report_score_label: "Nivel de Preparación BI",
    report_maturity_index: "Índice de Madurez",
    report_pentagonal_radar: "Radar Pentagonal",
    report_dimension_scores: "Puntuación por Dimensión",
    report_diagnostic_criteria: "Criterio Diagnóstico",
    report_recommended_solution: "Solución Inicial Recomendada",
    report_immediate_action_plan: "Plan de Acción Inmediato (4 Fases Clave)",
    report_step_prefix: "PASO",
    report_operational_assessment: "Relevamiento Operativo",
    report_goals_expectations: "Objetivos y Expectativas",
    report_integration: "Integración",
    report_frequency: "Frecuencia",
    report_confidence: "Confianza",
    report_current_tool: "Herramienta",
    report_storage_sources: "Fuentes",
    report_priority_process: "Proceso prioritario",
    report_expected_value: "Valor esperado",
    report_obstacles: "Obstáculos",
    report_consultant_notes: "Notas del Consultor",
    report_page_info: "Página 1 de 1 · Formato A4",
    report_a4_notice: "Modo Vista A4 (1 Hoja): Este diseño está calibrado para imprimirse o guardarse en PDF en exactamente una sola hoja A4 sin cortes ni desbordes.",

    // Maturity Levels
    level_1_title: "Nivel 1: Inicial / Disperso",
    level_1_short: "Inicial / Disperso",
    level_1_criteria: "Uso intensivo de planillas aisladas, datos en papel, reportes manuales lentos.",
    level_1_solution: "Normalización y Tablero Base: Limpieza de datos + conexión de planillas a Looker Studio / Power BI con métricas comerciales directas.",
    level_2_title: "Nivel 2: Operativo / Estructurado",
    level_2_short: "Operativo / Estructurado",
    level_2_criteria: "Cuentan con ERP o facturación centralizada, pero reportan en Excel manual.",
    level_2_solution: "Pipeline y Data Modeling: Conexión a la base de datos o exportaciones automáticas + Tablero Ejecutivo de KPIs estratégicos.",
    level_3_title: "Nivel 3: Avanzado / Preparado",
    level_3_short: "Avanzado / Preparado",
    level_3_criteria: "Base de datos sólida, reportabilidad continua, listos para analítica avanzada.",
    level_3_solution: "Business Intelligence Integral: Data warehouse / lakehouse ligero + modelos predictivos y tableros en tiempo real para toma de decisiones.",

    // Dimensions
    dim_storage: "Almacenamiento",
    dim_integration: "Integración",
    dim_frequency: "Frecuencia",
    dim_quality: "Calidad Datos",
    dim_reporting: "Reportabilidad",

    // Proposal Module
    prop_tab_institutional: "Propuesta Institucional",
    prop_tab_custom: "Propuesta Personalizada por Cliente",
    prop_badge: "PROPUESTA DE VALOR I+S",
    prop_title: "Inteligencia de Datos para Decisiones Estratégicas",
    prop_subtitle: "Metodología ágil y orientada a resultados: desde el relevamiento hasta la implementación de tableros de control ejecutivos.",
    prop_select_client: "Seleccionar Cliente Evaluado",
    prop_client_selected: "Cliente Seleccionado",
    prop_copy_instruction: "Texto listo para enviar por WhatsApp con formato enriquecido (negritas y emojis):",
    prop_copied_toast: "¡Texto copiado al portapapeles! Listo para pegar en WhatsApp.",
    prop_whatsapp_ready: "Listo para WhatsApp",

    // Form Module
    form_badge: "RELEVAMIENTO DE MADUREZ DE DATOS",
    form_title: "Diagnóstico de Madurez de Datos & BI",
    form_subtitle: "Evaluación Inicial para Business Intelligence",
    form_step_1: "Datos Generales",
    form_step_2: "Almacenamiento y Fuentes",
    form_step_3: "Calidad y Flujo",
    form_step_4: "Generación de Reportes",
    form_step_5: "Prioridades y Expectativas",
    form_btn_next: "Siguiente Paso",
    form_btn_prev: "Paso Anterior",
    form_btn_submit: "Finalizar y Generar Diagnóstico",
    form_company_name: "Nombre de la Empresa",
    form_contact_name: "Persona de Contacto",
    form_contact_role: "Cargo / Puesto",
    form_sector_label: "Sector de Actividad",
    form_size_label: "Cantidad de Colaboradores",

    // Admin Module
    admin_title: "Panel de Administración",
    admin_subtitle: "Gestión centralizada de entrevistas, diagnósticos y seguimiento de prospectos",
    admin_search_placeholder: "Buscar por empresa, contacto o sector...",
    admin_filter_all_levels: "Todos los Niveles",
    admin_filter_all_sectors: "Todos los Sectores",
    admin_col_company: "Empresa",
    admin_col_contact: "Contacto",
    admin_col_sector: "Sector",
    admin_col_level: "Nivel de Madurez",
    admin_col_score: "Score Global",
    admin_col_date: "Fecha",
    admin_col_actions: "Acciones",
    admin_empty: "No se encontraron entrevistas que coincidan con la búsqueda.",

    // Analytics Module
    analytics_title: "Analítica de Clientes y Madurez",
    analytics_subtitle: "Visión global del estado del relevamiento y métricas consolidadas",
    analytics_total_assessments: "Total de Evaluaciones",
    analytics_average_score: "Score Promedio",
    analytics_predominant_level: "Nivel Predominante",
    analytics_most_frequent_sector: "Sector Frecuente",
    analytics_max_score: "Score Máximo",
    analytics_min_score: "Score Mínimo",
    analytics_maturity_dist: "Distribución de Madurez de Datos",
    analytics_sectors_dist: "Entrevistas por Sector Económico",
    analytics_obstacles_dist: "Obstáculos Principales para Decidir",
    analytics_priority_processes: "Procesos Prioritarios para Tablero",
    analytics_radar_title: "Madurez Promedio de la Cartera por Dimensión",
    analytics_radar_subtitle: "Desempeño consolidado del portafolio en los 5 ejes clave del diagnóstico.",
    analytics_a4_badge: "ANALÍTICA CONSOLIDADA DE MERCADO",
    analytics_a4_notice: "Modo Vista A4 (1 Hoja): Este informe consolidado está calibrado para imprimirse o guardarse en PDF en exactamente una sola hoja A4 sin cortes.",
    analytics_executive_insights: "Conclusiones Estratégicas del Portafolio",
    analytics_bottleneck_label: "Cuello de Botella Estructural",
    analytics_opportunity_label: "Oportunidad de Mayor Tracción",
    analytics_market_diagnostic: "Diagnóstico General del Relevamiento",
    analytics_empty_title: "No hay datos suficientes para calcular analíticas",
    analytics_empty_desc: "Cargue al menos una entrevista o agregue los datos de muestra para visualizar métricas comparativas.",
    analytics_empty_seed: "Cargar Entrevistas de Ejemplo",
    analytics_clients_suffix: "clientes",
    analytics_mentions_suffix: "menciones"
  },
  en: {
    // Navigation
    nav_proposal: "Work Proposal",
    nav_form: "First Interview",
    nav_admin: "Administration",
    nav_analytics: "Client Analytics",
    nav_methodology: "Matrix & Methodology",
    nav_guest_access: "Guest Access",
    nav_consultant: "Guest Consultant",
    nav_edit_profile: "Edit Profile",
    nav_edit_profile_title: "Configure Consultant Profile",
    nav_full_name: "Full Name",
    nav_consultant_role: "Role / Specialty",
    nav_save_changes: "Save Changes",
    nav_cancel: "Cancel",
    nav_reset_default: "Reset",
    nav_brand_title: "Information + Solutions",
    nav_brand_subtitle: "Data Solutions",
    nav_language: "Language",
    nav_switch_to: "Español",

    // Common UI
    btn_back: "Back",
    btn_back_to_list: "Back to List",
    btn_print_pdf: "Print / Save as PDF",
    btn_view_full: "Full View",
    btn_view_a4: "A4 Sheet View (1 Page)",
    btn_print_now: "Print Now",
    btn_copy_whatsapp: "Copy Proposal for WhatsApp",
    btn_copied: "Copied for WhatsApp!",
    btn_export_excel: "Export to Excel",
    btn_search: "Search",
    btn_filter: "Filter",
    btn_save: "Save",
    btn_edit: "Edit",
    btn_delete: "Delete",
    btn_confirm: "Confirm",
    btn_new_interview: "New Interview",
    badge_official: "Official Document",
    badge_confidential: "Confidential",

    // Report & A4 Print
    report_header_title: "INFORMACIÓN + SOLUTIONS",
    report_header_subtitle: "Data Solutions & Business Intelligence · Maturity Assessment",
    report_evaluation_badge: "BI EVALUATION REPORT",
    report_assessed_company: "ASSESSED COMPANY",
    report_contact: "Contact",
    report_sector: "Sector",
    report_size: "Size",
    report_collaborators: "employees",
    report_official_verdict: "Official Verdict",
    report_score_label: "BI Readiness Level",
    report_maturity_index: "Maturity Index",
    report_pentagonal_radar: "Pentagonal Radar",
    report_dimension_scores: "Score by Dimension",
    report_diagnostic_criteria: "Diagnostic Criteria",
    report_recommended_solution: "Recommended Initial Solution",
    report_immediate_action_plan: "Immediate Action Plan (4 Key Phases)",
    report_step_prefix: "STEP",
    report_operational_assessment: "Operational Assessment",
    report_goals_expectations: "Goals & Expectations",
    report_integration: "Integration",
    report_frequency: "Frequency",
    report_confidence: "Data Trust",
    report_current_tool: "Tool",
    report_storage_sources: "Sources",
    report_priority_process: "Priority process",
    report_expected_value: "Expected value",
    report_obstacles: "Obstacles",
    report_consultant_notes: "Consultant Notes",
    report_page_info: "Page 1 of 1 · A4 Format",
    report_a4_notice: "A4 Sheet Mode (1 Page): Calibrated for printing or saving as PDF in exactly one single A4 sheet without cutoffs or overflow.",

    // Maturity Levels
    level_1_title: "Level 1: Initial / Dispersed",
    level_1_short: "Initial / Dispersed",
    level_1_criteria: "Intensive use of isolated spreadsheets, paper records, and slow manual reporting.",
    level_1_solution: "Data Normalization & Core Dashboard: Data cleansing + connecting spreadsheets to Looker Studio / Power BI with direct commercial KPIs.",
    level_2_title: "Level 2: Operational / Structured",
    level_2_short: "Operational / Structured",
    level_2_criteria: "Equipped with ERP or centralized billing, but reporting through manual Excel spreadsheets.",
    level_2_solution: "Pipeline & Data Modeling: Database direct connection or scheduled extractions + Executive Dashboard for strategic KPIs.",
    level_3_title: "Level 3: Advanced / Ready",
    level_3_short: "Advanced / Ready",
    level_3_criteria: "Solid database foundation, ongoing reporting, fully primed for advanced analytics.",
    level_3_solution: "Comprehensive Business Intelligence: Lightweight data warehouse / lakehouse + predictive modeling and real-time decision dashboards.",

    // Dimensions
    dim_storage: "Storage",
    dim_integration: "Integration",
    dim_frequency: "Frequency",
    dim_quality: "Data Quality",
    dim_reporting: "Reporting Speed",

    // Proposal Module
    prop_tab_institutional: "Institutional Proposal",
    prop_tab_custom: "Custom Client Proposal",
    prop_badge: "I+S VALUE PROPOSITION",
    prop_title: "Data Intelligence for Strategic Decisions",
    prop_subtitle: "Agile, results-driven methodology: from diagnostic assessment to executive dashboard deployment.",
    prop_select_client: "Select Evaluated Client",
    prop_client_selected: "Selected Client",
    prop_copy_instruction: "Message ready for WhatsApp with formatted bold highlights and friendly emojis:",
    prop_copied_toast: "Text copied to clipboard! Ready to paste into WhatsApp.",
    prop_whatsapp_ready: "WhatsApp Ready",

    // Form Module
    form_badge: "DATA MATURITY ASSESSMENT",
    form_title: "Data Maturity & BI Diagnostic",
    form_subtitle: "Initial Assessment for Business Intelligence",
    form_step_1: "General Information",
    form_step_2: "Storage & Sources",
    form_step_3: "Quality & Flow",
    form_step_4: "Reporting & Decision Making",
    form_step_5: "Priorities & Expectations",
    form_btn_next: "Next Step",
    form_btn_prev: "Previous Step",
    form_btn_submit: "Complete & Generate Diagnostic",
    form_company_name: "Company Name",
    form_contact_name: "Contact Person",
    form_contact_role: "Role / Position",
    form_sector_label: "Industry Sector",
    form_size_label: "Number of Employees",

    // Admin Module
    admin_title: "Administration Panel",
    admin_subtitle: "Centralized management of interviews, diagnostics, and prospect follow-up",
    admin_search_placeholder: "Search by company, contact, or sector...",
    admin_filter_all_levels: "All Levels",
    admin_filter_all_sectors: "All Sectors",
    admin_col_company: "Company",
    admin_col_contact: "Contact",
    admin_col_sector: "Sector",
    admin_col_level: "Maturity Level",
    admin_col_score: "Global Score",
    admin_col_date: "Date",
    admin_col_actions: "Actions",
    admin_empty: "No interviews matched your search criteria.",

    // Analytics Module
    analytics_title: "Client & Maturity Analytics",
    analytics_subtitle: "High-level overview of assessment metrics and consolidated trends",
    analytics_total_assessments: "Total Assessments",
    analytics_average_score: "Average Score",
    analytics_predominant_level: "Predominant Level",
    analytics_most_frequent_sector: "Frequent Sector",
    analytics_max_score: "Maximum Score",
    analytics_min_score: "Minimum Score",
    analytics_maturity_dist: "Data Maturity Distribution",
    analytics_sectors_dist: "Assessments by Economic Sector",
    analytics_obstacles_dist: "Main Decision-Making Obstacles",
    analytics_priority_processes: "Priority Processes for Dashboard",
    analytics_radar_title: "Portfolio Average Maturity by Dimension",
    analytics_radar_subtitle: "Consolidated portfolio performance across the 5 diagnostic axes.",
    analytics_a4_badge: "CONSOLIDATED MARKET ANALYTICS",
    analytics_a4_notice: "A4 Sheet Mode (1 Page): This consolidated report is calibrated to print or save as PDF in exactly one single A4 sheet without cutoffs.",
    analytics_executive_insights: "Strategic Portfolio Insights",
    analytics_bottleneck_label: "Structural Bottleneck",
    analytics_opportunity_label: "Highest Traction Opportunity",
    analytics_market_diagnostic: "General Assessment Diagnostic",
    analytics_empty_title: "Not enough data to calculate analytics",
    analytics_empty_desc: "Load at least one interview or add sample data to visualize comparative metrics.",
    analytics_empty_seed: "Load Sample Interviews",
    analytics_clients_suffix: "clients",
    analytics_mentions_suffix: "mentions"
  }
};
