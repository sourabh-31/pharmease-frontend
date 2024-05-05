import dayjs from "dayjs";
import { getTimeOfDay } from "../utils/GetTimeOfDay";

function DateTime() {
  const date = dayjs();
  const today = date.format("D MMMM YYYY");
  const time = date.format("HH:mm:ss");

  const timeOfDay = getTimeOfDay(time);

  return (
    <div className="flex flex-col items-end">
      <div className="flex gap-1 items-center">
        <span className="text-lg">{timeOfDay === "Evening" ? "🌕" : "☀️"}</span>
        <span className="text-lg">Good {timeOfDay && timeOfDay}</span>
      </div>
      <div className="flex gap-2 items-center">
        <span>{today}</span>
        <span className="-mt-2">.</span>
        <span>{time}</span>
      </div>
    </div>
  );
}

export default DateTime;
