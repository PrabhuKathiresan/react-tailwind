import { useState } from 'react'
import { DocsPageLayout } from '../../components/DocsPageLayout'
import { SwipeableRow, StatusPill } from '@pk-design/react-tailwind'
import { Trash2, Archive, Pin, CheckCircle2, Star, Mail, AlertTriangle } from 'lucide-react'

function SwipeableRowPlayground(props: any) {
  const [items, setItems] = useState([
    {
      id: '1',
      title: 'Design Mobile Picker Specs',
      sender: 'Sarah Jenkins',
      time: '10:42 AM',
      unread: true,
    },
  ])

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const defaultRightActions = [
    {
      id: 'delete',
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      theme: 'danger' as const,
      onClick: () => handleDelete('1'),
    },
    {
      id: 'archive',
      label: 'Archive',
      icon: <Archive className="size-4" />,
      theme: 'gray' as const,
      onClick: () => alert('Archived!'),
    },
  ]

  const defaultLeftActions = [
    {
      id: 'pin',
      label: 'Pin',
      icon: <Pin className="size-4" />,
      theme: 'primary' as const,
      onClick: () => alert('Pinned to top!'),
    },
  ]

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
        Item deleted!{' '}
        <button
          type="button"
          onClick={() =>
            setItems([
              {
                id: '1',
                title: 'Design Mobile Picker Specs',
                sender: 'Sarah Jenkins',
                time: '10:42 AM',
                unread: true,
              },
            ])
          }
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
        >
          Reset Item
        </button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md">
      <SwipeableRow
        {...props}
        leftActions={props.leftActions ?? defaultLeftActions}
        rightActions={props.rightActions ?? defaultRightActions}
      >
        <div className="p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
              <Mail className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                  {items[0].sender}
                </span>
                <StatusPill theme="info" size="sm">
                  Inbox
                </StatusPill>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                {items[0].title}
              </p>
            </div>
          </div>
          <span className="text-xs text-gray-400 shrink-0">{items[0].time}</span>
        </div>
      </SwipeableRow>
    </div>
  )
}

export default function SwipeableRowDocsPage() {
  const [inboxItems, setInboxItems] = useState([
    {
      id: 'm1',
      sender: 'Product Team',
      title: 'Q3 Mobile UX Design Review Brief',
      time: '9:15 AM',
    },
    { id: 'm2', sender: 'Alex Rivera', title: 'Updated Tailwind v4 CSS Tokens', time: 'Yesterday' },
    { id: 'm3', sender: 'System Alert', title: 'Production deployment successful', time: 'Aug 21' },
  ])

  const [todoTasks, setTodoTasks] = useState([
    { id: 't1', title: 'Build SwipeableRow gesture component', priority: 'High', done: false },
    {
      id: 't2',
      title: 'Audit dvh mobile browser viewport scaling',
      priority: 'Medium',
      done: false,
    },
    { id: 't3', title: 'Update monorepo documentation site', priority: 'Low', done: true },
  ])

  const handleRemoveInbox = (id: string) => {
    setInboxItems((prev) => prev.filter((i) => i.id !== id))
  }

  const handleToggleTodo = (id: string) => {
    setTodoTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const examples = [
    {
      title: 'Swipe Left to Delete / Archive (Mobile Inbox Pattern)',
      description:
        'Swipe left from the right edge of any item row to reveal action buttons like Delete (Red) or Archive (Gray). Tapping an action button triggers its callback and resets row position.',
      render: (
        <div className="w-full max-w-md space-y-2">
          {inboxItems.map((item) => (
            <SwipeableRow
              key={item.id}
              rightActions={[
                {
                  id: 'del',
                  label: 'Delete',
                  icon: <Trash2 className="size-4" />,
                  theme: 'danger',
                  onClick: () => handleRemoveInbox(item.id),
                },
                {
                  id: 'arch',
                  label: 'Archive',
                  icon: <Archive className="size-4" />,
                  theme: 'gray',
                  onClick: () => handleRemoveInbox(item.id),
                },
              ]}
            >
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <span className="font-semibold text-sm text-gray-900 dark:text-white truncate block">
                    {item.sender}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 truncate block mt-0.5">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400 shrink-0">{item.time}</span>
              </div>
            </SwipeableRow>
          ))}
          {inboxItems.length === 0 && (
            <div className="p-4 text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
              All messages cleared.{' '}
              <button
                type="button"
                onClick={() =>
                  setInboxItems([
                    {
                      id: 'm1',
                      sender: 'Product Team',
                      title: 'Q3 Mobile UX Design Review Brief',
                      time: '9:15 AM',
                    },
                    {
                      id: 'm2',
                      sender: 'Alex Rivera',
                      title: 'Updated Tailwind v4 CSS Tokens',
                      time: 'Yesterday',
                    },
                  ])
                }
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Restore Items
              </button>
            </div>
          )}
        </div>
      ),
      code: `
const rightActions = [
  {
    id: 'delete',
    label: 'Delete',
    icon: <Trash2 className="size-4" />,
    theme: 'danger',
    onClick: () => removeItem(item.id),
  },
  {
    id: 'archive',
    label: 'Archive',
    icon: <Archive className="size-4" />,
    theme: 'gray',
    onClick: () => archiveItem(item.id),
  },
]

<SwipeableRow rightActions={rightActions}>
  <div className="p-3.5">Item Content</div>
</SwipeableRow>`,
    },
    {
      title: 'Swipe Right to Complete / Pin (Mobile Task Manager)',
      description:
        'Swipe right from the left edge to reveal quick left actions like Mark Complete (Green) or Pin (Blue).',
      render: (
        <div className="w-full max-w-md space-y-2">
          {todoTasks.map((task) => (
            <SwipeableRow
              key={task.id}
              leftActions={[
                {
                  id: 'done',
                  label: task.done ? 'Undo' : 'Complete',
                  icon: <CheckCircle2 className="size-4" />,
                  theme: 'success',
                  onClick: () => handleToggleTodo(task.id),
                },
                {
                  id: 'star',
                  label: 'Star',
                  icon: <Star className="size-4" />,
                  theme: 'warning',
                  onClick: () => alert(`Starred "${task.title}"`),
                },
              ]}
            >
              <div className="p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`size-2.5 rounded-full shrink-0 ${
                      task.done ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                  />
                  <span
                    className={`text-sm font-medium text-gray-900 dark:text-white truncate ${
                      task.done ? 'line-through opacity-60' : ''
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
                <StatusPill theme={task.priority === 'High' ? 'danger' : 'info'} size="sm">
                  {task.priority}
                </StatusPill>
              </div>
            </SwipeableRow>
          ))}
        </div>
      ),
      code: `
const leftActions = [
  {
    id: 'complete',
    label: 'Complete',
    icon: <CheckCircle2 className="size-4" />,
    theme: 'success',
    onClick: () => toggleTask(task.id),
  },
]

<SwipeableRow leftActions={leftActions}>
  <div className="p-3.5">Task Item</div>
</SwipeableRow>`,
    },
    {
      title: 'Full Swipe Auto-Execute',
      description:
        'Enable fullSwipeToExecute so swiping past fullSwipeThreshold (180px) automatically executes the primary action on swipe release without requiring a second tap.',
      render: (
        <div className="w-full max-w-md">
          <SwipeableRow
            fullSwipeToExecute
            fullSwipeThreshold={160}
            rightActions={[
              {
                id: 'quick-del',
                label: 'Delete',
                icon: <Trash2 className="size-4" />,
                theme: 'danger',
                onClick: () => alert('Full swipe auto-executed Delete!'),
              },
            ]}
          >
            <div className="p-4 flex items-center gap-3">
              <AlertTriangle className="size-5 text-amber-500 shrink-0" />
              <div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white block">
                  Full Swipe Me Left
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 block">
                  Drag all the way left to auto-execute Delete.
                </span>
              </div>
            </div>
          </SwipeableRow>
        </div>
      ),
      code: `
<SwipeableRow
  fullSwipeToExecute
  fullSwipeThreshold={160}
  rightActions={[
    {
      id: 'quick-del',
      label: 'Delete',
      icon: <Trash2 className="size-4" />,
      theme: 'danger',
      onClick: () => deleteItem(),
    },
  ]}
>
  <div className="p-4">Swipe all the way left to delete</div>
</SwipeableRow>`,
    },
  ]

  return (
    <DocsPageLayout
      component="SwipeableRow"
      description="A mobile-optimized swipe gesture row component. Allows users to swipe left or right to reveal contextual action buttons (Delete, Archive, Complete, Pin) with smooth spring physics, touch drag tracking, threshold callbacks, and full-swipe execution."
      playground={{
        render: (props) => <SwipeableRowPlayground {...props} />,
        initialProps: {
          actionWidth: 76,
          threshold: 40,
          fullSwipeToExecute: false,
          fullSwipeThreshold: 180,
          disabled: false,
        },
      }}
      examples={examples}
    />
  )
}
