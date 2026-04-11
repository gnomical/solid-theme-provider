import { ThemeObject } from "./types"

export function themeHasIcon(theme: ThemeObject | undefined): boolean {
  return theme?.config?.icon != null
}
