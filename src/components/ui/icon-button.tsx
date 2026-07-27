"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  /** Tooltip and accessible name — icon-only buttons have no text of their own. */
  label: string;
  /** Omit for plain actions; pass a boolean to expose the button as a toggle. */
  active?: boolean;
}

export function IconButton({
  label,
  active,
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={clsx(
        "shrink-0 rounded-md p-1.5 transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
