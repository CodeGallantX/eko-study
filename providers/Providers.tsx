// providers/Providers.tsx
'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/lib/redux/store'

// Change from named export to default export
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  )
}