import TokenRefresher from './TokenRefresher'
import { AppTokens } from '@/types/common'

export function withRefresh<T extends Record<string, unknown>>(
  WrappedComponent: React.ComponentType<T>,
  isRefresh?: AppTokens
) {
  return function EnhancedComponent(props: T) {
    if (!isRefresh) return <WrappedComponent {...props} />
    return (
      <>
        <TokenRefresher key="token-refresher" {...isRefresh} />
        <WrappedComponent {...props} />
      </>
    )
  }
}
