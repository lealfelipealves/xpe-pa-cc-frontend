import { RoutePaths } from '@/routes'
import { Navigate } from 'react-router'

export default function Screen() {
  return <Navigate to={RoutePaths.login} />
}
