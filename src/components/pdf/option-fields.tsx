"use client";

import { useId } from "react";
import type { Choice } from "@/lib/pdf-options";

/** A row of mutually exclusive options, backed by real radio inputs. */
export function SegmentedField<T extends string>({
  label,
  value,
  choices,
  onChange,
}: {
  label: string;
  value: T;
  choices: Choice<T>[];
  onChange: (value: T) => void;
}) {
  const name = useId();

  return (
    <fieldset>
      <legend className="mb-1.5 text-xs font-medium text-muted-foreground">
        {label}
      </legend>
      <div className="flex gap-1 rounded-lg bg-muted p-1">
        {choices.map((choice) => (
          <label key={choice.value} className="flex-1">
            <input
              type="radio"
              name={name}
              value={choice.value}
              checked={value === choice.value}
              onChange={() => onChange(choice.value)}
              className="peer sr-only"
            />
            <span
              className="block cursor-pointer rounded-md px-2 py-1.5 text-center text-sm transition-colors hover:text-foreground peer-checked:bg-background peer-checked:font-medium peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring text-muted-foreground"
            >
              {choice.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** An on/off setting rendered as a switch. */
export function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4">
      <span className="min-w-0">
        <span className="block text-sm">{label}</span>
        <span className="block text-xs text-muted-foreground">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className="relative mt-0.5 h-5 w-9 shrink-0 rounded-full bg-border transition-colors after:absolute after:top-0.5 after:left-0.5 after:size-4 after:rounded-full after:bg-white after:shadow-sm after:transition-transform peer-checked:bg-primary peer-checked:after:translate-x-4 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring"
      />
    </label>
  );
}
