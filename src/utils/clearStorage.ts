const AUTH_KEYS = ["@finance:token", "@finance:userId"];

export const clearStorage = () => {
  AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
};
