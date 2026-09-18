'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

/**
 * Dark is the default. Light is an opt-in the user chooses and we remember.
 *
 * The `dark` class is written onto <html> by the server render AND by the
 * blocking script in app/layout.tsx, so the first paint is always correct and
 * there is no flash. This component only reflects and flips that state.
 *
 * localStorage can throw (private windows, blocked site data, embedded
 * previews) — every access is wrapped. If it throws, the toggle still works
 * for the session, it just will not be remembered.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    setMounted(true)
  }, [])

  function toggle() {
    const root = document.documentElement
    const next = !root.classList.contains('dark')

    root.classList.add('theme-transition')
    root.classList.toggle('dark', next)
    setIsDark(next)

    try {
      window.localStorage.setItem('ap-theme', next ? 'dark' : 'light')
    } catch {
      /* storage unavailable — the choice just will not persist */
    }

    window.setTimeout(() => root.classList.remove('theme-transition'), 200)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
    >
      {/* Render nothing until mounted so the icon can never contradict the
          actual theme during hydration. */}
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" strokeWidth={1.75} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={1.75} />
        )
      ) : (
        <span className="h-4 w-4" />
      )}
    </button>
  )
}
