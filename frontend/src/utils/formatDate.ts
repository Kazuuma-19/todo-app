import { format, parseISO } from "date-fns";

export const formatDateForInput = (dateString: string) => {
  return format(parseISO(dateString), "yyyy-MM-dd");
};
