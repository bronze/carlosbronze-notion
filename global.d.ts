interface Window {
  posthog?: {
    identify: (userId: string, properties?: Record<string, any>) => void
  }
  amplitude?: {
    setUserId: (userId: string) => void
  }
}
