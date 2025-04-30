interface Window {
  posthog?: {
    identify: (userId: string, properties?: Record<string, any>) => void
  }
  amplitude?: {
    getInstance: () => {
      setUserId: (userId: string) => void
    }
  }
}
