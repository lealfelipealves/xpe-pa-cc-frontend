import Logout from '@/features/logout';
import { Route, Routes } from 'react-router';
import { ListRoutes } from './routes';

export function Router() {
  const isAuthenticated = true;

  return (
    <Routes>
      {ListRoutes().map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            !isAuthenticated && route.isPrivate ? <Logout /> : route.element
          }
        />
      ))}
    </Routes>
  )
}
