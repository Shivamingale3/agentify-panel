import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useTheme } from '@/components/theme/use-theme'

const USAGE = `import { ThemeToggle } from '@/components/theme/theme-toggle'
import { useTheme } from '@/components/theme/use-theme'

<ThemeToggle />

const { theme, resolvedTheme, setTheme } = useTheme()
setTheme('dark') // 'light' | 'dark' | 'system'`

// Demo home screen: the theme picker plus a few surfaces to check the palette against.
const App = () => {
  const { theme, resolvedTheme } = useTheme()

  return (
    <main className="mx-auto flex min-h-svh max-w-2xl flex-col gap-8 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-sm font-bold tracking-wider uppercase">Agentify panel</h1>
        <ThemeToggle />
      </header>

      <p className="text-muted-foreground text-xs">
        Selected <span className="text-foreground">{theme}</span> · showing{' '}
        <span className="text-foreground">{resolvedTheme}</span>
      </p>

      <pre className="bg-muted overflow-x-auto border p-4 text-xs">{USAGE}</pre>

      <section className="bg-card text-card-foreground flex flex-col gap-3 border p-4">
        <h2 className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
          Palette preview
        </h2>
        <div className="flex flex-wrap gap-2">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>
    </main>
  )
}

export default App
