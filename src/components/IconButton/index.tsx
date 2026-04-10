import { JSX } from "solid-js"
import styles from "./IconButton.module.css"

type IconButtonProps = {
  icon: JSX.Element
  label?: string
  classList?: Record<string, boolean>
  onMouseDown?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>
}

export function IconButton(props: IconButtonProps) {
  return (
    <div class={styles.button} classList={props.classList} onMouseDown={props.onMouseDown}>
      <span class={styles.icon}>{props.icon}</span>
      {props.label && <span>{props.label}</span>}
    </div>
  )
}
