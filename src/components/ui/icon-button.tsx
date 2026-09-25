"use client";

import clsx from "clsx";
import type { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<"button"> {
  label: string;
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
        "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active
          ? "bg-secondary text-primary shadow-sm"
          : "text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}
