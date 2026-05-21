import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from '@/layouts/MainLayout';
import { ROUTES } from '@/constants/config';
import { Home } from '@/pages/Home';
import { Games } from '@/pages/Games';
import { Checkout } from '@/pages/Checkout';
import { History } from '@/pages/History';
import { Profile } from '@/pages/Profile';

/**
 * Root application component.
 * Initializes the routing context and defines the application's view hierarchy.
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Core Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.GAMES} element={<Games />} />
          
          {/* Transaction Routes */}
          <Route path={`${ROUTES.CHECKOUT}/:id`} element={<Checkout />} />
          
          {/* User Routes */}
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;