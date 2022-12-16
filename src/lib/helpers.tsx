import { ThemeObject } from "./types";

export function themeHasBase64Icon(theme: ThemeObject) {
    if (theme.hasOwnProperty("config")) {
      if (theme.config.hasOwnProperty("icon")) {
        let base64Pattern = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
        return theme.config.icon.match(base64Pattern) !== null;
      }
    }
    return false;
}