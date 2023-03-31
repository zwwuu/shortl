import { useEffect, useState } from "react";

export default function useLocalTime(dateTime: Date) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const local = dateTime.toLocaleString();
    setTime(local);
  }, [dateTime]);

  return time;
}
