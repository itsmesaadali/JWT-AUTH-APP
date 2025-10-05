// utils/sessionUtils.ts

import {UAParser} from "ua-parser-js";

export function parseUserAgent(ua: string | undefined): UAParser.IResult | null {
  if (!ua) return null;
  return UAParser(ua);
}

export function getBrowserInfo(userAgentInfo: UAParser.IResult | null): string {
  if (!userAgentInfo) return "Unknown Device";
  if (!userAgentInfo.browser.name && !userAgentInfo.os.name)
    return "Unknown Device";

  if (!userAgentInfo.browser.name) return userAgentInfo.os.name ?? "Unknown";
  if (!userAgentInfo.os.name) return userAgentInfo.browser.name ?? "Unknown";

  return `${userAgentInfo.browser.name}, ${userAgentInfo.os.name}`;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function getDeviceType(userAgentInfo: UAParser.IResult | null): "mobile" | "tablet" | "desktop" {
  return userAgentInfo?.device?.type === "tablet" 
    ? "tablet" 
    : userAgentInfo?.device?.type === "mobile" 
    ? "mobile" 
    : "desktop";
}