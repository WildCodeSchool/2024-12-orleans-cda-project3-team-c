import { Outlet } from 'react-router-dom';
import NavBar from './components/navbar';

export default function App() {
  return (
    <div className='flex h-dvh w-full'>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
