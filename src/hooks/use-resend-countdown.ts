import { useCallback, useEffect, useRef, useState } from "react";
import { RESEND_INTERVAL } from "../lib/constants";

interface UseResendCountdownOptions {
  durationMs?: number;
  autoStart?: boolean;
  tickMs?: number;
}

interface UseResendCountdownReturn {
  countdown: number; // seconds remaining
  isDisabled: boolean; // true while counting down
  start: () => void; // (re)start the countdown
  stop: () => void; // stop and enable resend immediately
}

export function useResendCountdown(
  options: UseResendCountdownOptions = {}
): UseResendCountdownReturn {
  const {
    durationMs = RESEND_INTERVAL,
    autoStart = true,
    tickMs = 250,
  } = options;

  const [countdown, setCountdown] = useState<number>(0);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const timerRef = useRef<number | null>(null);
  const endAtRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clearTimer();
    endAtRef.current = null;
    setCountdown(0);
    setIsDisabled(false);
  }, [clearTimer]);

  const tick = useCallback(() => {
    if (endAtRef.current == null) return;
    const remainingMs = endAtRef.current - Date.now();
    const remainingSec = Math.max(0, Math.ceil(remainingMs / 1000));
    setCountdown(remainingSec);
    if (remainingSec === 0) {
      setIsDisabled(false);
      clearTimer();
      endAtRef.current = null;
    }
  }, [clearTimer]);

  const start = useCallback(() => {
    clearTimer();
    endAtRef.current = Date.now() + durationMs;
    setIsDisabled(true);
    // Initialize immediately
    tick();
    timerRef.current = window.setInterval(tick, tickMs);
  }, [clearTimer, durationMs, tick, tickMs]);

  useEffect(() => {
    if (autoStart) {
      start();
    }
    return () => {
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { countdown, isDisabled, start, stop };
}
