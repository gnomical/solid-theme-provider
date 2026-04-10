import { ThemeObject } from "./types"

export function themeHasBase64Icon(theme: ThemeObject) {
  const icon = theme?.config?.icon
  if (typeof icon === "string" && icon.length > 0) {
    const base64Pattern = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    return base64Pattern.test(icon)
  }
  return false
}
