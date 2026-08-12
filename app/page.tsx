"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

function Shell({
  title,
  subtitle,
  badge = "Portfolio demo · local-only",
  children,
}: {
  title: string;
  subtitle: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{badge}</p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">{subtitle}</p>
        </header>
        {children}
        <footer className="mt-10 border-t border-zinc-200 pt-4 text-xs text-zinc-500 dark:border-zinc-800">
          Honest demo: no multi-tenant backend. State (if any) stays in this browser.
        </footer>
      </div>
    </div>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition disabled:opacity-50 " +
    className;
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900"
      : variant === "secondary"
        ? "bg-white text-zinc-900 ring-1 ring-zinc-200 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-zinc-100 dark:ring-zinc-700"
        : variant === "danger"
          ? "bg-red-600 text-white hover:bg-red-500"
          : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900";
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950";

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setValue(JSON.parse(raw) as T);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value, ready]);
  return [value, setValue] as const;
}

function uid() {
  return crypto.randomUUID();
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}


export default function Home() {
  const [amount, setAmount] = useState(100);
  const [note, setNote] = useState("Keep shipping demos!");
  const [tips, setTips] = useLocalStorage<{ amount: number; note: string; at: number }[]>("tip-jar-v1", []);
  const total = tips.reduce((a, t) => a + t.amount, 0);
  return (
    <Shell title="Tip Jar" subtitle="Record demo tips without a payment processor.">
      <div className="max-w-md rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="text-sm text-zinc-500">Demo tip jar</div>
        <div className="mt-2 text-3xl font-semibold">฿{total.toLocaleString()}</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {[50, 100, 200, 500].map((a) => (
            <Button key={a} variant={amount === a ? "primary" : "secondary"} onClick={() => setAmount(a)}>฿{a}</Button>
          ))}
        </div>
        <input type="number" className={`${inputClass} mt-3`} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        <input className={`${inputClass} mt-2`} value={note} onChange={(e) => setNote(e.target.value)} />
        <div className="mt-3">
          <Button onClick={() => setTips((p) => [{ amount, note, at: Date.now() }, ...p])}>Record tip (local)</Button>
        </div>
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {tips.map((t, i) => (
          <li key={i} className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-800">฿{t.amount} — {t.note}</li>
        ))}
      </ul>
    </Shell>
  );
}
