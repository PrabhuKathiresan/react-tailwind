import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { PinInput, Button } from '@pk-design/react-tailwind'
import { ShieldCheck, CheckCircle2 } from 'lucide-react'

function PinInputPlayground(props: any) {
  const [pin, setPin] = useState('')
  const [completedPin, setCompletedPin] = useState<string | null>(null)

  return (
    <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 p-6 space-y-4 flex flex-col items-center justify-center text-center">
      <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
        <ShieldCheck className="size-5" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Security Verification</h4>
        <p className="text-xs text-gray-500 mt-0.5">Enter code to complete authorization</p>
      </div>

      <PinInput
        {...props}
        value={pin}
        onChange={setPin}
        onComplete={(val) => setCompletedPin(val)}
      />

      {completedPin ? (
        <div className="w-full p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
          <CheckCircle2 className="size-3.5" />
          <span>Code Verified: {completedPin}</span>
        </div>
      ) : (
        <div className="text-[11px] text-gray-400">
          Current input: {pin ? <strong>{pin}</strong> : 'None'}
        </div>
      )}
    </div>
  )
}

export default function PinInputDocsPage() {
  const [otpVal, setOtpVal] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleVerify = async (code: string) => {
    setIsVerifying(true)
    setErrorMsg(null)
    await new Promise((r) => setTimeout(r, 1000))
    if (code === '123456') {
      setVerified(true)
    } else {
      setErrorMsg('Invalid verification code. Try 123456.')
    }
    setIsVerifying(false)
  }

  const examples = [
    {
      title: '6-Digit SMS OTP Verification with Paste Auto-Fill',
      description:
        'Standard 6-digit OTP verification box. Supports mobile SMS paste auto-fill and onComplete auto-submission.',
      render: (
        <div className="w-full max-w-sm p-5 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800 space-y-3 text-center">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            Enter 6-Digit SMS Code (Try 123456)
          </div>
          <div className="flex justify-center">
            <PinInput
              length={6}
              value={otpVal}
              onChange={setOtpVal}
              onComplete={handleVerify}
              error={errorMsg || undefined}
              size="sm"
            />
          </div>

          {verified && (
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold">
              ✓ SMS Code 123456 Verified!
            </div>
          )}

          <div className="pt-1">
            <Button
              theme="primary"
              size="sm"
              loading={isVerifying}
              disabled={otpVal.length < 6}
              onClick={() => handleVerify(otpVal)}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      ),
      code: `
const [code, setCode] = useState('')

<PinInput
  length={6}
  value={code}
  onChange={setCode}
  onComplete={(val) => submitCode(val)}
/>`,
    },
    {
      title: 'Security Passcode Masking (mask={true})',
      description:
        'Enable mask={true} to replace typed numbers with password dots for security PIN passcodes.',
      render: (
        <div className="w-full max-w-sm p-5 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800 space-y-3 text-center">
          <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">
            Enter 4-Digit Wallet Passcode
          </div>
          <div className="flex justify-center">
            <PinInput length={4} mask={true} size="lg" />
          </div>
        </div>
      ),
      code: `
<PinInput
  length={4}
  mask={true}
  size="lg"
/>`,
    },
    {
      title: 'Error & Disabled States',
      description:
        'Displays red outline styling and secondary error subtext when validation fails.',
      render: (
        <div className="w-full max-w-sm p-5 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800 space-y-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              Error State
            </div>
            <PinInput length={4} value="9999" error="Incorrect PIN entered. 2 attempts left." />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">
              Disabled State
            </div>
            <PinInput length={4} value="1234" disabled={true} />
          </div>
        </div>
      ),
      code: `
<PinInput length={4} value="9999" error="Incorrect PIN entered" />
<PinInput length={4} value="1234" disabled={true} />`,
    },
  ]

  return (
    <DocsPageLayout
      component="PinInput"
      description="A mobile-native 4 to 6-digit PIN and OTP verification input component with auto-focus advancing, SMS paste auto-fill, numeric keypad optimization, and passcode masking options."
      playground={{
        render: (props) => <PinInputPlayground {...props} />,
        initialProps: {
          length: 4,
          mask: false,
          size: 'md',
        },
      }}
      examples={examples}
    />
  )
}
