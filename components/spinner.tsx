import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Loader } from "lucide-react";

const spinnerVariant = cva(
  "text-muted-foreground animate-spin",
  {
    variants: {
      size: {
        default: "h-4 w-4",
        sm: "h2 w-2",
        lg: "h-6 w-6",
        icon: "h-10 w-10",
      }
    },

    defaultVariants: {
      size: "default"
    }
  }
);

interface SpinnerProps extends VariantProps<typeof spinnerVariant> { }

export function Spinner({ size }: SpinnerProps) {
  return <Loader className={cn(spinnerVariant({ size }))} />
}
