"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@workspace/ui/lib/utils";
import { Label } from "@workspace/ui/components/label";

const SwitchToggle = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
SwitchToggle.displayName = SwitchPrimitives.Root.displayName;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    label: string;
    description?: string;
  }
>(({ label, description, ...props }, ref) => (
  <div className="flex space-x-2">
    <SwitchToggle {...props} ref={ref} />
    <div className="flex flex-col gap-1.5">
      <Label className="mt-0.5" htmlFor={props.id}>
        {label}
      </Label>
      {description && (
        <span className="text-sm text-muted-foreground">{description}</span>
      )}
    </div>
  </div>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { SwitchToggle, Switch };
