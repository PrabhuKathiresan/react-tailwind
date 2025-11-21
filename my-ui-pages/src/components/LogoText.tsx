import { buildClassName } from '@pk-design/react-tailwind'

export function LogoText({ className }: { className?: string }) {
  return (
    <span
      className={buildClassName(
        'bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent',
        className,
      )}
    >
      React-Tailwind
    </span>
  )
}
