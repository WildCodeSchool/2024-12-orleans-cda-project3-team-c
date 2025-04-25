import { Outlet } from 'react-router-dom';

import NavBar from './components/navbar';

console.log(document.querySelector('#root')?.getBoundingClientRect());
export default function App() {
  return (
    <div className='relative h-dvh w-full' id='app'>
      <NavBar />
      <main className='h-full w-full'>
        <Outlet />
      </main>
    </div>
  );
}
