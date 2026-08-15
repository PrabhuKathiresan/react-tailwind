import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Copy, Check } from 'lucide-react'
import { buildClassName } from '@pk-design/react-tailwind'

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
}

const languageLabel: Record<string, string> = {
  tsx: 'TSX',
  ts: 'TS',
  jsx: 'JSX',
  js: 'JS',
  bash: 'bash',
  shell: 'shell',
  css: 'CSS',
  json: 'JSON',
}

export function CodeBlock({ code, language = 'tsx', className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const label = languageLabel[language] ?? language.toUpperCase()

  return (
    <div className={buildClassName('relative rounded-lg', className)}>
      {/* Language label + copy button */}
      <div className="absolute top-2 right-2 flex items-center gap-2">
        <span className="text-[11px] font-mono text-gray-400 select-none">{label}</span>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="p-1.5 text-gray-400 hover:text-white transition"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-emerald-400 transition-transform scale-110" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>

      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="p-4 pr-20 rounded-lg overflow-auto text-sm font-mono max-h-[450px]"
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
