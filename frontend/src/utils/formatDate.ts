import { format, parseISO } from "date-fns";

export const formatDate = (dateString: string) => {
  return format(parseISO(dateString), "yyyy-MM-dd");
};

export const addTimeToDateString = (dateString: string) => {
  return `${dateString}T00:00:00`;
};
