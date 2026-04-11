import { JSX } from "solid-js"
import styles from "./IconButton.module.css"

type IconButtonProps = {
  icon: JSX.Element
  label?: string
  classList?: Record<string, boolean>
  onMouseDown?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>
}

export function IconButton(props: IconButtonProps) {
  return (
    <button
      type="button"
      class={styles.button}
      classList={props.classList}
      onMouseDown={props.onMouseDown}
    >
      <span class={styles.icon}>{props.icon}</span>
      {props.label && <span>{props.label}</span>}
    </button>
  )
}
