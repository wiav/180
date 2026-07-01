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
  let formatted = date.toLocaleDateString('es-ES', options);
  // Capitalizar primera letra
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
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
  if (!appLogs[dateKey] || !appLogs[dateKey].missions) return { completed: 0, status: 'FAIL', pct: 0 };
  
  const missions = appLogs[dateKey].missions;
  let completed = 0;
  
  Object.values(MISSION_KEYS).forEach(key => {
    if (missions[key] === true) completed++;
  });
  
  // 7 misiones en total
  // 6 o 7 completadas (100% - 85%) -> WIN 🟢
  // 5 completadas (71%) -> MAINTAIN 🟡
  // 4 o menos (<66%) -> FAIL 🔴
  let status = 'FAIL';
  if (completed >= 6) {
    status = 'WIN';
  } else if (completed === 5) {
    status = 'MAINTAIN';
  }
  
  const pct = Math.round((completed / 7) * 100);
  
  return { completed, status, pct };
}

// -------------------------------------------------------------
// 6. RENDERIZACIÓN DEL FRONTEND
// -------------------------------------------------------------

// Renderiza el checklist de misiones
function renderChecklist(dateKey) {
  const container = document.getElementById('checklist-container');
  if (!container) return;
  
  const log = appLogs[dateKey];
  const missions = log.missions;
  
  // Definición visual de misiones con textos parametrizados por las metas
  const missionDefs = [
    {
      key: MISSION_KEYS.sleep_shield,
      title: 'Escudo de Sueño',
      desc: `Dormir ${appGoals.sleep_hours}h, despertar a las ${appGoals.wake_time} y cero pantallas en la cama.`,
      icon: 'moon'
    },
    {
      key: MISSION_KEYS.clean_fuel,
      title: 'Combustible Limpio',
      desc: `Cumplir ${appGoals.calories} kcal, ${appGoals.protein}g de proteína, ${appGoals.water}L de agua (cero delivery).`,
      icon: 'apple'
    },
    {
      key: MISSION_KEYS.hybrid_training,
      title: 'Entrenamiento Híbrido',
      desc: 'Sesión de fuerza o piscina de acondicionamiento físico.',
      icon: 'dumbbell'
    },
    {
      key: MISSION_KEYS.digital_firewall,
      title: 'Cortafuegos Digital',
      desc: `Menos de ${appGoals.social_media_min} minutos de uso de redes sociales al día.`,
      icon: 'shield-ban'
    },
    {
      key: MISSION_KEYS.learning,
      title: 'Aprendizaje Estratégico',
      desc: `Mínimo ${appGoals.study_min} minutos de estudio de Hospitality English / Coctelería.`,
      icon: 'book-open'
    },
    {
      key: MISSION_KEYS.deep_work,
      title: 'Deep Work',
      desc: `Mínimo ${appGoals.work_hours} hora(s) de trabajo concentrado en mi proyecto o desarrollo web.`,
      icon: 'terminal'
    },
    {
      key: MISSION_KEYS.toxins,
      title: 'Cero Toxinas',
      desc: 'Cero consumo de alcohol y cero consumo de tabaco.',
      icon: 'ban'
    }
  ];
  
  container.innerHTML = '';
  
  missionDefs.forEach(def => {
    const isCompleted = missions[def.key] === true;
    
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
      <div class="checkbox-neon">
        <i data-lucide="check"></i>
      </div>
    `;
    
    // Al hacer clic, alternar estado
    card.addEventListener('click', () => {
      toggleMission(dateKey, def.key);
    });
    
    container.appendChild(card);
  });
  
  // Re-inicializa los iconos de Lucide
  lucide.createIcons();
}

// Alternar el estado de una misión
function toggleMission(dateKey, missionKey) {
  if (!appLogs[dateKey]) return;
  
  const isCompleted = appLogs[dateKey].missions[missionKey];
  appLogs[dateKey].missions[missionKey] = !isCompleted;
  
  saveLogsToStorage();
  
  // Animaciones y actualización de la vista
  renderChecklist(dateKey);
  updateScoreWidget(dateKey);
}

// Actualizar Widget del Score Diario (Anillo y Badge)
function updateScoreWidget(dateKey) {
  const { completed, status, pct } = calculateScore(dateKey);
  
  // Actualizar círculo de progreso
  const progressRing = document.getElementById('status-ring-progress');
  if (progressRing) {
    const radius = progressRing.r.baseVal.value;
    const circumference = 2 * Math.PI * radius; // Aprox 263.89
    const offset = circumference - (pct / 100) * circumference;
    progressRing.style.strokeDashoffset = offset;
    
    // Cambiar color de la barra del anillo
    if (status === 'WIN') {
      progressRing.style.stroke = 'var(--color-win)';
    } else if (status === 'MAINTAIN') {
      progressRing.style.stroke = 'var(--color-maintain)';
    } else {
      progressRing.style.stroke = 'var(--color-fail)';
    }
  }
  
  // Actualizar textos
  document.getElementById('score-fraction').textContent = `${completed}/7`;
  
  const badge = document.getElementById('status-badge');
  const motivationText = document.getElementById('status-motivation');
  const statusCard = document.getElementById('status-card');
  
  if (badge && motivationText && statusCard) {
    badge.textContent = status === 'WIN' ? '🟢 WIN DAY' : status === 'MAINTAIN' ? '🟡 MAINTAIN' : '🔴 LOSE DAY';
    
    // Actualizar colores y glow de la tarjeta según el estado
    statusCard.className = 'status-card';
    if (status === 'WIN') {
      badge.style.backgroundColor = 'var(--color-win-neon)';
      badge.style.borderColor = 'var(--color-win-border)';
      badge.style.color = 'var(--color-win)';
      statusCard.style.borderColor = 'var(--color-win-border)';
      statusCard.style.boxShadow = '0 4px 30px rgba(16, 185, 129, 0.15)';
      motivationText.textContent = '¡Estás en modo Win! Has conseguido tu recomposición hoy. Sigue así.';
    } else if (status === 'MAINTAIN') {
      badge.style.backgroundColor = 'var(--color-maintain-neon)';
      badge.style.borderColor = 'var(--color-maintain-border)';
      badge.style.color = 'var(--color-maintain)';
      statusCard.style.borderColor = 'var(--color-maintain-border)';
      statusCard.style.boxShadow = '0 4px 30px rgba(251, 191, 36, 0.15)';
      motivationText.textContent = 'Día de mantenimiento. Estás en la línea correcta, no bajes el estándar.';
    } else {
      badge.style.backgroundColor = 'var(--color-fail-neon)';
      badge.style.borderColor = 'var(--color-fail-border)';
      badge.style.color = 'var(--color-fail)';
      statusCard.style.borderColor = 'var(--color-fail-border)';
      statusCard.style.boxShadow = '0 4px 30px rgba(239, 68, 68, 0.15)';
      motivationText.textContent = 'Día perdido. Ajusta tus acciones para mañana. La neurociencia premia la consistencia.';
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
  }, 2000);
}

// -------------------------------------------------------------
// 7. RENDERIZACIÓN DEL CALENDARIO (MAPA DE CALOR)
// -------------------------------------------------------------

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

function renderCalendar() {
  const grid = document.getElementById('calendar-grid');
  const monthTitle = document.getElementById('calendar-month-title');
  if (!grid || !monthTitle) return;
  
  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth();
  
  monthTitle.textContent = `${MONTH_NAMES[month]} ${year}`;
  grid.innerHTML = '';
  
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
        const { status } = calculateScore(dateKey);
        if (status === 'WIN') dayCell.classList.add('state-win');
        else if (status === 'MAINTAIN') dayCell.classList.add('state-maintain');
        else dayCell.classList.add('state-fail');
        
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
    if (pct >= 80) {
      msgText.textContent = `🟢 Consistencia óptima (${pct}%). Estás cumpliendo el objetivo del 80% para tu recomposición corporal y rendimiento diario.`;
      msgText.style.color = 'var(--color-win)';
    } else if (pct > 50) {
      msgText.textContent = `🟡 Consistencia intermedia (${pct}%). Esfuérzate por ganar más días y alcanzar la franja del 80% para consolidar el hábito en tu cerebro.`;
      msgText.style.color = 'var(--color-maintain)';
    } else {
      msgText.textContent = `🔴 Consistencia baja (${pct}%). Ajusta tu entorno, evita el doomscrolling e intenta ganar tu próximo día. Cada victoria pequeña suma.`;
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
    transMessage.textContent = 'Comienza tu primer registro hoy para iniciar el reto de 180 días.';
  } else if (remainingDays > 0) {
    transMessage.textContent = `Llevas ${loggedDays} día${loggedDays > 1 ? 's' : ''} registrados. Quedan ${remainingDays} día${remainingDays > 1 ? 's' : ''} para completar tu transformación de medio año.`;
  } else {
    transMessage.textContent = '¡Enhorabuena! Has completado con éxito tus 180 días de transformación.';
    transProgressBar.style.background = 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-win) 100%)';
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
  
  if (!modal) return;
  
  title.textContent = formatReadableDate(dateKey);
  
  const log = appLogs[dateKey];
  
  if (!log) {
    // Si no hay datos registrados
    badge.textContent = 'SIN DATOS';
    badge.className = 'status-badge';
    badge.style.backgroundColor = 'rgba(255,255,255,0.05)';
    badge.style.color = 'var(--text-muted)';
    scoreText.textContent = 'No hay hábitos ni reportes médicos para este día.';
    
    missionsList.innerHTML = '<li>Sin registro.</li>';
    energyVal.textContent = '-';
    painVal.textContent = '-';
    notesText.textContent = 'Sin resumen del día.';
  } else {
    const { completed, status, pct } = calculateScore(dateKey);
    
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
    
    scoreText.textContent = `${completed} de 7 misiones completadas (${pct}%)`;
    
    // Cargar Lista de misiones
    missionsList.innerHTML = '';
    
    const missionNames = {
      [MISSION_KEYS.sleep_shield]: 'Escudo de Sueño',
      [MISSION_KEYS.clean_fuel]: 'Combustible Limpio',
      [MISSION_KEYS.hybrid_training]: 'Entrenamiento Híbrido',
      [MISSION_KEYS.digital_firewall]: 'Cortafuegos Digital',
      [MISSION_KEYS.learning]: 'Aprendizaje Estratégico',
      [MISSION_KEYS.deep_work]: 'Deep Work',
      [MISSION_KEYS.toxins]: 'Cero Toxinas'
    };
    
    Object.keys(missionNames).forEach(key => {
      const done = log.missions[key] === true;
      const li = document.createElement('li');
      li.className = `history-item ${done ? 'done' : 'fail'}`;
      li.innerHTML = `
        <i data-lucide="${done ? 'check-circle' : 'circle-dashed'}"></i>
        <span>${missionNames[key]} - ${done ? 'Hecho' : 'No Hecho'}</span>
      `;
      missionsList.appendChild(li);
    });
    
    // Cargar Datos
    const somatic = log.somatic || {};
    energyVal.textContent = somatic.energy || '-';
    painVal.textContent = somatic.pain || '-';
    notesText.textContent = somatic.notes || 'Sin resumen registrado.';
  }
  
  modal.classList.add('active');
  lucide.createIcons();
}

function closeHistoryModal() {
  document.getElementById('history-modal').classList.remove('active');
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
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `180_Reporte_${MONTH_NAMES[month]}_${year}.csv`);
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
  
  // Resumen del Mes
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('Helvetica', 'bold');
  doc.text(`Periodo: ${MONTH_NAMES[month]} de ${year}`, 14, 48);
  
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
  doc.autoTable({
    startY: 85,
    head: [['Fecha', 'Misiones', 'Estado', 'Energía', 'Estrés / Fatiga', 'Resumen del Día']],
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
  doc.save(`Reporte_Rendimiento_180_${MONTH_NAMES[month]}_${year}.pdf`);
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
// 11. INICIALIZACIÓN E EVENTOS DE LA APP
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar Datos
  loadDataFromStorage();
  
  const todayKey = getLogicalDate();
  initTodayLog(todayKey);
  
  // 2. Establecer la fecha del encabezado
  document.getElementById('current-date-text').textContent = formatReadableDate(todayKey);
  
  // 3. Pintar vista inicial
  renderChecklist(todayKey);
  updateScoreWidget(todayKey);
  fillSomaticForm(todayKey);
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
      
      // Si se cambia a progreso, renderizar calendario y stats de 180 días
      if (targetId === 'tab-progreso') {
        renderCalendar();
        update180TransformationStats();
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
    saveSomaticLog(todayKey);
  });
  
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
