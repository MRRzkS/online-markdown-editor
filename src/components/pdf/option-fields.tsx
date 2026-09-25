"use client";

import { useId } from "react";
import type { Choice } from "@/lib/pdf-options";

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
      <legend className="mb-2 text-xs font-semibold text-foreground/72">
        {label}
      </legend>
      <div className="flex gap-1 rounded-[14px] border border-foreground/[0.07] bg-foreground/[0.035] p-1">
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
            <span className="flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] px-2 text-center text-xs font-medium text-muted-foreground transition-all hover:text-foreground peer-checked:bg-secondary peer-checked:text-primary peer-checked:shadow-sm peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring">
              {choice.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

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
    <label className="flex min-h-11 cursor-pointer items-center justify-between gap-4">
      <span className="min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">
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
        className="relative h-7 w-12 shrink-0 rounded-full border border-foreground/[0.08] bg-foreground/[0.08] transition-colors after:absolute after:left-[3px] after:top-[3px] after:size-5 after:rounded-full after:bg-secondary after:shadow-sm after:transition-transform peer-checked:bg-accent-strong peer-checked:after:translate-x-5 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring"
      />
    </label>
  );
}
