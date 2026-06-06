export function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight text-primary">
            AlphaLens
          </span>
          <span className="hidden text-xs font-medium text-positive sm:inline">
            data over hype
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          <a
            href="#how-it-works"
            className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            How it Works
          </a>
          <a
            href="#rankings"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Rankings
          </a>
        </nav>
      </div>
    </header>
  )
}
