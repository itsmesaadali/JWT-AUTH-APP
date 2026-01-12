"use client";

export function FormattedDate({ timestamp }: { timestamp: number }) {
  return <>{new Date(timestamp).toLocaleDateString()}</>;
}
