import { useState } from 'react'
import { Link } from 'react-router'
import { BodyText, Button, HeadingText } from '@pk-design/react-tailwind'
import ReactTailwindIcon from '../icons/ReactTailwindIcon'
import { LogoText } from '../components/LogoText'
import { CheckIcon, CopyIcon, MoveRightIcon, PaletteIcon, PuzzleIcon, ZapIcon } from 'lucide-react'

export default function HomePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText('pnpm add @pk-design/react-tailwind')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="h-full bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-100 flex flex-col">
      {/* 🚀 Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-8 sm:py-12 overflow-hidden">
        {/* Background Gradients */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex justify-center z-0"
        >
          <div
            className="
            w-[900px] 
            h-[900px] 
            bg-gradient-to-r 
            from-blue-300/20 
            via-blue-300/10 
            to-purple-200/20 
            blur-[100px] 
            rounded-full 
            -translate-y-[55%]
            opacity-70
            dark:from-blue-900/20 
            dark:via-blue-800/10 
            dark:to-purple-900/20
          "
          />
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full text-blue-50 dark:text-blue-900 z-0"
          viewBox="0 0 1440 320"
          fill="currentColor"
        >
          <path d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,138.7C672,149,768,203,864,213.3C960,224,1056,192,1152,165.3C1248,139,1344,117,1392,106.7L1440,96V320H0Z" />
        </svg>

        {/* Title and Description */}
        <div className="max-w-3xl px-6 relative z-10">
          <div className="flex flex-col justify-center items-center mb-6">
            <ReactTailwindIcon className="size-32" />
            <HeadingText.Title>
              <LogoText />
            </HeadingText.Title>
          </div>
          <HeadingText.Title className="text-5xl font-extrabold leading-tight">
            Build Modern Interfaces
            <br />
            Effortlessly with <LogoText />
          </HeadingText.Title>
          <BodyText className="mt-6 text-lg text-gray-600 dark:text-gray-200 leading-relaxed">
            A lightweight and flexible React component library built with Tailwind CSS. Focus on
            your ideas — we'll handle the design system.
          </BodyText>

          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-4 flex-wrap">
            <Button onClick={handleCopy} theme="secondary">
              pnpm add @pk-design/react-tailwind
              {copied ? <CheckIcon className="size-5" /> : <CopyIcon className="size-5" />}
            </Button>
            <Button as={Link} to="/installation">
              Get Started
              <MoveRightIcon className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* 💎 Feature Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center">
        <div>
          <div className="flex items-center justify-center w-full mb-3">
            <ZapIcon className="size-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Fast & Lightweight</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Built for performance and developer experience with minimal dependencies.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-center w-full mb-3">
            <PaletteIcon className="size-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Beautifully Designed</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Pre-styled components that look great out of the box, customizable with Tailwind.
          </p>
        </div>

        <div>
          <div className="flex items-center justify-center w-full mb-3">
            <PuzzleIcon className="size-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-semibold text-xl mb-2">Composable</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Mix and match components easily with predictable, reusable interfaces.
          </p>
        </div>
      </section>
    </div>
  )
}
