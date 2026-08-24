import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { WheelPicker } from '@pk-design/react-tailwind'
import { Calendar, Clock, Scale } from 'lucide-react'

const MONTH_MAP: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
}

function getDaysInMonth(monthStr: string, yearNum: number) {
  const mIndex = MONTH_MAP[monthStr] ?? 0
  return new Date(yearNum, mIndex + 1, 0).getDate()
}

function WheelPickerPlayground(props: any) {
  const [selectedValues, setSelectedValues] = useState<Record<string, string | number>>({
    month: 'Aug',
    day: 24,
    year: 2026,
  })

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i)

  const currentMonth = String(selectedValues.month || 'Aug')
  const currentYear = Number(selectedValues.year || 2026)
  const maxDays = getDaysInMonth(currentMonth, currentYear)

  const days = Array.from({ length: maxDays }, (_, i) => i + 1)
  const currentDay = Math.min(Number(selectedValues.day || 1), maxDays)

  const columns = [
    {
      id: 'month',
      options: months.map((m) => ({ value: m, label: m })),
      value: currentMonth,
    },
    {
      id: 'day',
      options: days.map((d) => ({ value: d, label: String(d) })),
      value: currentDay,
    },
    {
      id: 'year',
      options: years.map((y) => ({ value: y, label: String(y) })),
      value: currentYear,
    },
  ]

  return (
    <div className="w-full max-w-sm border border-[var(--ui-border)] rounded-2xl bg-gray-50/50 dark:bg-gray-900/50 p-4 space-y-3 text-center">
      <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
        <Calendar className="size-4 text-blue-600 dark:text-blue-400" />
        <span>Date Selection</span>
      </div>

      <WheelPicker
        {...props}
        columns={columns}
        onChange={(vals) => setSelectedValues((prev) => ({ ...prev, ...vals }))}
      />

      <div className="p-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-xs text-blue-700 dark:text-blue-300 font-semibold">
        Selected: {currentMonth} {currentDay}, {currentYear}
      </div>
    </div>
  )
}

export default function WheelPickerDocsPage() {
  const [timeVals, setTimeVals] = useState<Record<string, string | number>>({
    hour: '09',
    minute: '30',
    period: 'AM',
  })

  const examples = [
    {
      title: '3D Time Picker (HH : MM AM/PM)',
      description:
        '3-column wheel picker for selecting hours, minutes, and AM/PM time periods with smooth snap alignment.',
      render: (
        <div className="w-full max-w-sm p-4 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800 space-y-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
            <Clock className="size-4 text-blue-600 dark:text-blue-400" />
            <span>Select Alarm Time</span>
          </div>

          <WheelPicker
            columns={[
              {
                id: 'hour',
                options: Array.from({ length: 12 }, (_, i) => {
                  const val = String(i + 1).padStart(2, '0')
                  return { value: val, label: val }
                }),
                value: timeVals.hour,
              },
              {
                id: 'minute',
                options: Array.from({ length: 12 }, (_, i) => {
                  const val = String(i * 5).padStart(2, '0')
                  return { value: val, label: val }
                }),
                value: timeVals.minute,
              },
              {
                id: 'period',
                options: [
                  { value: 'AM', label: 'AM' },
                  { value: 'PM', label: 'PM' },
                ],
                value: timeVals.period,
              },
            ]}
            onChange={(vals) => setTimeVals((prev) => ({ ...prev, ...vals }))}
          />

          <div className="text-xs font-bold text-gray-900 dark:text-white">
            Set Time: {timeVals.hour}:{timeVals.minute} {timeVals.period}
          </div>
        </div>
      ),
      code: `
<WheelPicker
  columns={[
    { id: 'hour', options: hoursList, value: '09' },
    { id: 'minute', options: minutesList, value: '30' },
    { id: 'period', options: [{ value: 'AM', label: 'AM' }, { value: 'PM', label: 'PM' }], value: 'AM' },
  ]}
  onChange={(vals) => handleTimeChange(vals)}
/>`,
    },
    {
      title: 'Weight & Fitness Measurement Selector',
      description:
        'Single wheel column for selecting numeric values like weight, height, or quantities.',
      render: (
        <div className="w-full max-w-sm p-4 border border-[var(--ui-border)] rounded-2xl bg-white dark:bg-gray-800 space-y-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-gray-900 dark:text-white">
            <Scale className="size-4 text-blue-600 dark:text-blue-400" />
            <span>Target Weight (kg)</span>
          </div>

          <WheelPicker
            columns={[
              {
                id: 'weight',
                options: Array.from({ length: 40 }, (_, i) => {
                  const kg = 50 + i
                  return { value: kg, label: `${kg} kg` }
                }),
                defaultValue: 68,
              },
            ]}
            height={160}
          />
        </div>
      ),
      code: `
<WheelPicker
  columns={[
    { id: 'weight', options: weightsList, defaultValue: 68 },
  ]}
  height={160}
/>`,
    },
  ]

  return (
    <DocsPageLayout
      component="WheelPicker"
      description="An iOS-style 3D scrollable wheel column selector component for mobile-native date, time, duration, and option selection with center snapping and gradient depth masks."
      playground={{
        render: (props) => <WheelPickerPlayground {...props} />,
        initialProps: {
          height: 200,
          itemHeight: 40,
        },
      }}
      examples={examples}
    />
  )
}
