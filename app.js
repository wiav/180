// Daily Win OS - Core Script

// -------------------------------------------------------------
// 1. CONSTANTES Y CONFIGURACIONES POR DEFECTO
// -------------------------------------------------------------
const MISSION_KEYS = {
  sleep_shield: 'sleep_shield',
  clean_fuel: 'clean_fuel',
  hybrid_training: 'hybrid_training',
  digital_firewall: 'digital_firewall',
  learning: 'learning',
  deep_work: 'deep_work',
  toxins: 'toxins'
};

const DEFAULT_GOALS = {
  sleep_hours: 7.5,
  wake_time: '10:00 AM',
  calories: 2200,
  protein: 170,
  water: 3.15,
  social_media_min: 30,
  study_min: 30,
  work_hours: 1
};

const BONUS_MISSIONS = [
  "Haz 100 flexiones repartidas en el día.",
  "Date una ducha de agua fría de 2 minutos.",
  "Llama o escribe a un ser querido con el que hace tiempo no hablas.",
  "Estira durante 15 minutos mientras escuchas un podcast.",
  "Lee 10 páginas de un libro que no sea de tu sector.",
  "No te quejes de nada en voz alta durante todo el día.",
  "Haz un ayuno de 16 horas.",
  "10 minutos de meditación enfocada en la respiración.",
  "Da 10,000 pasos antes de terminar el día.",
  "Limpia a fondo y organiza tu espacio de trabajo."
];

// -------------------------------------------------------------
// 1.5 DICCIONARIO DE TRADUCCIONES (i18n)
// -------------------------------------------------------------
const i18n = {
  es: {
    // Header & Tabs
    loading_date: 'Cargando fecha...',
    gallery_title: 'Galería Semanal',
    gallery_desc: 'Sube una foto cada semana para registrar tu cambio visual (Local).',
    weekly_review_title: 'Revisión Semanal',
    weekly_review_desc: 'Análisis de tus últimos 7 días.',
    weekly_ai_insight: '💡 Análisis e Insights',
    weekly_ack_btn: 'Entendido',
    tab_today: 'Hoy',
    tab_progress: 'Progreso',
    tab_profile: 'Perfil',
    tab_library: 'Biblio',
    tab_elite: 'Élite',
    
    elite_locked_title: 'Nivel Clasificado',
    elite_locked_desc: 'Completa 180 días de transformación para desbloquear la Fase 2.',
    elite_unlocked_title: 'Estatus Élite Alcanzado',
    elite_unlocked_desc: 'Has dominado tu biología y tu mente durante 180 días. Ahora comienza la Fase 2.',
    elite_stats_title: 'Resumen Semestral',
    elite_total_wins: 'Días Ganados',
    elite_avg_energy: 'Energía Promedio',
    elite_manifesto: 'La disciplina ya no es algo que haces, es lo que eres. Mantén este estándar.',

    app_slogan: '1 Objetivo, 8 Metas, 0 Excusas',
    library_title: 'Biblioteca',
    library_badge: 'Conocimiento',
    library_desc: 'Lee e integra nuevos hábitos como tu 8va Meta Diaria.',
    accept_challenge: 'Aceptar Reto',
    chart_title: 'Rendimiento (Últimos 7 días)',
    
    // Status Card
    missions_label: 'Misiones',
    status_motivation_default: 'Comienza tus misiones para ganar el día.',
    status_motivation_win: '¡Misiones cumplidas! Gran trabajo hoy.',
    status_motivation_maintain: 'Mantuviste el ritmo. Intenta ir a por más.',
    status_motivation_fail: 'Día bajo. Toca reagruparse y mejorar mañana.',
    
    // Daily Missions Section
    daily_missions_title: 'Misiones Diarias',
    rule_80_badge: 'Regla del 80%',
    
    // Somatic Form
    somatic_title: 'Diario de Rendimiento',
    somatic_badge: 'Estado Físico',
    energy_level: 'Nivel de Energía',
    stress_level: 'Nivel de Estrés / Cansancio',
    day_summary: 'Resumen del Día',
    notes_placeholder: 'Notas sobre tu día, productividad, sueño o alimentación...',
    save_somatic: 'Guardar Estado de Rendimiento',
    
    // Progress Tab
    challenge_180: 'Reto de 180 Días',
    days_logged: 'Días Transcurridos',
    days_left: 'Días Restantes',
    trans_loading: 'Cargando progreso...',
    consistency_month: 'Consistencia del Mes',
    days_won: 'Días Ganados',
    consistency_pct: 'Consistencia',
    consistency_msg: 'Mantén una consistencia sobre el 80% para asegurar el éxito.',
    export_title: 'Historial de Rendimiento',
    export_desc: 'Exporta tu historial de hábitos y estado físico en formato PDF o Excel.',
    export_pdf: 'Exportar PDF',
    export_csv: 'Exportar CSV',
    
    // Settings Modal
    settings_title: 'Ajustar Configuración',
    language_label: 'Idioma / Language',
    sleep_hours: 'Horas de Sueño',
    wake_time: 'Hora Despertar',
    calories: 'Kcal Diarias',
    protein: 'Proteína (g)',
    water: 'Litros Agua',
    social_media: 'Redes (minutos)',
    study_time: 'Estudio (minutos)',
    deep_work: 'Deep Work (horas)',
    save_settings: 'Guardar Configuración',
    backup_title: 'Copia de Seguridad',
    backup_desc: 'Exporta o restaura tus datos manualmente para proteger tu progreso.',
    backup_export: 'Exportar Backup (JSON)',
    backup_import: 'Importar Backup (JSON)',
    
    // History Modal
    history_title: 'Detalle del Día',
    history_missions: 'Misiones',
    history_somatic: 'Estado de Rendimiento',
    history_energy: 'Energía',
    history_stress: 'Estrés',
    history_summary: 'Resumen del Día:',
    
    // Notifications & Alerts
    alert_settings_saved: 'Configuración e idioma guardados correctamente.',
    alert_somatic_saved: '¡Registro de rendimiento guardado!',
    alert_backup_error: 'El archivo JSON no es un backup válido de 180.',
    
    // Mission Definitions
    mission_sleep_title: 'Escudo de Sueño',
    mission_sleep_desc: (h, w) => `Dormir ${h}h, despertar a las ${w} y cero pantallas en la cama.`,
    mission_fuel_title: 'Combustible Limpio',
    mission_fuel_desc: (c, p, w) => `Cumplir ${c} kcal, ${p}g de proteína, ${w}L de agua (cero delivery).`,
    mission_train_title: 'Entrenamiento Híbrido',
    mission_train_desc: () => 'Sesión de fuerza o piscina de acondicionamiento físico.',
    mission_digital_title: 'Cortafuegos Digital',
    mission_digital_desc: (m) => `Menos de ${m} minutos de uso de redes sociales al día.`,
    mission_learning_title: 'Aprendizaje Estratégico',
    mission_learning_desc: (m) => `Mínimo ${m} minutos de estudio de Hospitality English / Coctelería.`,
    mission_work_title: 'Deep Work',
    mission_work_desc: (h) => `Mínimo ${h} hora(s) de trabajo concentrado en mi proyecto o desarrollo web.`,
    mission_toxins_title: 'Cero Toxinas',
    mission_toxins_desc: () => 'Cero consumo de alcohol y cero consumo de tabaco.',
    
    // Weekdays for Calendar
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'],
    
    // Crash Log
    profile_streak: 'Racha Actual',
    profile_total_wins: 'Wins Totales',
    profile_fast_restarts: 'Fast Restarts',
    crash_log_title: '🔥 Crash Log (Fast Restart):',
    crash_log_header: 'Diario de Caídas (Crash Log)',
    crash_log_desc: 'Ayer no lograste completar tus misiones. Reflexiona para lograr un Fast Restart hoy.',
    crash_log_q1: '¿Por qué fallaste ayer?',
    crash_log_q2: '¿Qué harás diferente hoy?',
    crash_log_btn: 'Guardar y Reiniciar',
    
    // Top 3 Tasks
    top_tasks_title: 'Top 3 Tareas',
    top_tasks_badge: 'Requisito WIN',
    tomorrow_tasks_title: 'Mis 3 Tareas de Mañana',
    tomorrow_tasks_hint: 'Define el trabajo profundo. Son obligatorias para ganar el próximo día.',
    task_1_placeholder: 'Tarea 1 (El Cuello de Botella)',
    task_2_placeholder: 'Tarea 2 (Secundaria)',
    task_3_placeholder: 'Tarea 3 (Administrativa)'
  },
  en: {
    loading_date: 'Loading date...',
    gallery_title: 'Weekly Gallery',
    gallery_desc: 'Upload a photo every week to track your visual change (Local).',
    weekly_review_title: 'Weekly Review',
    weekly_review_desc: 'Analysis of your last 7 days.',
    weekly_ai_insight: '💡 Analysis & Insights',
    weekly_ack_btn: 'Got it',
    tab_today: 'Today',
    tab_progress: 'Progress',
    tab_profile: 'Profile',
    tab_library: 'Library',
    tab_elite: 'Elite',
    
    elite_locked_title: 'Classified Level',
    elite_locked_desc: 'Complete 180 days of transformation to unlock Phase 2.',
    elite_unlocked_title: 'Elite Status Reached',
    elite_unlocked_desc: 'You have mastered your biology and mind for 180 days. Phase 2 begins.',
    elite_stats_title: 'Semester Summary',
    elite_total_wins: 'Won Days',
    elite_avg_energy: 'Average Energy',
    elite_manifesto: 'Discipline is no longer what you do, it is who you are. Maintain this standard.',

    app_slogan: '1 Objective, 8 Goals, 0 Excuses',
    library_title: 'Library',
    library_badge: 'Knowledge',
    library_desc: 'Read and integrate new habits as your 8th Daily Goal.',
    accept_challenge: 'Accept Challenge',
    chart_title: 'Performance (Last 7 days)',
    missions_label: 'Missions',
    status_motivation_default: 'Start your missions to win the day.',
    status_motivation_win: 'Missions accomplished! Great job today.',
    status_motivation_maintain: 'You kept the pace. Push harder tomorrow.',
    status_motivation_fail: 'Slow day. Time to regroup and improve tomorrow.',
    daily_missions_title: 'Daily Missions',
    rule_80_badge: '80% Rule',
    somatic_title: 'Performance Journal',
    somatic_badge: 'Physical State',
    energy_level: 'Energy Level',
    stress_level: 'Stress / Fatigue Level',
    day_summary: 'Day Summary',
    notes_placeholder: 'Notes on your day, productivity, sleep or diet...',
    save_somatic: 'Save Performance State',
    challenge_180: '180 Days Challenge',
    days_logged: 'Days Logged',
    days_left: 'Days Remaining',
    trans_loading: 'Loading progress...',
    consistency_month: 'Monthly Consistency',
    days_won: 'Days Won',
    consistency_pct: 'Consistency',
    consistency_msg: 'Keep consistency over 80% to ensure success.',
    export_title: 'Performance History',
    export_desc: 'Export your habits and physical state history to PDF or Excel.',
    export_pdf: 'Export PDF',
    export_csv: 'Export CSV',
    settings_title: 'Adjust Settings',
    language_label: 'Language / Idioma',
    sleep_hours: 'Sleep Hours',
    wake_time: 'Wake Time',
    calories: 'Daily Kcal',
    protein: 'Protein (g)',
    water: 'Water Liters',
    social_media: 'Social Media (mins)',
    study_time: 'Study (mins)',
    deep_work: 'Deep Work (hours)',
    save_settings: 'Save Configuration',
    backup_title: 'Backup',
    backup_desc: 'Manually export or restore your data to protect your progress.',
    backup_export: 'Export Backup (JSON)',
    backup_import: 'Import Backup (JSON)',
    history_title: 'Day Details',
    history_missions: 'Missions',
    history_somatic: 'Performance State',
    history_energy: 'Energy',
    history_stress: 'Stress',
    history_summary: 'Day Summary:',
    alert_settings_saved: 'Settings and language saved successfully.',
    alert_somatic_saved: 'Performance log saved!',
    alert_backup_error: 'The JSON file is not a valid 180 backup.',
    mission_sleep_title: 'Sleep Shield',
    mission_sleep_desc: (h, w) => `Sleep ${h}h, wake up at ${w} and zero screens in bed.`,
    mission_fuel_title: 'Clean Fuel',
    mission_fuel_desc: (c, p, w) => `Hit ${c} kcal, ${p}g protein, ${w}L water (zero delivery).`,
    mission_train_title: 'Hybrid Training',
    mission_train_desc: () => 'Strength session or physical conditioning pool.',
    mission_digital_title: 'Digital Firewall',
    mission_digital_desc: (m) => `Less than ${m} mins of social media usage a day.`,
    mission_learning_title: 'Strategic Learning',
    mission_learning_desc: (m) => `Minimum ${m} mins of Hospitality English / Mixology study.`,
    mission_work_title: 'Deep Work',
    mission_work_desc: (h) => `Minimum ${h} hour(s) of focused work on project or web dev.`,
    mission_toxins_title: 'Zero Toxins',
    mission_toxins_desc: () => 'Zero alcohol consumption and zero tobacco consumption.',
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    
    // Crash Log
    profile_streak: 'Current Streak',
    profile_total_wins: 'Total Wins',
    profile_fast_restarts: 'Fast Restarts',
    crash_log_title: '🔥 Crash Log (Fast Restart):',
    crash_log_header: 'Crash Log',
    crash_log_desc: 'You failed to complete your missions yesterday. Reflect to achieve a Fast Restart today.',
    crash_log_q1: 'Why did you fail yesterday?',
    crash_log_q2: 'What will you do differently today?',
    crash_log_btn: 'Save and Restart',
    
    // Top 3 Tasks
    top_tasks_title: 'Top 3 Tasks',
    top_tasks_badge: 'WIN Req',
    tomorrow_tasks_title: 'My 3 Tasks for Tomorrow',
    tomorrow_tasks_hint: 'Define deep work. Mandatory to win tomorrow.',
    task_1_placeholder: 'Task 1 (Bottleneck)',
    task_2_placeholder: 'Task 2 (Secondary)',
    task_3_placeholder: 'Task 3 (Administrative)'
  },
  ru: {
    loading_date: 'Загрузка даты...',
    gallery_title: 'Галерея',
    gallery_desc: 'Загружайте фото каждую неделю для отслеживания изменений (Локально).',
    weekly_review_title: 'Еженедельный отчет',
    weekly_review_desc: 'Анализ за последние 7 дней.',
    weekly_ai_insight: '💡 Анализ и Выводы',
    weekly_ack_btn: 'Понятно',
    tab_today: 'Сегодня',
    tab_progress: 'Прогресс',
    tab_profile: 'Профиль',
    tab_library: 'Библиотека',
    tab_elite: 'Элита',
    
    elite_locked_title: 'Секретный Уровень',
    elite_locked_desc: 'Пройдите 180 дней трансформации, чтобы открыть Фазу 2.',
    elite_unlocked_title: 'Статус Элита Получен',
    elite_unlocked_desc: 'Вы подчинили себе тело и разум на протяжении 180 дней. Начинается Фаза 2.',
    elite_stats_title: 'Итоги Полугодия',
    elite_total_wins: 'Выигранных Дней',
    elite_avg_energy: 'Средняя Энергия',
    elite_manifesto: 'Дисциплина - это больше не то, что вы делаете, это то, кем вы являетесь. Держите стандарт.',

    app_slogan: '1 Цель, 8 Задач, 0 Оправданий',
    library_title: 'Библиотека',
    library_badge: 'Знания',
    library_desc: 'Читайте и добавляйте новые привычки как 8-ю задачу на день.',
    accept_challenge: 'Принять Вызов',
    chart_title: 'Производительность (Последние 7 дней)',
    missions_label: 'Миссии',
    status_motivation_default: 'Начни свои миссии, чтобы выиграть день.',
    status_motivation_win: 'Миссии выполнены! Отличная работа.',
    status_motivation_maintain: 'Темп сохранен. Постарайся сделать больше.',
    status_motivation_fail: 'Слабый день. Время собраться и стать лучше завтра.',
    daily_missions_title: 'Ежедневные Миссии',
    rule_80_badge: 'Правило 80%',
    somatic_title: 'Журнал Производительности',
    somatic_badge: 'Физическое Состояние',
    energy_level: 'Уровень Энергии',
    stress_level: 'Уровень Стресса / Усталости',
    day_summary: 'Итоги Дня',
    notes_placeholder: 'Заметки о дне, продуктивности, сне или питании...',
    save_somatic: 'Сохранить Состояние',
    challenge_180: 'Челлендж 180 Дней',
    days_logged: 'Дней Прошло',
    days_left: 'Дней Осталось',
    trans_loading: 'Загрузка прогресса...',
    consistency_month: 'Стабильность за Месяц',
    days_won: 'Дней Выиграно',
    consistency_pct: 'Стабильность',
    consistency_msg: 'Держи стабильность выше 80% для гарантии успеха.',
    export_title: 'История Производительности',
    export_desc: 'Экспорт истории привычек и состояния в PDF или Excel.',
    export_pdf: 'Экспорт PDF',
    export_csv: 'Экспорт CSV',
    settings_title: 'Настройки',
    language_label: 'Язык / Language',
    sleep_hours: 'Часы Сна',
    wake_time: 'Время Пробуждения',
    calories: 'Ккал в День',
    protein: 'Белок (г)',
    water: 'Вода (л)',
    social_media: 'Соцсети (мин)',
    study_time: 'Учеба (мин)',
    deep_work: 'Deep Work (часы)',
    save_settings: 'Сохранить Настройки',
    backup_title: 'Резервная Копия',
    backup_desc: 'Экспорт или восстановление данных вручную.',
    backup_export: 'Экспорт (JSON)',
    backup_import: 'Импорт (JSON)',
    history_title: 'Детали Дня',
    history_missions: 'Миссии',
    history_somatic: 'Состояние Производительности',
    history_energy: 'Энергия',
    history_stress: 'Стресс',
    history_summary: 'Итоги Дня:',
    alert_settings_saved: 'Настройки и язык успешно сохранены.',
    alert_somatic_saved: 'Журнал производительности сохранен!',
    alert_backup_error: 'JSON файл не является валидной копией 180.',
    mission_sleep_title: 'Щит Сна',
    mission_sleep_desc: (h, w) => `Спать ${h}ч, подъем в ${w} и ноль экранов в кровати.`,
    mission_fuel_title: 'Чистое Топливо',
    mission_fuel_desc: (c, p, w) => `Норма ${c} ккал, ${p}г белка, ${w}л воды (без доставки).`,
    mission_train_title: 'Гибридная Тренировка',
    mission_train_desc: () => 'Силовая тренировка или плавание для физподготовки.',
    mission_digital_title: 'Цифровой Файрвол',
    mission_digital_desc: (m) => `Менее ${m} минут соцсетей в день.`,
    mission_learning_title: 'Стратегическое Обучение',
    mission_learning_desc: (m) => `Минимум ${m} минут изучения Hospitality English / Миксологии.`,
    mission_work_title: 'Deep Work',
    mission_work_desc: (h) => `Минимум ${h} час(ов) сфокусированной работы над веб-разработкой.`,
    mission_toxins_title: 'Ноль Токсинов',
    mission_toxins_desc: () => 'Полный отказ от алкоголя и курения.',
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    
    // Crash Log
    profile_streak: 'Текущая серия',
    profile_total_wins: 'Всего побед',
    profile_fast_restarts: 'Быстрые старты',
    crash_log_title: '🔥 Crash Log (Быстрый старт):',
    crash_log_header: 'Журнал срывов (Crash Log)',
    crash_log_desc: 'Вчера вы не выполнили задачи. Проанализируйте, чтобы сегодня сделать Быстрый старт.',
    crash_log_q1: 'Почему вы вчера сорвались?',
    crash_log_q2: 'Что вы сделаете иначе сегодня?',
    crash_log_btn: 'Сохранить и начать',
    
    // Top 3 Tasks
    top_tasks_title: 'Топ 3 задачи',
    top_tasks_badge: 'Условие WIN',
    tomorrow_tasks_title: 'Мои 3 задачи на завтра',
    tomorrow_tasks_hint: 'Определите важную работу. Обязательны для победы завтра.',
    task_1_placeholder: 'Задача 1 (Самая важная)',
    task_2_placeholder: 'Задача 2 (Второстепенная)',
    task_3_placeholder: 'Задача 3 (Административная)'
  }
};

let currentLang = localStorage.getItem('appLang') || 'es';

// -------------------------------------------------------------
// 2. ESTADO GLOBAL DE LA APLICACIÓN
// -------------------------------------------------------------
let appGoals = { ...DEFAULT_GOALS };
let appLogs = {}; // Clave: YYYY-MM-DD, Valor: { missions: {}, somatic: {} }
let currentViewDate = new Date(); // Para el calendario mensual
let selectedDigestStatus = 'GOOD'; // Estado del formulario de digestión

// -------------------------------------------------------------
// 3. UTILIDADES DE FECHA (Límite diario: 04:00 AM)
// -------------------------------------------------------------

/**
 * Devuelve la fecha lógica en formato YYYY-MM-DD.
 * Si la hora actual es anterior a las 04:00 AM, cuenta como el día anterior.
 */
function getLogicalDate(date = new Date()) {
  const d = new Date(date);
  const hours = d.getHours();
  
  if (hours < 4) {
    // Restamos un día completo
    d.setDate(d.getDate() - 1);
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Formatea una fecha YYYY-MM-DD en texto legible (ej: "Miércoles, 1 de Julio")
 */
function formatReadableDate(dateString) {
  const parts = dateString.split('-');
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  
  // Usar el locale según el idioma actual
  let locale = 'es-ES';
  if (currentLang === 'en') locale = 'en-US';
  if (currentLang === 'ru') locale = 'ru-RU';
  
  let formatted = date.toLocaleDateString(locale, options);
  // Capitalizar primera letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

// -------------------------------------------------------------
// 3.5 LÓGICA DE MULTI-IDIOMA (i18n)
// -------------------------------------------------------------
function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('appLang', lang);
  updateUILanguage();
  
  // Re-renderizar componentes dinámicos
  renderChecklist(getLogicalDate());
  updateStatusCard(getLogicalDate());
  updateStats();
  renderCalendar();
  
  // Actualizar la fecha del header
  document.getElementById('current-date-text').textContent = formatReadableDate(getLogicalDate());
}

function updateUILanguage() {
  const dict = i18n[currentLang];
  
  // Actualizar todos los elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      // Si es un input/textarea, también podemos querer traducir el placeholder
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        // En nuestro caso solo tenemos un textarea con placeholder
      } else {
        el.childNodes.forEach(child => {
          // Reemplazar solo el texto, manteniendo iconos (SVGs, i tags)
          if (child.nodeType === Node.TEXT_NODE && child.textContent.trim().length > 0) {
            child.textContent = ' ' + dict[key];
          }
        });
        
        // Si no tiene hijos elemento (solo texto), o si falló el reemplazo limpio:
        if (el.children.length === 0) {
          el.textContent = dict[key];
        }
      }
    }
  });
  
  // Casos especiales (placeholders)
  const notesArea = document.getElementById('medical-notes');
  if (notesArea) notesArea.placeholder = dict.notes_placeholder;
}

// -------------------------------------------------------------
// 4. CARGA Y PERSISTENCIA DE DATOS (LocalStorage)
// -------------------------------------------------------------
function loadDataFromStorage() {
  const storedGoals = localStorage.getItem('daily_win_goals');
  const storedLogs = localStorage.getItem('daily_win_logs');
  
  if (storedGoals) {
    appGoals = JSON.parse(storedGoals);
  } else {
    localStorage.setItem('daily_win_goals', JSON.stringify(DEFAULT_GOALS));
  }
  
  if (storedLogs) {
    appLogs = JSON.parse(storedLogs);
  } else {
    appLogs = {};
    localStorage.setItem('daily_win_logs', JSON.stringify({}));
  }
}

function saveLogsToStorage() {
  localStorage.setItem('daily_win_logs', JSON.stringify(appLogs));
}

function saveGoalsToStorage() {
  localStorage.setItem('daily_win_goals', JSON.stringify(appGoals));
}

// Inicializa el día de hoy en el registro si no existe
function initTodayLog(dateKey) {
  if (!appLogs[dateKey]) {
    appLogs[dateKey] = {
      missions: {
        [MISSION_KEYS.sleep_shield]: false,
        [MISSION_KEYS.clean_fuel]: false,
        [MISSION_KEYS.hybrid_training]: false,
        [MISSION_KEYS.digital_firewall]: false,
        [MISSION_KEYS.learning]: false,
        [MISSION_KEYS.deep_work]: false,
        [MISSION_KEYS.toxins]: false
      },
      somatic: {
        energy: 5,
        digestion: 'GOOD',
        pain: 1,
        notes: ''
      },
      bonusMission: {
        id: null,
        status: 'pending', // 'pending', 'accepted', 'rejected'
        rollsLeft: 1,
        completed: false
      }
    };
    saveLogsToStorage();
  } else {
    // Parche por si faltan campos
    if (!appLogs[dateKey].missions) {
      appLogs[dateKey].missions = {};
    }
    Object.values(MISSION_KEYS).forEach(k => {
      if (appLogs[dateKey].missions[k] === undefined) {
        appLogs[dateKey].missions[k] = false;
      }
    });
    if (!appLogs[dateKey].somatic) {
      appLogs[dateKey].somatic = { energy: 5, digestion: 'GOOD', pain: 1, notes: '' };
    }
  }
}

// -------------------------------------------------------------
// 5. CÁLCULO DE PUNTUACIÓN (Regla del 80%)
// -------------------------------------------------------------
function calculateScore(dateKey) {
  if (!appLogs[dateKey] || !appLogs[dateKey].missions) return { completed: 0, status: 'FAIL', pct: 0, total: 7 };
  
  const missions = appLogs[dateKey].missions;
  let completed = 0;
  
  // Count standard missions
  Object.values(MISSION_KEYS).forEach(key => {
    if (missions[key] === true) completed++;
  });
  
  // Count 8th custom mission if it exists
  let totalMissions = 7;
  if (appLogs[dateKey].customMission) {
    totalMissions = 8;
    if (missions['custom_mission'] === true) completed++;
  }
  
  // Count Bonus Mission (Does not increase totalMissions, only completed)
  if (appLogs[dateKey].bonusMission && appLogs[dateKey].bonusMission.status === 'accepted' && appLogs[dateKey].bonusMission.completed) {
    completed++;
  }
  
  // Thresholds based on total missions
  // 7 missions: WIN = 6, MAINTAIN = 5
  // 8 missions: WIN = 7, MAINTAIN = 6
  let status = 'FAIL';
  if (completed >= totalMissions - 1) {
    status = 'WIN';
  } else if (completed === totalMissions - 2) {
    status = 'MAINTAIN';
  }
  
  // Penalización estricta por The ONE Thing / Top Tasks
  const log = appLogs[dateKey];
  let allTasksCompleted = true;
  
  if (log && log.topTasks && log.topTasks.length > 0) {
    // Si hay alguna tarea escrita, verificar si todas están completadas
    const hasTasks = log.topTasks.some(t => t.trim() !== '');
    if (hasTasks) {
      log.topTasks.forEach((t, i) => {
        if (t.trim() !== '') {
          if (!log.topTasksStatus || log.topTasksStatus[i] !== true) {
            allTasksCompleted = false;
          }
        }
      });
      
      if (!allTasksCompleted && status === 'WIN') {
        // Se deniega la victoria si no se ha hecho el trabajo profundo
        status = 'MAINTAIN';
      }
    }
  }
  
  const pct = Math.round((completed / totalMissions) * 100);
  
  const isExtraWin = (completed > totalMissions) && allTasksCompleted;
  return { completed, status, pct, total: totalMissions, isExtraWin };
}

// Calcular racha individual de una misión retrocediendo en el tiempo
function calculateMissionStreak(dateKey, missionKey) {
  let streak = 0;
  let currentDateKey = dateKey;
  
  while (true) {
    const log = appLogs[currentDateKey];
    if (!log || !log.missions) break; // Si no hay log, la racha se corta
    
    // Si la misión no está cumplida este día, se corta la racha
    // Nota: si hoy es el día actual y no está marcada, no cortamos la racha todavía si estamos calculando el "estado actual", pero para misiones sí se corta.
    // Sin embargo, si es HOY y aún no la hemos marcado, no queremos que diga 0 si ayer teníamos 5.
    // Lógica: Si iteramos y llegamos al día de "hoy" (que es dateKey), si es falso pero estamos en el mismo día, podríamos ignorar el fallo del día actual para no castigar hasta que termine el día.
    // Pero lo más estándar es: la racha incluye hoy si está marcado. Si hoy no está marcado, miramos a partir de ayer.
    // Vamos a mirar a partir del día anterior si la de hoy es false, para mantener la racha visual.
    
    let isCompleted = log.missions[missionKey] === true;
    
    if (!isCompleted) {
      if (currentDateKey === dateKey) {
        // Si hoy no está completado, no sumamos, pero seguimos viendo si había racha ayer
      } else {
        // Fallo en un día anterior, se rompe la racha
        break;
      }
    } else {
      streak++;
    }
    
    // Retroceder un día
    const [y, m, d] = currentDateKey.split('-').map(Number);
    const prevDate = new Date(y, m - 1, d);
    prevDate.setDate(prevDate.getDate() - 1);
    currentDateKey = `${prevDate.getFullYear()}-${String(prevDate.getMonth() + 1).padStart(2, '0')}-${String(prevDate.getDate()).padStart(2, '0')}`;
  }
  
  return streak;
}

// -------------------------------------------------------------
// 6. RENDERIZACIÓN DEL FRONTEND
// -------------------------------------------------------------

function renderTopTasks(dateKey) {
  const widget = document.getElementById('top-tasks-widget');
  const container = document.getElementById('top-tasks-list');
  if (!widget || !container) return;
  
  const log = appLogs[dateKey];
  if (!log || !log.topTasks || log.topTasks.length === 0 || log.topTasks.every(t => !t)) {
    widget.style.display = 'none';
    return;
  }
  
  widget.style.display = 'block';
  container.innerHTML = '';
  
  log.topTasks.forEach((taskName, index) => {
    if (!taskName) return; // Skip empty tasks
    
    const isCompleted = log.topTasksStatus && log.topTasksStatus[index] === true;
    
    const card = document.createElement('div');
    card.className = `habit-card top-task-card ${isCompleted ? 'checked' : ''}`;
    
    // Asignar el icono dependiendo del índice para darle más riqueza visual,
    // pero todos relacionados con foco/prioridad.
    const icons = ['target', 'flame', 'zap'];
    const cardIcon = icons[index] || 'target';
    
    // Traducciones
    let priorityLabel = 'Prioridad';
    if (currentLang === 'en') priorityLabel = 'Priority';
    if (currentLang === 'ru') priorityLabel = 'Приоритет';
    
    if (index === 0) {
      if (currentLang === 'en') priorityLabel = 'Bottleneck';
      else if (currentLang === 'ru') priorityLabel = 'Самая важная';
      else priorityLabel = 'Cuello de Botella';
    }
    
    card.innerHTML = `
      <div class="habit-card-left">
        <div class="habit-icon-wrapper">
          <i data-lucide="${cardIcon}"></i>
        </div>
        <div class="habit-info">
          <span class="habit-title">${taskName}</span>
          <span class="habit-description">${priorityLabel} ${index + 1}</span>
        </div>
      </div>
      <div class="checkbox-neon">
        <i data-lucide="check"></i>
      </div>
    `;
    
    card.addEventListener('click', () => {
      if (!appLogs[dateKey].topTasksStatus) {
        appLogs[dateKey].topTasksStatus = [false, false, false];
      }
      appLogs[dateKey].topTasksStatus[index] = !isCompleted;
      saveLogsToStorage();
      renderChecklist(dateKey);
      updateScoreWidget(dateKey);
    });
    
    container.appendChild(card);
  });
}

// Renderiza el checklist de misiones
function renderChecklist(dateKey) {
  renderTopTasks(dateKey);
  
  const container = document.getElementById('checklist-container');
  if (!container) return;
  
  const log = appLogs[dateKey];
  const missions = log.missions;
  const dict = i18n[currentLang];
  
  // Definición visual de misiones con textos parametrizados por las metas y el idioma
  const missionDefs = [
    {
      key: MISSION_KEYS.sleep_shield,
      title: dict.mission_sleep_title,
      desc: dict.mission_sleep_desc(appGoals.sleep_hours, appGoals.wake_time),
      icon: 'moon'
    },
    {
      key: MISSION_KEYS.clean_fuel,
      title: dict.mission_fuel_title,
      desc: dict.mission_fuel_desc(appGoals.calories, appGoals.protein, appGoals.water),
      icon: 'apple'
    },
    {
      key: MISSION_KEYS.hybrid_training,
      title: dict.mission_train_title,
      desc: dict.mission_train_desc(),
      icon: 'dumbbell'
    },
    {
      key: MISSION_KEYS.digital_firewall,
      title: dict.mission_digital_title,
      desc: dict.mission_digital_desc(appGoals.social_media_min),
      icon: 'shield-ban'
    },
    {
      key: MISSION_KEYS.learning,
      title: dict.mission_learning_title,
      desc: dict.mission_learning_desc(appGoals.study_min),
      icon: 'book-open'
    },
    {
      key: MISSION_KEYS.deep_work,
      title: dict.mission_work_title,
      desc: dict.mission_work_desc(appGoals.work_hours),
      icon: 'terminal'
    },
    {
      key: MISSION_KEYS.toxins,
      title: dict.mission_toxins_title,
      desc: dict.mission_toxins_desc(),
      icon: 'ban'
    }
  ];
  
  // Add custom mission if exists
  if (log.customMission) {
    missionDefs.push({
      key: 'custom_mission',
      title: log.customMission.title,
      desc: log.customMission.desc,
      icon: log.customMission.icon || 'star'
    });
  }
  
  container.innerHTML = '';
  
  missionDefs.forEach(def => {
    const isCompleted = missions[def.key] === true;
    const streak = calculateMissionStreak(dateKey, def.key);
    
    let streakTierClass = 'streak-0';
    if (streak > 0 && streak < 10) streakTierClass = 'streak-low';
    else if (streak >= 10 && streak <= 50) streakTierClass = 'streak-mid';
    else if (streak > 50 && streak < 100) streakTierClass = 'streak-high';
    else if (streak >= 100) streakTierClass = 'streak-elite';
    
    const card = document.createElement('div');
    card.className = `habit-card ${isCompleted ? 'checked' : ''}`;
    card.setAttribute('data-key', def.key);
    
    card.innerHTML = `
      <div class="habit-card-left">
        <div class="habit-icon-wrapper">
          <i data-lucide="${def.icon}"></i>
        </div>
        <div class="habit-info">
          <span class="habit-title">${def.title}</span>
          <span class="habit-description">${def.desc}</span>
        </div>
      </div>
      <div class="habit-card-right">
        <div class="mission-streak-badge ${streakTierClass}">
          <svg viewBox="0 0 24 24" class="flame-svg">
            <path d="M12 22C7.58172 22 4 18.4183 4 14C4 8 12 2 12 2C12 2 20 8 20 14C20 18.4183 16.4183 22 12 22Z" fill="currentColor"/>
          </svg>
          ${streak < 100 ? `<span class="streak-number">${streak}</span>` : ''}
        </div>
        <div class="checkbox-neon">
          <i data-lucide="check"></i>
        </div>
      </div>
    `;
    
    // Al hacer clic, alternar estado
    card.addEventListener('click', () => {
      toggleMission(dateKey, def.key);
    });
    
    container.appendChild(card);
  });
  
  // Render Bonus Mission if accepted
  if (log.bonusMission && log.bonusMission.status === 'accepted' && log.bonusMission.id !== null) {
    const bmCard = document.createElement('div');
    const isCompleted = log.bonusMission.completed;
    bmCard.className = `habit-card ${isCompleted ? 'checked' : ''}`;
    bmCard.style.borderColor = isCompleted ? 'var(--color-win-border)' : 'var(--color-primary)';
    
    bmCard.innerHTML = `
      <div class="habit-card-left">
        <div class="habit-icon-wrapper" style="background: rgba(251, 191, 36, 0.15); color: var(--color-primary);">
          <i data-lucide="dices"></i>
        </div>
        <div class="habit-info">
          <span class="habit-title">Misión Bonus (Voluntaria)</span>
          <span class="habit-description">${BONUS_MISSIONS[log.bonusMission.id]}</span>
        </div>
      </div>
      <div class="habit-card-right">
        <div class="checkbox-neon">
          <i data-lucide="check"></i>
        </div>
      </div>
    `;
    
    bmCard.addEventListener('click', toggleBonusMission);
    container.appendChild(bmCard);
  }
  
  // Re-inicializa los iconos de Lucide
  lucide.createIcons();
}

// Alternar el estado de una misión
function toggleMission(dateKey, missionKey) {
  if (!appLogs[dateKey]) return;
  
  const isCompleted = appLogs[dateKey].missions[missionKey];
  appLogs[dateKey].missions[missionKey] = !isCompleted;
  
  // Haptic feedback en Android
  if (navigator.vibrate) {
    navigator.vibrate([15]);
  }
  
  saveLogsToStorage();
  
  // Animaciones y actualización de la vista
  renderChecklist(dateKey);
  updateScoreWidget(dateKey);
}

// Actualizar Widget del Score Diario (Sticky Header)
function updateScoreWidget(dateKey) {
  const { completed, status, pct, total } = calculateScore(dateKey);
  
  // Actualizar barra de progreso
  const progressBar = document.getElementById('sticky-progress-fill');
  if (progressBar) {
    progressBar.style.width = `${pct}%`;
    
    if (status === 'WIN') {
      progressBar.style.backgroundColor = 'var(--color-win)';
    } else if (status === 'MAINTAIN') {
      progressBar.style.backgroundColor = 'var(--color-maintain)';
    } else {
      progressBar.style.backgroundColor = 'var(--color-fail)';
    }
  }
  
  // Actualizar textos
  const fractionEl = document.getElementById('score-fraction');
  if (fractionEl) fractionEl.textContent = `${completed}/${total}`;
  
  const badge = document.getElementById('status-badge');
  const statusCard = document.getElementById('status-card'); // Sticky header container
  
  if (badge && statusCard) {
    const prevStatus = statusCard.dataset.status;
    
    const isExtraWin = completed > total;
    
    if (isExtraWin) {
      badge.textContent = '🌟 EXTRA WIN';
      badge.style.backgroundColor = 'rgba(251, 191, 36, 0.1)'; // Gold neon
      badge.style.borderColor = '#F59E0B';
      badge.style.color = '#F59E0B';
      statusCard.style.borderColor = '#F59E0B';
      statusCard.style.boxShadow = '0 4px 40px rgba(251, 191, 36, 0.2)';
      
      if (prevStatus !== 'EXTRA_WIN') {
        statusCard.classList.remove('extra-win-anim', 'win-anim');
        void statusCard.offsetWidth;
        statusCard.classList.add('extra-win-anim');
      }
      statusCard.dataset.status = 'EXTRA_WIN';
    } else if (status === 'WIN') {
      badge.textContent = '🟢 WIN DAY';
      badge.style.backgroundColor = 'var(--color-win-neon)';
      badge.style.borderColor = 'var(--color-win-border)';
      badge.style.color = 'var(--color-win)';
      statusCard.style.borderColor = 'var(--color-win-border)';
      statusCard.style.boxShadow = '0 4px 30px rgba(16, 185, 129, 0.15)';
      
      if (prevStatus !== 'WIN' && prevStatus !== 'EXTRA_WIN') {
        statusCard.classList.remove('win-anim', 'extra-win-anim');
        void statusCard.offsetWidth;
        statusCard.classList.add('win-anim');
      }
      statusCard.dataset.status = 'WIN';
    } else if (status === 'MAINTAIN') {
      badge.textContent = '🟡 MAINTAIN';
      badge.style.backgroundColor = 'var(--color-maintain-neon)';
      badge.style.borderColor = 'var(--color-maintain-border)';
      badge.style.color = 'var(--color-maintain)';
      statusCard.style.borderColor = 'var(--color-maintain-border)';
      statusCard.style.boxShadow = '0 4px 30px rgba(251, 191, 36, 0.15)';
      statusCard.dataset.status = 'MAINTAIN';
    } else {
      badge.textContent = '🔴 LOSE DAY';
      badge.style.backgroundColor = 'var(--color-fail-neon)';
      badge.style.borderColor = 'var(--color-fail-border)';
      badge.style.color = 'var(--color-fail)';
      statusCard.style.borderColor = 'var(--color-fail-border)';
      statusCard.style.boxShadow = '0 4px 30px rgba(239, 68, 68, 0.15)';
      statusCard.dataset.status = 'FAIL';
    }
    
  }
}

// Rellenar el formulario somático con datos guardados
function fillSomaticForm(dateKey) {
  const log = appLogs[dateKey];
  if (!log || !log.somatic) return;
  
  const somatic = log.somatic;
  
  // Set Sliders
  const energySlider = document.getElementById('energy-slider');
  const energyVal = document.getElementById('energy-val');
  if (energySlider && energyVal) {
    energySlider.value = somatic.energy || 5;
    energyVal.textContent = somatic.energy || 5;
  }
  
  const painSlider = document.getElementById('pain-slider');
  const painVal = document.getElementById('pain-val');
  if (painSlider && painVal) {
    painSlider.value = somatic.pain || 1;
    painVal.textContent = somatic.pain || 1;
  }
  
  // Set Digestion segment control
  selectedDigestStatus = somatic.digestion || 'GOOD';
  updateDigestSegmentUI();
  
  // Set Notes
  const notesText = document.getElementById('medical-notes');
  if (notesText) {
    notesText.value = somatic.notes || '';
  }
  
  // Set Top 3 Tasks for tomorrow
  const tomorrowKey = getTomorrowKey(dateKey);
  const logTomorrow = appLogs[tomorrowKey];
  const t1 = document.getElementById('task-tomorrow-1');
  const t2 = document.getElementById('task-tomorrow-2');
  const t3 = document.getElementById('task-tomorrow-3');
  
  if (t1) t1.value = '';
  if (t2) t2.value = '';
  if (t3) t3.value = '';
  
  if (logTomorrow && logTomorrow.topTasks && logTomorrow.topTasks.length === 3) {
    if (t1) t1.value = logTomorrow.topTasks[0] || '';
    if (t2) t2.value = logTomorrow.topTasks[1] || '';
    if (t3) t3.value = logTomorrow.topTasks[2] || '';
  }
}

function updateDigestSegmentUI() {
  const btnGood = document.getElementById('digest-good');
  const btnBad = document.getElementById('digest-bad');
  
  if (btnGood && btnBad) {
    if (selectedDigestStatus === 'GOOD') {
      btnGood.classList.add('active');
      btnBad.classList.remove('active');
    } else {
      btnGood.classList.remove('active');
      btnBad.classList.add('active');
    }
  }
}

// Guardar el registro Somático
function getTomorrowKey(dateKey) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function saveSomaticLog(dateKey) {
  const log = appLogs[dateKey];
  if (!log) return;
  
  const energy = parseInt(document.getElementById('energy-slider').value);
  const pain = parseInt(document.getElementById('pain-slider').value);
  const notes = document.getElementById('medical-notes').value;
  
  log.somatic = {
    energy: energy,
    digestion: selectedDigestStatus,
    pain: pain,
    notes: notes
  };
  
  // Save Top 3 Tasks for tomorrow
  const t1 = document.getElementById('task-tomorrow-1')?.value.trim();
  const t2 = document.getElementById('task-tomorrow-2')?.value.trim();
  const t3 = document.getElementById('task-tomorrow-3')?.value.trim();
  
  if (t1 || t2 || t3) {
    const tomorrowKey = getTomorrowKey(dateKey);
    // Asegurar que el día de mañana existe en appLogs
    if (!appLogs[tomorrowKey]) {
      appLogs[tomorrowKey] = {
        missions: {},
        somatic: null,
        crashLog: null,
        topTasks: [],
        topTasksStatus: [],
        bonusMission: {
          id: null,
          status: 'pending',
          rollsLeft: 1,
          completed: false
        }
      };
    }
    appLogs[tomorrowKey].topTasks = [t1, t2, t3];
    // Initialize status for each task that is not empty
    appLogs[tomorrowKey].topTasksStatus = [false, false, false];
  }
  
  saveLogsToStorage();
  
  // Feedback visual rápido
  const saveBtn = document.getElementById('save-somatic-btn');
  const originalHTML = saveBtn.innerHTML;
  saveBtn.innerHTML = '<i class="check-lucide" data-lucide="check"></i> ¡Registro Guardado!';
  saveBtn.style.background = 'var(--color-win)';
  saveBtn.style.color = '#000';
  lucide.createIcons();
  
  setTimeout(() => {
    saveBtn.innerHTML = originalHTML;
    saveBtn.style.background = '';
    saveBtn.style.color = '';
    lucide.createIcons();
    
    // Close modal
    const modal = document.getElementById('end-day-modal');
    if (modal) modal.classList.remove('active');
  }, 1200);
}

// -------------------------------------------------------------
// 7. RENDERIZACIÓN DEL CALENDARIO (MAPA DE CALOR)
// -------------------------------------------------------------

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const monthTitle = document.getElementById('calendar-month-title');
  if (!grid || !monthTitle) return;
  
  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  
  let locale = 'es-ES';
  if (currentLang === 'en') locale = 'en-US';
  if (currentLang === 'ru') locale = 'ru-RU';
  
  const monthName = new Date(year, month, 1).toLocaleDateString(locale, { month: 'long' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  
  monthTitle.textContent = `${capitalizedMonth} ${year}`;
  grid.innerHTML = '';
  
  // Render weekdays translated
  const dict = i18n[currentLang];
  const weekdaysContainer = document.querySelector('.calendar-weekdays');
  if (weekdaysContainer) {
    weekdaysContainer.innerHTML = dict.weekdays.map(d => `<div>${d}</div>`).join('');
  }
  
  // Primer día del mes (0 = Domingo, 1 = Lunes, etc.)
  let firstDayIndex = new Date(year, month, 1).getDay();
  // Ajustar para que Lunes sea el primer índice (0 = Lunes, 6 = Domingo)
  firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  
  // Días totales del mes actual y del anterior
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  // Obtener fecha lógica de hoy
  const todayKey = getLogicalDate();
  
  // Renderizar espacios vacíos para días del mes anterior
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day-cell state-empty';
    grid.appendChild(emptyCell);
  }
  
  // Renderizar días del mes actual
  for (let day = 1; day <= totalDays; day++) {
    const dayCell = document.createElement('div');
    dayCell.className = 'calendar-day-cell';
    dayCell.textContent = day;
    
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    
    // Determinar si el día es en el futuro
    const cellDate = new Date(year, month, day);
    const todayLogicalDateParts = todayKey.split('-');
    const todayLogicalCompare = new Date(todayLogicalDateParts[0], todayLogicalDateParts[1] - 1, todayLogicalDateParts[2]);
    
    if (cellDate > todayLogicalCompare) {
      dayCell.classList.add('state-future');
    } else {
      // Tiene registros cargados en LocalStorage?
      const log = appLogs[dateKey];
      if (log) {
        const { status, isExtraWin } = calculateScore(dateKey);
        
        let isFastRestart = false;
        if (isExtraWin) {
          dayCell.classList.add('state-extra-win');
        } else if (status === 'WIN') {
          dayCell.classList.add('state-win');
        } else if (status === 'MAINTAIN') {
          dayCell.classList.add('state-maintain');
        } else {
          dayCell.classList.add('state-fail');
        }
        
        // Fast restart solo importa si hoy es win o extra win
        if (status === 'WIN') {
          const yesterdayKey = getYesterdayKey(dateKey);
          if (appLogs[yesterdayKey]) {
            const yesterdayScore = calculateScore(yesterdayKey).status;
            if (yesterdayScore === 'FAIL' || yesterdayScore === 'MAINTAIN') {
              isFastRestart = true;
            }
          }
        } else if (status === 'MAINTAIN') {
          dayCell.classList.add('state-maintain');
        } else {
          dayCell.classList.add('state-fail');
        }
        
        // Add fast restart badge if applicable
        if (isFastRestart) {
          dayCell.style.position = 'relative';
          dayCell.innerHTML = `${day} <div class="fast-restart-badge">🔥</div>`;
        }
        
        dayCell.addEventListener('click', () => {
          openHistoryModal(dateKey);
        });
      } else {
        // Pasado sin datos
        dayCell.classList.add('state-empty');
        dayCell.addEventListener('click', () => {
          openHistoryModal(dateKey);
        });
      }
    }
    
    grid.appendChild(dayCell);
  }
  
  // Actualizar estadísticas del mes seleccionado
  updateStats(year, month);
}

// Calcular consistencia del mes visible
function updateStats(year, month) {
  let loggedDaysCount = 0;
  let winDaysCount = 0;
  
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const log = appLogs[dateKey];
    
    if (log) {
      loggedDaysCount++;
      const { status } = calculateScore(dateKey);
      if (status === 'WIN') {
        winDaysCount++;
      }
    }
  }
  
  // Calcular porcentaje de consistencia
  const pct = loggedDaysCount > 0 ? Math.round((winDaysCount / loggedDaysCount) * 100) : 0;
  
  document.getElementById('stats-total-wins').textContent = winDaysCount;
  document.getElementById('stats-percentage').textContent = `${pct}%`;
  
  const progressBar = document.getElementById('consistency-progress-bar');
  if (progressBar) {
    progressBar.style.width = `${pct}%`;
    
    // Cambiar color de barra según consistencia del 80%
    if (pct >= 80) {
      progressBar.style.background = 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-win) 100%)';
    } else {
      progressBar.style.background = 'linear-gradient(90deg, var(--color-fail) 0%, var(--color-maintain) 100%)';
    }
  }
  
  // Mensaje motivacional de neurociencia
  const msgText = document.getElementById('stats-message');
  if (msgText) {
    const dict = i18n[currentLang];
    // Usaremos unas traducciones rápidas en línea si preferimos, pero lo mejor es usar un texto general o ponerlo en i18n.
    // Para simplificar sin alterar i18n de nuevo:
    if (pct >= 80) {
      msgText.textContent = (currentLang === 'en') ? `🟢 Optimum consistency (${pct}%). Hitting the 80% mark for your body recomp.` 
        : (currentLang === 'ru') ? `🟢 Оптимальная стабильность (${pct}%). Выполняем норму 80% для перестройки тела.` 
        : `🟢 Consistencia óptima (${pct}%). Estás cumpliendo el objetivo del 80% para tu recomposición corporal y rendimiento diario.`;
      msgText.style.color = 'var(--color-win)';
    } else if (pct > 50) {
      msgText.textContent = (currentLang === 'en') ? `🟡 Intermediate consistency (${pct}%). Push for the 80% to wire the habits.` 
        : (currentLang === 'ru') ? `🟡 Средняя стабильность (${pct}%). Стремитесь к 80%, чтобы закрепить привычку.` 
        : `🟡 Consistencia intermedia (${pct}%). Esfuérzate por ganar más días y alcanzar la franja del 80% para consolidar el hábito en tu cerebro.`;
      msgText.style.color = 'var(--color-maintain)';
    } else {
      msgText.textContent = (currentLang === 'en') ? `🔴 Low consistency (${pct}%). Adjust your environment, avoid doomscrolling and aim to win tomorrow.` 
        : (currentLang === 'ru') ? `🔴 Низкая стабильность (${pct}%). Настрой окружение и выиграй завтрашний день.` 
        : `🔴 Consistencia baja (${pct}%). Ajusta tu entorno, evita el doomscrolling e intenta ganar tu próximo día. Cada victoria pequeña suma.`;
      msgText.style.color = 'var(--color-fail)';
    }
  }
}

// Calcular y actualizar estadísticas del Reto de 180 Días
function update180TransformationStats() {
  const transLogged = document.getElementById('trans-days-logged');
  const transLeft = document.getElementById('trans-days-left');
  const transProgressBar = document.getElementById('trans-progress-bar');
  const transMessage = document.getElementById('trans-message');
  
  if (!transLogged || !transLeft || !transProgressBar || !transMessage) return;
  
  // Contar días únicos registrados en localStorage
  const loggedDays = Object.keys(appLogs).length;
  const remainingDays = Math.max(0, 180 - loggedDays);
  const pct = Math.min(100, Math.round((loggedDays / 180) * 100));
  
  transLogged.textContent = loggedDays;
  transLeft.textContent = remainingDays;
  transProgressBar.style.width = `${pct}%`;
  
  if (loggedDays === 0) {
    transMessage.textContent = (currentLang === 'en') ? 'Start your first log today to begin the 180 days challenge.' 
      : (currentLang === 'ru') ? 'Сделайте первую запись сегодня, чтобы начать 180-дневный челлендж.'
      : 'Comienza tu primer registro hoy para iniciar el reto de 180 días.';
  } else if (remainingDays > 0) {
    transMessage.textContent = (currentLang === 'en') ? `Logged ${loggedDays} day(s). ${remainingDays} day(s) left for your half-year transformation.` 
      : (currentLang === 'ru') ? `Записано ${loggedDays} дн. Осталось ${remainingDays} дн. до конца полугодовой трансформации.`
      : `Llevas ${loggedDays} día${loggedDays > 1 ? 's' : ''} registrados. Quedan ${remainingDays} día${remainingDays > 1 ? 's' : ''} para completar tu transformación de medio año.`;
  } else {
    transMessage.textContent = (currentLang === 'en') ? 'Congratulations! You have successfully completed your 180 days of transformation.' 
      : (currentLang === 'ru') ? 'Поздравляем! Вы успешно завершили 180 дней трансформации.'
      : '¡Enhorabuena! Has completado con éxito tus 180 días de transformación.';
    transProgressBar.style.background = 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-win) 100%)';
  }
  
  // Elite Tab Logic
  const navEliteIcon = document.getElementById('nav-elite-icon');
  const eliteLocked = document.getElementById('elite-locked');
  const eliteUnlocked = document.getElementById('elite-unlocked');
  const eliteDaysRem = document.getElementById('elite-days-remaining');
  
  if (eliteLocked && eliteUnlocked && navEliteIcon) {
    if (loggedDays >= 180) {
      // Unlocked
      navEliteIcon.setAttribute('data-lucide', 'crown');
      document.getElementById('nav-elite').classList.add('unlocked');
      eliteLocked.style.display = 'none';
      eliteUnlocked.style.display = 'flex';
      
      // Calculate Advanced Stats
      let totalWins = 0;
      let totalEnergy = 0;
      let logsWithEnergy = 0;
      
      Object.keys(appLogs).forEach(key => {
        const { status } = calculateScore(key);
        if (status === 'WIN') totalWins++;
        
        const somatic = appLogs[key].somatic;
        if (somatic && somatic.energy) {
          totalEnergy += parseInt(somatic.energy);
          logsWithEnergy++;
        }
      });
      
      document.getElementById('elite-total-wins').textContent = totalWins;
      const avgEnergy = logsWithEnergy > 0 ? (totalEnergy / logsWithEnergy).toFixed(1) : 0;
      document.getElementById('elite-avg-energy').textContent = avgEnergy;
      
    } else {
      // Locked
      navEliteIcon.setAttribute('data-lucide', 'lock');
      document.getElementById('nav-elite').classList.remove('unlocked');
      eliteLocked.style.display = 'flex';
      eliteUnlocked.style.display = 'none';
      if (eliteDaysRem) {
        eliteDaysRem.textContent = `${loggedDays} / 180`;
      }
    }
    lucide.createIcons();
  }
}

// -------------------------------------------------------------
// 8. MODAL DE HISTORIAL DIARIO (DETALLES)
// -------------------------------------------------------------
function openHistoryModal(dateKey) {
  const modal = document.getElementById('history-modal');
  const title = document.getElementById('history-modal-title');
  const badge = document.getElementById('history-status-badge');
  const scoreText = document.getElementById('history-score-text');
  const missionsList = document.getElementById('history-missions-list');
  
  const energyVal = document.getElementById('history-somatic-energy');
  const painVal = document.getElementById('history-somatic-pain');
  const notesText = document.getElementById('history-somatic-notes');
  const editBtn = document.getElementById('edit-history-btn');
  
  if (!modal) return;
  
  // Logic for Edit button
  if (editBtn) {
    editBtn.onclick = () => {
      currentViewDateKey = dateKey; // Set global edit view date
      
      // Force init today log in case they are opening an empty past day
      if (!appLogs[dateKey]) {
        initTodayLog(dateKey);
      }
      
      // Swap to Hoy tab
      document.querySelectorAll('.nav-item').forEach(ni => ni.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      document.querySelector('[data-target="tab-hoy"]').classList.add('active');
      document.getElementById('tab-hoy').classList.add('active');
      
      // Re-render dashboard for this specific date
      document.getElementById('current-date-text').textContent = formatReadableDate(dateKey) + ' (Edit)';
      renderChecklist(dateKey);
      updateScoreWidget(dateKey);
      fillSomaticForm(dateKey);
      
      // Close modal
      modal.classList.remove('active');
    };
  }
  
  title.textContent = formatReadableDate(dateKey);
  
  const dict = i18n[currentLang];
  const log = appLogs[dateKey];
  
  if (!log) {
    // Si no hay datos registrados
    badge.textContent = (currentLang === 'en') ? 'NO DATA' : (currentLang === 'ru') ? 'НЕТ ДАННЫХ' : 'SIN DATOS';
    badge.className = 'status-badge';
    badge.style.backgroundColor = 'rgba(255,255,255,0.05)';
    badge.style.color = 'var(--text-muted)';
    scoreText.textContent = (currentLang === 'en') ? 'No habits or logs for this day.' 
      : (currentLang === 'ru') ? 'Нет записей для этого дня.' 
      : 'No hay hábitos ni reportes médicos para este día.';
    
    missionsList.innerHTML = `<li>${(currentLang === 'en') ? 'No record.' : (currentLang === 'ru') ? 'Нет записей.' : 'Sin registro.'}</li>`;
    energyVal.textContent = '-';
    painVal.textContent = '-';
    notesText.textContent = (currentLang === 'en') ? 'No daily summary.' : (currentLang === 'ru') ? 'Нет итогов дня.' : 'Sin resumen del día.';
  } else {
    const { completed, status, pct, total } = calculateScore(dateKey);
    
    // Configurar Badge
    badge.textContent = status === 'WIN' ? 'WIN DAY' : status === 'MAINTAIN' ? 'MAINTAIN' : 'LOSE DAY';
    badge.className = 'status-badge';
    if (status === 'WIN') {
      badge.style.backgroundColor = 'var(--color-win-neon)';
      badge.style.color = 'var(--color-win)';
    } else if (status === 'MAINTAIN') {
      badge.style.backgroundColor = 'var(--color-maintain-neon)';
      badge.style.color = 'var(--color-maintain)';
    } else {
      badge.style.backgroundColor = 'var(--color-fail-neon)';
      badge.style.color = 'var(--color-fail)';
    }
    
    scoreText.textContent = `${completed} / ${total} ${dict.history_missions}`;
    
    // Cargar Lista de misiones
    missionsList.innerHTML = '';
    
    const missionNames = {
      [MISSION_KEYS.sleep_shield]: dict.mission_sleep_title,
      [MISSION_KEYS.clean_fuel]: dict.mission_fuel_title,
      [MISSION_KEYS.hybrid_training]: dict.mission_train_title,
      [MISSION_KEYS.digital_firewall]: dict.mission_digital_title,
      [MISSION_KEYS.learning]: dict.mission_learning_title,
      [MISSION_KEYS.deep_work]: dict.mission_work_title,
      [MISSION_KEYS.toxins]: dict.mission_toxins_title
    };
    
    Object.keys(missionNames).forEach(key => {
      const done = log.missions[key] === true;
      const li = document.createElement('li');
      li.className = `history-item ${done ? 'done' : 'fail'}`;
      
      let doneText = done ? 'Hecho' : 'No Hecho';
      if (currentLang === 'en') doneText = done ? 'Done' : 'Missed';
      if (currentLang === 'ru') doneText = done ? 'Готово' : 'Пропущено';
      
      li.innerHTML = `
        <i data-lucide="${done ? 'check-circle' : 'circle-dashed'}"></i>
        <span>${missionNames[key]} - ${doneText}</span>
      `;
      missionsList.appendChild(li);
    });
    
    // Cargar Top 3 Tasks
    const topTasksSection = document.getElementById('history-top-tasks-section');
    const topTasksList = document.getElementById('history-top-tasks-list');
    
    if (topTasksSection && topTasksList) {
      if (log.topTasks && log.topTasks.length > 0 && log.topTasks.some(t => t.trim() !== '')) {
        topTasksSection.style.display = 'block';
        topTasksList.innerHTML = '';
        
        log.topTasks.forEach((taskName, index) => {
          if (!taskName.trim()) return;
          const done = log.topTasksStatus && log.topTasksStatus[index] === true;
          
          let doneText = done ? 'Hecho' : 'No Hecho';
          if (currentLang === 'en') doneText = done ? 'Done' : 'Missed';
          if (currentLang === 'ru') doneText = done ? 'Готово' : 'Пропущено';
          
          const li = document.createElement('li');
          li.className = `history-item ${done ? 'done' : 'fail'}`;
          li.innerHTML = `
            <i data-lucide="${done ? 'check-circle' : 'circle-dashed'}"></i>
            <span>${taskName} - ${doneText}</span>
          `;
          topTasksList.appendChild(li);
        });
      } else {
        topTasksSection.style.display = 'none';
      }
    }
    
    // Cargar Datos
    const somatic = log.somatic || {};
    energyVal.textContent = somatic.energy || '-';
    painVal.textContent = somatic.pain || '-';
    
    let noSummaryTxt = 'Sin resumen registrado.';
    if (currentLang === 'en') noSummaryTxt = 'No summary logged.';
    if (currentLang === 'ru') noSummaryTxt = 'Нет итогов.';
    
    notesText.textContent = somatic.notes || noSummaryTxt;
    
    // Crash Log
    const crashContainer = document.getElementById('history-crash-log-container');
    const crashReason = document.getElementById('history-crash-log-reason');
    const crashSolution = document.getElementById('history-crash-log-solution');
    
    if (crashContainer && crashReason && crashSolution) {
      if (log.crashLog) {
        crashContainer.style.display = 'block';
        crashReason.textContent = log.crashLog.reason;
        crashSolution.textContent = log.crashLog.solution;
      } else {
        crashContainer.style.display = 'none';
      }
    }
  }
  
  modal.classList.add('active');
  lucide.createIcons();
}

function closeHistoryModal() {
  document.getElementById('history-modal').classList.remove('active');
}

// -------------------------------------------------------------
// -------------------------------------------------------------
// 8.5 MISIÓN BONUS Y DIARIO RÁPIDO
// -------------------------------------------------------------

function openBonusModal() {
  const modal = document.getElementById('bonus-mission-modal');
  const textEl = document.getElementById('bonus-mission-text');
  const rerollBtn = document.getElementById('reroll-bonus-btn');
  
  const log = appLogs[currentViewDateKey];
  if (!log) return;
  
  if (!log.bonusMission) {
    log.bonusMission = {
      id: null,
      status: 'pending',
      rollsLeft: 1,
      completed: false
    };
    saveLogsToStorage();
  }
  
  const bm = log.bonusMission;

  if (bm.status === 'pending') {
    if (bm.id === null) {
      // Generate first random mission
      bm.id = Math.floor(Math.random() * BONUS_MISSIONS.length);
      saveLogsToStorage();
    }
    textEl.textContent = BONUS_MISSIONS[bm.id];
    rerollBtn.style.display = bm.rollsLeft > 0 ? 'block' : 'none';
  } else if (bm.status === 'accepted') {
    textEl.textContent = `Ya has aceptado esta misión:\n${BONUS_MISSIONS[bm.id]}`;
    rerollBtn.style.display = 'none';
  } else if (bm.status === 'rejected') {
    textEl.textContent = "Rechazaste la misión bonus de hoy.";
    rerollBtn.style.display = 'none';
  }
  
  modal.classList.add('active');
}

function acceptBonusMission() {
  const log = appLogs[currentViewDateKey];
  if (log && log.bonusMission && log.bonusMission.status === 'pending') {
    log.bonusMission.status = 'accepted';
    saveLogsToStorage();
    renderChecklist(currentViewDateKey);
    updateScoreWidget(currentViewDateKey);
    document.getElementById('bonus-mission-modal').classList.remove('active');
  } else {
    document.getElementById('bonus-mission-modal').classList.remove('active');
  }
}

function rerollBonusMission() {
  const log = appLogs[currentViewDateKey];
  if (log && log.bonusMission && log.bonusMission.status === 'pending' && log.bonusMission.rollsLeft > 0) {
    let newId;
    do {
      newId = Math.floor(Math.random() * BONUS_MISSIONS.length);
    } while (newId === log.bonusMission.id && BONUS_MISSIONS.length > 1);
    
    log.bonusMission.id = newId;
    log.bonusMission.rollsLeft--;
    saveLogsToStorage();
    
    const textEl = document.getElementById('bonus-mission-text');
    textEl.textContent = BONUS_MISSIONS[newId];
    document.getElementById('reroll-bonus-btn').style.display = 'none';
  }
}

function rejectBonusMission() {
  const log = appLogs[currentViewDateKey];
  if (log && log.bonusMission && log.bonusMission.status === 'pending') {
    log.bonusMission.status = 'rejected';
    saveLogsToStorage();
    document.getElementById('bonus-mission-modal').classList.remove('active');
  } else {
    document.getElementById('bonus-mission-modal').classList.remove('active');
  }
}

function toggleBonusMission() {
  const log = appLogs[currentViewDateKey];
  if (log && log.bonusMission && log.bonusMission.status === 'accepted') {
    log.bonusMission.completed = !log.bonusMission.completed;
    if (navigator.vibrate) navigator.vibrate([15]);
    saveLogsToStorage();
    renderChecklist(currentViewDateKey);
    updateScoreWidget(currentViewDateKey);
  }
}

function openQuickJournalModal() {
  const modal = document.getElementById('quick-journal-modal');
  const textarea = document.getElementById('quick-notes');
  const log = appLogs[currentViewDateKey];
  
  if (log && log.somatic) {
    textarea.value = log.somatic.notes || '';
  } else {
    textarea.value = '';
  }
  
  modal.classList.add('active');
  textarea.focus();
}

function saveQuickJournal() {
  const log = appLogs[currentViewDateKey];
  if (log) {
    if (!log.somatic) log.somatic = { energy:5, digestion:'GOOD', pain:1, notes:'' };
    const textarea = document.getElementById('quick-notes');
    log.somatic.notes = textarea.value;
    saveLogsToStorage();
    
    // Feedback visual
    const btn = document.getElementById('save-quick-journal-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check"></i> Guardado';
    btn.style.background = 'var(--color-win)';
    btn.style.color = '#000';
    lucide.createIcons();
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      btn.style.color = '';
      lucide.createIcons();
      document.getElementById('quick-journal-modal').classList.remove('active');
    }, 1000);
  }
}

// -------------------------------------------------------------
// 9. MODAL DE CONFIGURACIÓN DE METAS
// -------------------------------------------------------------
function openSettingsModal() {
  const modal = document.getElementById('settings-modal');
  if (!modal) return;
  
  // Rellenar valores actuales
  document.getElementById('goal-sleep-hours').value = appGoals.sleep_hours;
  document.getElementById('goal-wake-time').value = appGoals.wake_time;
  document.getElementById('goal-calories').value = appGoals.calories;
  document.getElementById('goal-protein').value = appGoals.protein;
  document.getElementById('goal-water').value = appGoals.water;
  document.getElementById('goal-social-media').value = appGoals.social_media_min;
  document.getElementById('goal-study-time').value = appGoals.study_min;
  document.getElementById('goal-work-time').value = appGoals.work_hours;
  
  modal.classList.add('active');
}

function closeSettingsModal() {
  document.getElementById('settings-modal').classList.remove('active');
}

function saveSettings(e) {
  e.preventDefault();
  
  appGoals = {
    sleep_hours: parseFloat(document.getElementById('goal-sleep-hours').value),
    wake_time: document.getElementById('goal-wake-time').value,
    calories: parseInt(document.getElementById('goal-calories').value),
    protein: parseInt(document.getElementById('goal-protein').value),
    water: parseFloat(document.getElementById('goal-water').value),
    social_media_min: parseInt(document.getElementById('goal-social-media').value),
    study_min: parseInt(document.getElementById('goal-study-time').value),
    work_hours: parseFloat(document.getElementById('goal-work-time').value)
  };
  
  saveGoalsToStorage();
  
  // Re-renderizar el checklist hoy para mostrar los nuevos objetivos
  const todayKey = getLogicalDate();
  renderChecklist(todayKey);
  
  closeSettingsModal();
}

// -------------------------------------------------------------
// 10. EXPORTADOR DE INFORMES (PDF Y CSV)
// -------------------------------------------------------------

// Exportación a CSV
function exportToCSV() {
  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  let csvContent = 'data:text/csv;charset=utf-8,';
  // Cabeceras
  csvContent += 'Fecha,Puntaje (%),Resultado,Energia,Nivel de Estres,Resumen del Dia\n';
  
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const log = appLogs[dateKey];
    
    if (log) {
      const { status, pct } = calculateScore(dateKey);
      const somatic = log.somatic || {};
      const notesClean = (somatic.notes || '').replace(/"/g, '""'); // Escapar comillas
      
      csvContent += `"${dateKey}","${pct}%","${status}","${somatic.energy || ''}","${somatic.pain || ''}","${notesClean}"\n`;
    }
  }
  
  let locale = 'es-ES';
  if (currentLang === 'en') locale = 'en-US';
  if (currentLang === 'ru') locale = 'ru-RU';
  const monthName = new Date(year, month, 1).toLocaleDateString(locale, { month: 'long' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `180_Reporte_${capitalizedMonth}_${year}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Exportación a PDF usando jsPDF
function exportToPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  
  // Cabecera del Reporte
  doc.setFillColor(18, 18, 21); // Color fondo oscuro
  doc.rect(0, 0, 210, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('180', 14, 22);
  
  doc.setFontSize(10);
  doc.setFont('Helvetica', 'normal');
  doc.text('REPORTE INTEGRAL DE PRODUCTIVIDAD Y RENDIMIENTO', 14, 29);
  
  let locale = 'es-ES';
  if (currentLang === 'en') locale = 'en-US';
  if (currentLang === 'ru') locale = 'ru-RU';
  const monthName = new Date(year, month, 1).toLocaleDateString(locale, { month: 'long' });
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  // Resumen del Mes
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Periodo: ${capitalizedMonth} de ${year}`, 14, 48);
  
  // Calcular consistencia del mes
  let loggedDaysCount = 0;
  let winDays = 0;
  let maintainDays = 0;
  
  const tableData = [];
  
  for (let day = 1; day <= totalDays; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const log = appLogs[dateKey];
    
    if (log) {
      loggedDaysCount++;
      const { status, pct, completed } = calculateScore(dateKey);
      const somatic = log.somatic || {};
      
      if (status === 'WIN') winDays++;
      else if (status === 'MAINTAIN') maintainDays++;
      
      tableData.push([
        dateKey,
        `${completed}/7 (${pct}%)`,
        status,
        somatic.energy || '-',
        somatic.pain || '-',
        somatic.notes || ''
      ]);
    }
  }
  
  const consistency = loggedDaysCount > 0 ? Math.round((winDays / loggedDaysCount) * 100) : 0;
  
  doc.setFont('Helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Días con Registro: ${loggedDaysCount}`, 14, 55);
  doc.text(`Días Ganados (Verdes): ${winDays}`, 14, 60);
  doc.text(`Días de Mantenimiento (Amarillos): ${maintainDays}`, 14, 65);
  
  doc.setFont('Helvetica', 'bold');
  if (consistency >= 80) {
    doc.setTextColor(16, 185, 129); // Verde
  } else {
    doc.setTextColor(239, 68, 68); // Rojo
  }
  doc.text(`Consistencia Acumulada: ${consistency}% (Objetivo: >=80%)`, 14, 72);
  
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(8);
  doc.setFont('Helvetica', 'normal');
  doc.text('*Nota: El nivel de estrés y fatiga se reporta en una escala de 1 (relajado) a 10 (muy estresado).', 14, 80);
  
  // Tabla de Datos
  const dict = i18n[currentLang];
  const tableHeaders = [[
    'Fecha', 
    dict.history_missions, 
    'Estado', 
    dict.history_energy, 
    dict.history_stress, 
    dict.day_summary
  ]];

  doc.autoTable({
    startY: 85,
    head: tableHeaders,
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [30, 41, 59] },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 30 },
      2: { cellWidth: 25 },
      3: { cellWidth: 20 },
      4: { cellWidth: 30 },
      5: { cellWidth: 'auto' }
    },
    styles: { fontSize: 8.5, cellPadding: 2.5 }
  });
  
  // Descarga del Archivo PDF
  doc.save(`Reporte_Rendimiento_180_${capitalizedMonth}_${year}.pdf`);
}

// -------------------------------------------------------------
// 10.5 BACKUP Y RESTAURACIÓN (JSON)
// -------------------------------------------------------------
function exportBackupJSON() {
  const backupData = {
    daily_win_goals: appGoals,
    daily_win_logs: appLogs,
    exportDate: new Date().toISOString()
  };
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  const today = getLogicalDate();
  downloadAnchorNode.setAttribute("download", `180_Backup_${today}.json`);
  document.body.appendChild(downloadAnchorNode); // requerimiento para firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

function handleImportBackup(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const importedData = JSON.parse(e.target.result);
      
      // Validar si el JSON tiene la estructura esperada
      if (importedData.daily_win_logs || importedData.daily_win_goals) {
        if (importedData.daily_win_goals) {
          localStorage.setItem('daily_win_goals', JSON.stringify(importedData.daily_win_goals));
        }
        if (importedData.daily_win_logs) {
          localStorage.setItem('daily_win_logs', JSON.stringify(importedData.daily_win_logs));
        }
        
        alert('Copia de seguridad restaurada con éxito. La aplicación se recargará ahora.');
        window.location.reload();
      } else {
        alert('Error: El archivo seleccionado no parece ser un backup válido de 180.');
      }
    } catch (err) {
      alert('Error leyendo el archivo. Asegúrate de que sea el JSON original del Backup.');
    }
    // Limpiar input para permitir importar el mismo archivo de nuevo si hace falta
    event.target.value = '';
  };
  
  reader.readAsText(file);
}

// -------------------------------------------------------------
// 11. INDEXEDDB PARA FOTOS SEMANALES
// -------------------------------------------------------------
let db;
const DB_NAME = '180_PhotoDB';
const STORE_NAME = 'photos';

function initPhotoDB(callback) {
  const request = indexedDB.open(DB_NAME, 1);
  request.onupgradeneeded = (event) => {
    db = event.target.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    if (callback) callback();
  };
  request.onerror = (event) => {
    console.error('Error IndexedDB:', event.target.error);
  };
}

function savePhoto(base64Data, callback) {
  if (!db) return;
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const photoObj = {
    date: new Date().toISOString(),
    data: base64Data
  };
  const request = store.add(photoObj);
  request.onsuccess = () => { if (callback) callback(); };
}

function deletePhoto(id, callback) {
  if (!db) return;
  const transaction = db.transaction([STORE_NAME], 'readwrite');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.delete(id);
  request.onsuccess = () => { if (callback) callback(); };
}

function loadPhotos(callback) {
  if (!db) return;
  const transaction = db.transaction([STORE_NAME], 'readonly');
  const store = transaction.objectStore(STORE_NAME);
  const request = store.getAll();
  request.onsuccess = (event) => {
    if (callback) callback(event.target.result);
  };
}

function compressImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (event) => {
    const img = new Image();
    img.src = event.target.result;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 600;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
      callback(compressedBase64);
    };
  };
}

function renderPhotoGallery() {
  const grid = document.getElementById('photo-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  loadPhotos((photos) => {
    // Sort by date (oldest first or newest first? Oldest first to show timeline)
    photos.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      
      const img = document.createElement('img');
      img.src = photo.data;
      img.loading = 'lazy';
      
      const badge = document.createElement('div');
      badge.className = 'photo-badge';
      let dict = i18n[currentLang];
      let weekText = dict ? (currentLang === 'en' ? 'Week' : currentLang === 'ru' ? 'Неделя' : 'Semana') : 'Semana';
      badge.textContent = `${weekText} ${index + 1}`;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'photo-delete';
      deleteBtn.innerHTML = '<i data-lucide="trash-2"></i>';
      deleteBtn.onclick = () => {
        let confirmTxt = currentLang === 'en' ? 'Delete photo?' : currentLang === 'ru' ? 'Удалить фото?' : '¿Eliminar foto?';
        if (confirm(confirmTxt)) {
          deletePhoto(photo.id, () => {
            renderPhotoGallery();
          });
        }
      };
      
      card.appendChild(img);
      card.appendChild(badge);
      card.appendChild(deleteBtn);
      grid.appendChild(card);
    });
    lucide.createIcons();
  });
}

// -------------------------------------------------------------
// 12. PERFIL DE USUARIO Y REVISIÓN SEMANAL
// -------------------------------------------------------------
function updateProfileStats() {
  let streak = 0;
  let totalWins = 0;
  let fastRestarts = 0;
  
  const sortedDates = Object.keys(appLogs).sort();
  
  // Calculate total wins & fast restarts
  sortedDates.forEach(dateKey => {
    const { status } = calculateScore(dateKey);
    if (status === 'WIN') {
      totalWins++;
      
      const yesterdayKey = getYesterdayKey(dateKey);
      if (appLogs[yesterdayKey]) {
        const yesterdayScore = calculateScore(yesterdayKey).status;
        if (yesterdayScore === 'FAIL' || yesterdayScore === 'MAINTAIN') {
          fastRestarts++;
        }
      }
    }
  });
  
  // Calculate streak from today backwards
  const today = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    
    if (appLogs[dateKey]) {
      const { status } = calculateScore(dateKey);
      if (status === 'WIN') {
        streak++;
      } else if (status === 'MAINTAIN') {
        // Maintain doesn't break streak but doesn't add to it in some logics. Let's let it maintain it without adding, or just break it.
        // Usually maintain doesn't break the streak.
      } else {
        // FAIL breaks streak
        if (i !== 0) break; // if today is fail, maybe yesterday was win, so streak is broken
      }
    } else {
      if (i !== 0) break; // Missed log breaks streak
    }
  }
  
  const streakEl = document.getElementById('profile-streak');
  const winsEl = document.getElementById('profile-total-wins');
  const restartsEl = document.getElementById('profile-fast-restarts');
  
  if (streakEl) streakEl.textContent = streak;
  if (winsEl) winsEl.textContent = totalWins;
  if (restartsEl) restartsEl.textContent = fastRestarts;
}

function checkWeeklyReview() {
  const today = new Date();
  if (today.getDay() !== 0) return; // 0 is Sunday
  
  // Check if we already showed it today
  const logicalToday = getLogicalDate();
  const lastReview = localStorage.getItem('last_weekly_review');
  if (lastReview === logicalToday) return;
  
  // Calculate last 7 days averages
  let sumEnergy = 0;
  let sumStress = 0;
  let logsCount = 0;
  let fails = 0;
  
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const log = appLogs[dateKey];
    if (log) {
      logsCount++;
      const somatic = log.somatic || {};
      sumEnergy += parseInt(somatic.energy) || 5;
      sumStress += parseInt(somatic.pain) || 1;
      const { status } = calculateScore(dateKey);
      if (status === 'FAIL') fails++;
    }
  }
  
  if (logsCount === 0) return; // Not enough data
  
  const avgEnergy = (sumEnergy / logsCount).toFixed(1);
  const avgStress = (sumStress / logsCount).toFixed(1);
  
  document.getElementById('weekly-avg-energy').textContent = avgEnergy;
  document.getElementById('weekly-avg-stress').textContent = avgStress;
  
  let insight = '';
  if (currentLang === 'en') {
    if (avgStress > 7) insight = 'High stress levels detected this week. Consider lowering intensity and focusing on recovery sleep.';
    else if (fails >= 3) insight = 'Consistency dropped this week. Focus on winning tomorrow to build momentum again.';
    else if (avgEnergy > 7) insight = 'Great energy levels! You are in an optimal state, keep pushing your limits.';
    else insight = 'Balanced week. Maintain the standard and prepare for the next 7 days.';
  } else if (currentLang === 'ru') {
    if (avgStress > 7) insight = 'Высокий уровень стресса на этой неделе. Подумайте о снижении нагрузки и сосредоточьтесь на сне.';
    else if (fails >= 3) insight = 'Стабильность упала. Сосредоточьтесь на победе завтра, чтобы вернуть ритм.';
    else if (avgEnergy > 7) insight = 'Отличный уровень энергии! Вы в оптимальном состоянии, продолжайте в том же духе.';
    else insight = 'Сбалансированная неделя. Поддерживайте стандарт и готовьтесь к следующим 7 дням.';
  } else {
    if (avgStress > 7) insight = 'Niveles altos de estrés esta semana. Considera bajar la intensidad y enfocarte en recuperación y sueño.';
    else if (fails >= 3) insight = 'La consistencia ha bajado esta semana. Enfócate en ganar el día de mañana para recuperar el ritmo.';
    else if (avgEnergy > 7) insight = '¡Excelentes niveles de energía! Estás en un estado óptimo, sigue empujando tus límites.';
    else insight = 'Semana equilibrada. Mantén el estándar y prepárate para los próximos 7 días.';
  }
  
  document.getElementById('weekly-insight-text').textContent = insight;
  
  const modal = document.getElementById('weekly-review-modal');
  if (modal) {
    modal.classList.add('active');
    // Save to prevent showing again today
    localStorage.setItem('last_weekly_review', logicalToday);
  }
}

// -------------------------------------------------------------
// 12.B BIBLIOTECA DE CONOCIMIENTO (8va Misión)
// -------------------------------------------------------------
const LIBRARY_ARTICLES = [
  {
    id: 'lib_meditation',
    icon: 'brain',
    title: { es: 'Meditación Profunda', en: 'Deep Meditation', ru: 'Глубокая Медитация' },
    desc: { es: 'Añade 10 minutos de meditación de atención plena a tu día para bajar los niveles de estrés drásticamente.', en: 'Add 10 mins of mindfulness meditation to your day to drastically reduce stress.', ru: 'Добавьте 10 минут осознанной медитации, чтобы снизить стресс.' }
  },
  {
    id: 'lib_stretching',
    icon: 'activity',
    title: { es: 'Estiramientos Dinámicos', en: 'Dynamic Stretching', ru: 'Динамическая Растяжка' },
    desc: { es: 'Completa 15 minutos de estiramientos o yoga suave para mejorar movilidad y flujo sanguíneo.', en: 'Complete 15 mins of stretching or light yoga to improve mobility and blood flow.', ru: '15 минут растяжки или йоги для улучшения подвижности.' }
  },
  {
    id: 'lib_reading',
    icon: 'book',
    title: { es: 'Lectura Filosófica', en: 'Philosophical Reading', ru: 'Философское Чтение' },
    desc: { es: 'Lee 10 páginas de filosofía estoica o desarrollo personal para fortalecer el mindset.', en: 'Read 10 pages of stoic philosophy or personal growth to strengthen your mindset.', ru: 'Прочитайте 10 страниц философии для укрепления мышления.' }
  }
];

function renderLibrary() {
  const grid = document.getElementById('library-grid');
  if (!grid) return;
  grid.innerHTML = '';
  
  LIBRARY_ARTICLES.forEach(art => {
    const card = document.createElement('div');
    card.className = 'library-card';
    card.innerHTML = `
      <div class="library-card-header">
        <div class="library-icon"><i data-lucide="${art.icon}"></i></div>
        <div style="flex: 1;">
          <h4 class="library-title">${art.title[currentLang] || art.title.es}</h4>
          <p class="library-desc">${art.desc[currentLang] || art.desc.es}</p>
        </div>
      </div>
      <button class="library-btn" id="btn-${art.id}">
        <i data-lucide="plus-circle"></i> <span>${i18n[currentLang].accept_challenge}</span>
      </button>
    `;
    grid.appendChild(card);
    
    // Add logic to accept challenge
    const btn = card.querySelector(`#btn-${art.id}`);
    btn.onclick = () => {
      const today = getLogicalDate();
      if (!appLogs[today]) initTodayLog(today);
      
      appLogs[today].customMission = {
        key: 'custom_mission',
        title: art.title[currentLang] || art.title.es,
        desc: art.desc[currentLang] || art.desc.es,
        icon: art.icon
      };
      appLogs[today].missions['custom_mission'] = false;
      saveLogsToStorage();
      
      btn.innerHTML = `<i data-lucide="check"></i> <span>Aceptado</span>`;
      btn.classList.add('active');
      lucide.createIcons();
      
      // Auto navigate to Hoy
      if (currentViewDateKey === today) {
        renderChecklist(today);
        updateScoreWidget(today);
      }
    };
  });
  lucide.createIcons();
}

// -------------------------------------------------------------
// 12.C GRÁFICO DE RENDIMIENTO (CHART.JS)
// -------------------------------------------------------------
let profileChartInstance = null;

function renderProfileChart() {
  const canvas = document.getElementById('profile-chart');
  if (!canvas) return;
  
  // Get last 7 days data
  const labels = [];
  const energyData = [];
  const stressData = [];
  
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const log = appLogs[dateKey];
    
    // Use short weekday for labels
    labels.push(i18n[currentLang].weekdays[d.getDay() === 0 ? 6 : d.getDay() - 1]);
    
    if (log && log.somatic) {
      energyData.push(log.somatic.energy || 5);
      stressData.push(log.somatic.pain || 1);
    } else {
      energyData.push(0);
      stressData.push(0);
    }
  }
  
  if (profileChartInstance) {
    profileChartInstance.destroy();
  }
  
  const ctx = canvas.getContext('2d');
  profileChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: i18n[currentLang].history_energy,
          data: energyData,
          borderColor: '#10B981', // green
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true
        },
        {
          label: i18n[currentLang].history_stress,
          data: stressData,
          borderColor: '#EF4444', // red
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.4,
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: { color: 'rgba(255, 255, 255, 0.5)', stepSize: 2 },
          grid: { color: 'rgba(255, 255, 255, 0.05)' }
        },
        x: {
          ticks: { color: 'rgba(255, 255, 255, 0.5)' },
          grid: { display: false }
        }
      },
      plugins: {
        legend: {
          labels: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 10, family: "'Inter', sans-serif" } }
        }
      }
    }
  });
}

// -------------------------------------------------------------
// 13. FAST RESTARTS & CRASH LOG
// -------------------------------------------------------------

function getYesterdayKey(todayKey) {
  const [y, m, d] = todayKey.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() - 1);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function checkCrashLog(todayKey) {
  const yesterdayKey = getYesterdayKey(todayKey);
  const logYesterday = appLogs[yesterdayKey];
  
  if (logYesterday) {
    const { status } = calculateScore(yesterdayKey);
    // Si falló o mantuvo, y no tiene crash log, mostrar modal
    if ((status === 'FAIL' || status === 'MAINTAIN') && !logYesterday.crashLog) {
      document.getElementById('crash-log-modal').classList.add('active');
    }
  }
}

document.getElementById('crash-log-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const reason = document.getElementById('crash-reason').value.trim();
  const solution = document.getElementById('crash-solution').value.trim();
  
  if (reason && solution) {
    const todayKey = getLogicalDate();
    const yesterdayKey = getYesterdayKey(todayKey);
    
    if (appLogs[yesterdayKey]) {
      appLogs[yesterdayKey].crashLog = { reason, solution };
      saveDataToStorage();
      
      document.getElementById('crash-log-modal').classList.remove('active');
      document.getElementById('crash-reason').value = '';
      document.getElementById('crash-solution').value = '';
    }
  }
});

// -------------------------------------------------------------
// 14. INICIALIZACIÓN E EVENTOS DE LA APP
// -------------------------------------------------------------
let currentViewDateKey = getLogicalDate(); // Default to today

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializar idioma y aplicar traducciones visuales al DOM
  const langSelector = document.getElementById('app-language');
  if (langSelector) {
    langSelector.value = currentLang;
    langSelector.addEventListener('change', (e) => {
      setLanguage(e.target.value);
    });
  }
  updateUILanguage();

  // 2. Cargar Datos
  loadDataFromStorage();
  
  const todayKey = getLogicalDate();
  initTodayLog(todayKey);
  // 2. Establecer la fecha del encabezado
  if (currentViewDateKey === getLogicalDate()) {
    document.getElementById('current-date-text').textContent = formatReadableDate(currentViewDateKey);
  } else {
    document.getElementById('current-date-text').textContent = formatReadableDate(currentViewDateKey) + ' (Edit)';
  }
  
  // 3. Pintar vista inicial
  renderChecklist(currentViewDateKey);
  updateScoreWidget(currentViewDateKey);
  fillSomaticForm(currentViewDateKey);
  update180TransformationStats();
  
  // 4. Configurar Tab Switcher (Barra de Navegación)
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      // Remover activas
      navItems.forEach(ni => ni.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
      
      // Activar la seleccionada
      item.classList.add('active');
      const targetId = item.getAttribute('data-target');
      document.getElementById(targetId).classList.add('active');
      
      // Si se cambia a Hoy, resetear a hoy si estábamos en Edit Mode
      if (targetId === 'tab-hoy') {
        const today = getLogicalDate();
        if (currentViewDateKey !== today) {
          currentViewDateKey = today;
          document.getElementById('current-date-text').textContent = formatReadableDate(today);
          renderChecklist(today);
          updateScoreWidget(today);
          fillSomaticForm(today);
        }
      }
      
      // Si se cambia a progreso, renderizar calendario y stats de 180 días
      if (targetId === 'tab-progreso') {
        renderCalendar();
        update180TransformationStats();
      }
      
      // Si se cambia a perfil, renderizar stats de perfil, gráfico y galería
      if (targetId === 'tab-perfil') {
        updateProfileStats();
        renderPhotoGallery();
        setTimeout(() => renderProfileChart(), 50); // delay to let container resize
      }
      
      // Si se cambia a biblioteca
      if (targetId === 'tab-biblioteca') {
        renderLibrary();
      }
    });
  });
  
  // (Control de Digestión eliminado de eventos)
  
  // 6. Configurar cambios en Sliders
  const energySlider = document.getElementById('energy-slider');
  const energyVal = document.getElementById('energy-val');
  energySlider.addEventListener('input', () => {
    energyVal.textContent = energySlider.value;
  });
  
  const painSlider = document.getElementById('pain-slider');
  const painVal = document.getElementById('pain-val');
  painSlider.addEventListener('input', () => {
    painVal.textContent = painSlider.value;
  });
  
  // 7. Botón Guardar Registro Somático
  document.getElementById('save-somatic-btn').addEventListener('click', () => {
    saveSomaticLog(currentViewDateKey);
  });
  
  // End Day Modal Listeners
  const openEndDayBtn = document.getElementById('open-end-day-modal-btn');
  if (openEndDayBtn) {
    openEndDayBtn.addEventListener('click', () => {
      document.getElementById('end-day-modal').classList.add('active');
    });
  }
  const closeEndDayBtn = document.getElementById('close-end-day-modal-btn');
  if (closeEndDayBtn) {
    closeEndDayBtn.addEventListener('click', () => {
      document.getElementById('end-day-modal').classList.remove('active');
    });
  }
  
  // Bonus & Journal Listeners
  const openBonusBtn = document.getElementById('open-bonus-mission-btn');
  if (openBonusBtn) openBonusBtn.addEventListener('click', openBonusModal);
  
  document.getElementById('close-bonus-modal-btn')?.addEventListener('click', () => {
    document.getElementById('bonus-mission-modal').classList.remove('active');
  });
  
  document.getElementById('accept-bonus-btn')?.addEventListener('click', acceptBonusMission);
  document.getElementById('reroll-bonus-btn')?.addEventListener('click', rerollBonusMission);
  document.getElementById('reject-bonus-btn')?.addEventListener('click', rejectBonusMission);
  
  const openJournalBtn = document.getElementById('open-quick-journal-btn');
  if (openJournalBtn) openJournalBtn.addEventListener('click', openQuickJournalModal);
  
  document.getElementById('close-quick-journal-btn')?.addEventListener('click', () => {
    document.getElementById('quick-journal-modal').classList.remove('active');
  });
  
  document.getElementById('save-quick-journal-btn')?.addEventListener('click', saveQuickJournal);
  
  // 8. Controles del Calendario (Mes anterior y siguiente)
  document.getElementById('prev-month-btn').addEventListener('click', () => {
    currentViewDate.setMonth(currentViewDate.getMonth() - 1);
    renderCalendar();
  });
  
  document.getElementById('next-month-btn').addEventListener('click', () => {
    currentViewDate.setMonth(currentViewDate.getMonth() + 1);
    renderCalendar();
  });
  
  // 9. Modales de Configuración
  document.getElementById('open-settings-btn').addEventListener('click', openSettingsModal);
  document.getElementById('close-settings-btn').addEventListener('click', closeSettingsModal);
  document.getElementById('settings-form').addEventListener('submit', saveSettings);
  
  // 10. Modales de Historial
  document.getElementById('close-history-btn').addEventListener('click', closeHistoryModal);
  
  // 11. Botones de Exportar Historial
  document.getElementById('export-pdf-btn').addEventListener('click', exportToPDF);
  document.getElementById('export-csv-btn').addEventListener('click', exportToCSV);
  
  // 12. Botones de Backup JSON
  document.getElementById('export-backup-btn').addEventListener('click', exportBackupJSON);
  
  const importBtn = document.getElementById('import-backup-btn');
  const importInput = document.getElementById('import-file-input');
  
  importBtn.addEventListener('click', () => {
    importInput.click();
  });
  
  importInput.addEventListener('change', handleImportBackup);
  
  // 13. Fotos y Perfil
  initPhotoDB(() => {
    // Si la pestaña actual es perfil, cargar galería
    if (document.getElementById('tab-perfil').classList.contains('active')) {
      renderPhotoGallery();
    }
  });

  const uploadPhotoBtn = document.getElementById('upload-photo-btn');
  const photoInput = document.getElementById('photo-upload-input');
  
  if (uploadPhotoBtn && photoInput) {
    uploadPhotoBtn.addEventListener('click', () => {
      photoInput.click();
    });
    
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        compressImage(file, (base64) => {
          savePhoto(base64, () => {
            renderPhotoGallery();
          });
        });
      }
    });
  }
  
  // 14. Weekly Review & Crash Log Check
  checkCrashLog(currentViewDateKey);
  checkWeeklyReview();
  
  document.getElementById('close-weekly-btn').addEventListener('click', () => {
    document.getElementById('weekly-review-modal').classList.remove('active');
  });
  document.getElementById('weekly-review-ack-btn').addEventListener('click', () => {
    document.getElementById('weekly-review-modal').classList.remove('active');
  });
  
  // Inicialización de Iconos Lucide
  lucide.createIcons();
  
  // Registrar Service Worker para soporte Offline/PWA
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then((reg) => console.log('Service Worker registrado con éxito:', reg.scope))
        .catch((err) => console.error('Fallo en el registro del Service Worker:', err));
    });
  }
});
