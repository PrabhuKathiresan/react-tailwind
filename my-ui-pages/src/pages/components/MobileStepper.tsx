import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { MobileStepper } from '@pk-design/react-tailwind'

function MobileStepperPlayground(props: any) {
  const [activeStep, setActiveStep] = useState(0)
  const totalSteps = 4

  const stepTitles = [
    'Shipping Address',
    'Delivery Options',
    'Payment Method',
    'Order Confirmation',
  ]

  return (
    <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 p-4 space-y-4 text-center">
      <MobileStepper
        {...props}
        steps={totalSteps}
        activeStep={activeStep}
        stepTitle={stepTitles[activeStep]}
        onBack={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
        onNext={() => setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1))}
        nextLabel={activeStep === totalSteps - 1 ? 'Place Order' : 'Next'}
      />

      <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-[var(--ui-border)] min-h-[100px] flex flex-col items-center justify-center text-xs space-y-1">
        <div className="font-bold text-gray-900 dark:text-white">
          Step {activeStep + 1}: {stepTitles[activeStep]}
        </div>
        <div className="text-gray-500">
          Form step content container area for mobile checkout flow
        </div>
      </div>
    </div>
  )
}

export default function MobileStepperDocsPage() {
  const [dotsStep, setDotsStep] = useState(0)
  const [progressStep, setProgressStep] = useState(1)
  const [textStep, setTextStep] = useState(2)

  const examples = [
    {
      title: 'iOS Style Dots Stepper (variant="dots")',
      description:
        'Standard mobile page dots indicator. Active dot expands and highlights active step progress.',
      render: (
        <div className="w-full max-w-sm p-4 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800">
          <MobileStepper
            steps={5}
            activeStep={dotsStep}
            variant="dots"
            stepTitle="Account Setup"
            onBack={() => setDotsStep((s) => Math.max(s - 1, 0))}
            onNext={() => setDotsStep((s) => Math.min(s + 1, 4))}
            nextLabel={dotsStep === 4 ? 'Finish' : 'Next'}
          />
        </div>
      ),
      code: `
<MobileStepper
  steps={5}
  activeStep={activeStep}
  variant="dots"
  stepTitle="Account Setup"
  onBack={() => setStep(s => s - 1)}
  onNext={() => setStep(s => s + 1)}
/>`,
    },
    {
      title: 'Progress Bar Stepper (variant="progress")',
      description:
        'Renders a smooth horizontal percentage progress track, ideal for longer multi-step surveys and forms.',
      render: (
        <div className="w-full max-w-sm p-4 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800">
          <MobileStepper
            steps={6}
            activeStep={progressStep}
            variant="progress"
            stepTitle="Customer Onboarding"
            onBack={() => setProgressStep((s) => Math.max(s - 1, 0))}
            onNext={() => setProgressStep((s) => Math.min(s + 1, 5))}
          />
        </div>
      ),
      code: `
<MobileStepper
  steps={6}
  activeStep={activeStep}
  variant="progress"
  stepTitle="Customer Onboarding"
/>`,
    },
    {
      title: 'Compact Step Text Stepper (variant="text")',
      description:
        'Displays compact "Step X of Y" text indicator, perfect for tight mobile spaces.',
      render: (
        <div className="w-full max-w-sm p-4 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800">
          <MobileStepper
            steps={4}
            activeStep={textStep}
            variant="text"
            stepTitle="Verify Identification"
            onBack={() => setTextStep((s) => Math.max(s - 1, 0))}
            onNext={() => setTextStep((s) => Math.min(s + 1, 3))}
            nextLabel={textStep === 3 ? 'Submit' : 'Continue'}
          />
        </div>
      ),
      code: `
<MobileStepper
  steps={4}
  activeStep={activeStep}
  variant="text"
  stepTitle="Verify Identification"
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="MobileStepper"
      description="A mobile-native multi-step wizard progress bar designed to display step progress on small screens using dots, progress bars, or compact step text counters with built-in Back/Next navigation buttons."
      playground={{
        render: (props) => <MobileStepperPlayground {...props} />,
        initialProps: {
          variant: 'dots',
        },
      }}
      examples={examples}
    />
  )
}
