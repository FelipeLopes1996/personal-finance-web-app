export const formatters = {
  formatDateBR: (date: string) => {
    if (!date) return "";

    const [year, month, day] = date.split("-");

    return `${day}/${month}/${year}`;
  },
};
