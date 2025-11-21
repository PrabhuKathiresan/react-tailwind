export default function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-950 py-6 px-4 text-center text-sm text-gray-500 dark:text-gray-400 dark:bg-gray-900">
      <p>
        © {new Date().getFullYear()} React Tailwind — Built with ❤️ and Tailwind CSS by{' '}
        <a
          href="https://github.com/PrabhuKathiresan"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          @PrabhuKathiresan
        </a>
      </p>
    </footer>
  )
}
