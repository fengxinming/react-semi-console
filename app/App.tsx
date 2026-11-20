import './styles/global.css';
import './styles/app.styl';
import { Outlet, ScrollRestoration } from 'react-router';

import AppProviders from '~/components/AppProviders';
import NavigationProgress from '~/components/NavigationProgress';

export default function App() {
  return (
    <AppProviders>
      <NavigationProgress />
      <ScrollRestoration />
      <Outlet />
    </AppProviders>
  );
}
