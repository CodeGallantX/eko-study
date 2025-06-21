// providers/Providers.tsx
'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { store } from '@/lib/redux/store'
import SupabaseProvider from './SupabaseProvider'
import SupabaseAuthProvider from './SupabaseAuthProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <SupabaseProvider>
        <SupabaseAuthProvider>
          {children}
        </SupabaseAuthProvider>
      </SupabaseProvider>
    </ReduxProvider>
  )
}