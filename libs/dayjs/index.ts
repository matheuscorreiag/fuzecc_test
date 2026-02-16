import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import isTomorrow from "dayjs/plugin/isTomorrow";
import "dayjs/locale/pt-br";

dayjs.extend(isToday);
dayjs.extend(isTomorrow);
dayjs.locale("pt-br");

export { dayjs };
