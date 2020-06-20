const STORAGE_OPA_ID = 'BO_OPA_ID';
const STORAGE_ROLE = 'BO_ROLE';
const STORAGE_TOKEN = 'BO_AUTH_TOKEN';

export function getUserAuthToken(): string|null {
  return localStorage.getItem(STORAGE_TOKEN);
}

export function getUserOpaId(): number|null {
  const opaId = localStorage.getItem(STORAGE_OPA_ID);
  return opaId ? Number(opaId) : null;
}

export function getUserRole(): string|null {
  return localStorage.getItem(STORAGE_ROLE);
}
