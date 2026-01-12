export const parseJwt = (token: string | null): any => {
  if (!token) return null;

  const payload = token.split('.')[1]; // беремо другий сегмент
  const decoded = atob(payload); // base64 → строка
  return JSON.parse(decoded); // перетворюємо на об'єкт
}
