import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { buildClassName } from '@pk-design/react-tailwind'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={buildClassName('relative rounded-lg', className)}>
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-white transition"
        title="Copy to clipboard"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

      <Highlight theme={themes.vsDark} code={code} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="p-4 rounded-lg overflow-auto text-sm font-mono max-h-[450px]"
            style={style}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
