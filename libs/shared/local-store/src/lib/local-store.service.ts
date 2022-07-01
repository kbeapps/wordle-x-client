export const setData = (key: string, data: string | object) => {
  const jsonData = typeof data === 'string' ? data : JSON.stringify(data);
  localStorage.setItem(key, jsonData);
};

export const getData = (
  key: string,
  isString?: boolean
): object | string | undefined => {
  const data: string | null = localStorage.getItem(key);
  return data ? (isString ? data : JSON.parse(data)) : undefined;
};

export const removeData = (key: string) => {
  localStorage.removeItem(key);
};

export const clearData = () => {
  localStorage.clear();
};
