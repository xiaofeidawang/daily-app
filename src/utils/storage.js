const STORAGE_KEY = 'daily-app-data';

function getAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveAll(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getItem(key, defaultValue = null) {
  const data = getAll();
  return data[key] !== undefined ? data[key] : defaultValue;
}

export function setItem(key, value) {
  const data = getAll();
  data[key] = value;
  saveAll(data);
}

export function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
