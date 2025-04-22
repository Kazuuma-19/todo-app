import { format, parseISO } from "date-fns";

// PP = "Apr 29, 1453"
export const formatDisplayDate = (dateString: string) => {
  return format(parseISO(dateString), "PP");
};

export const formatDateForInput = (dateString: string) => {
  return format(parseISO(dateString), "yyyy-MM-dd");
};
