import { JSX } from "solid-js";

export const SYSTEM_THEME_KEY = "stp_system_theme";
export const SYSTEM_THEME_CONFIG_KEY = "system_theme_config";

export const SYSTEM_THEME_ICON = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.9 25.9">
    <path d="M7.95,24.88c-1.56-.68-2.94-1.61-4.13-2.81s-2.13-2.57-2.81-4.13-1.02-3.23-1.02-5,.34-3.43,1.02-5,1.61-2.94,2.81-4.13S6.39,1.69,7.95,1.02c1.56-.68,3.23-1.02,4.99-1.02s3.44,.34,5,1.02c1.57,.68,2.94,1.61,4.13,2.81s2.12,2.57,2.8,4.13c.68,1.56,1.02,3.23,1.02,5s-.34,3.43-1.02,5c-.68,1.56-1.61,2.94-2.8,4.13s-2.57,2.13-4.13,2.81c-1.56,.68-3.23,1.02-5,1.02s-3.43-.34-4.99-1.02ZM12.95,2.16c-1.49,0-2.89,.28-4.2,.83-1.31,.55-2.46,1.33-3.44,2.32-.99,.99-1.76,2.14-2.32,3.44s-.84,2.7-.84,4.2,.28,2.9,.83,4.2c.55,1.3,1.32,2.45,2.31,3.43,.99,.99,2.13,1.76,3.44,2.32,1.31,.56,2.71,.84,4.21,.84V2.16Z" />
  </svg>
);

export const CHEVRON_UP_ICON = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25.45 14.33">
    <path d="M11.73,.44c.27-.29,.61-.44,1-.44,.19,0,.36,.04,.54,.12,.17,.08,.32,.19,.45,.32l11.34,11.6c.26,.25,.4,.57,.4,.95,0,.25-.06,.48-.18,.68s-.28,.36-.48,.48c-.2,.12-.43,.18-.68,.18-.39,0-.71-.13-.95-.38L11.94,2.49h1.57L2.28,13.94c-.23,.25-.55,.38-.95,.38-.25,0-.48-.06-.68-.18s-.36-.28-.48-.48c-.12-.2-.18-.43-.18-.68,0-.19,.03-.36,.1-.53s.17-.31,.29-.42L11.73,.44Z" />
  </svg>
);

// Fallback icons used by ThemeToggle when the active theme has no icon configured.
// These are the moon (dark) and sun (light) icons from the built-in fallback themes.
export const DEFAULT_DARK_ICON = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2v2"/><path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/><path d="M16 12a4 4 0 0 0-4-4"/><path d="m19 5-1.256 1.256"/><path d="M20 12h2"/>
  </svg>
);

export const DEFAULT_LIGHT_ICON = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);
