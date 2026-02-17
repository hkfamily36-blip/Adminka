import { Outlet } from 'react-router';

export function Root() {
  console.log('=== ROOT COMPONENT RENDERED ===');
  return <Outlet />;
}