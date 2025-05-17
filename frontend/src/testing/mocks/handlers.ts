import { inboxHandlers } from "./handlers/inboxHandlers";
import { todayHandlers } from "./handlers/todayHandlers";

export const handlers = [...todayHandlers, ...inboxHandlers];
