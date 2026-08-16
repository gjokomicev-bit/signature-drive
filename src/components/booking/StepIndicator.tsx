export interface WizardStep {
  label: string;
}

export function StepIndicator({ steps, currentStep }: { steps: WizardStep[]; currentStep: number }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {steps.map((step, index) => (
        <div key={step.label} className="flex shrink-0 items-center gap-2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs ${
              index === currentStep
                ? "border-accent bg-accent text-accent-foreground"
                : index < currentStep
                  ? "border-accent text-accent"
                  : "border-border-subtle text-foreground/40"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`hidden text-xs uppercase tracking-[0.1em] sm:block ${
              index === currentStep ? "text-foreground" : "text-foreground/40"
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && <div className="h-px w-4 bg-border-subtle sm:w-8" />}
        </div>
      ))}
    </div>
  );
}
