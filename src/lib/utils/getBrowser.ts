import { useImageGeneratorStore } from "@/lib/store/imageGenerator.store";
import { Browser } from "../types/Browser";

const getBrowser = (): Browser => {
  const userAgent =
    typeof window !== "undefined" ? window.navigator.userAgent : "";

  if (userAgent.includes("Firefox") && !userAgent.includes("Seamonkey")) {
    return "FIREFOX";
  }
  if (userAgent.includes("Seamonkey")) {
    return "SEAMONKEY";
  }
  if (userAgent.includes("Chrome") && !userAgent.includes("Chromium")) {
    return "CHROME";
  }
  if (userAgent.includes("Chromium")) {
    return "CHROMIUM";
  }
  if (userAgent.includes("OPR")) {
    return "OPERA-BLINK";
  }
  if (userAgent.includes("Opera")) {
    return "OPERA-PRESTO";
  }
  if (
    userAgent.includes("Safari") &&
    !userAgent.includes("Chrome") &&
    !userAgent.includes("Chromium")
  ) {
    return "SAFARI";
  }
  if (userAgent.includes("Trident") && userAgent.includes("rv:")) {
    return "IE11";
  }
  if (userAgent.includes("MSIE")) {
    return "IE10";
  }
  return "UNKNOWN";
};

const isBrowser = (targetBrowser: Browser) => {
  const browser = useImageGeneratorStore.getState().general.browser;
  return browser === targetBrowser;
};

const isFirefox = () => isBrowser("FIREFOX");
const isSeamonkey = () => isBrowser("SEAMONKEY");
const isChrome = () => isBrowser("CHROME");
const isChromium = () => isBrowser("CHROMIUM");
const isOperaBlink = () => isBrowser("OPERA-BLINK");
const isOperaPresto = () => isBrowser("OPERA-PRESTO");
const isSafari = () => isBrowser("SAFARI");
const isIE11 = () => isBrowser("IE11");
const isIE10 = () => isBrowser("IE10");

export {
  getBrowser,
  isChrome,
  isChromium,
  isFirefox,
  isIE10,
  isIE11,
  isOperaBlink,
  isOperaPresto,
  isSafari,
  isSeamonkey,
};
