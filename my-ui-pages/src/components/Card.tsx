import * as React from "react";
import { buildClassName } from "react-tailwind";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={buildClassName(
        "rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({ className, ...props }: CardProps) {
  return (
    <div
      className={buildClassName("p-6 text-sm text-gray-700 dark:text-gray-300", className)}
      {...props}
    />
  );
}
