"use client";

import { useEffect, useState } from "react";

const format = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Kolkata",
  hour: "numeric",
  minute: "2-digit",
});

/**
 * "Pune, India · 5:08 PM IST". Lets visitors (and recruiters in other time zones) see
 * what time it is for me. Rendered only after mount, so server and client HTML match.
 */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    // Align updates to the start of each minute.
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <p className={className}>
      Pune, India
      {time && (
        <>
          {" · "}
          <time className="tabular-nums">{time} IST</time>
        </>
      )}
    </p>
  );
}
