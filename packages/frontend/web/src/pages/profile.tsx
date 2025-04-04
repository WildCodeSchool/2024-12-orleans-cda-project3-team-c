import NavBar from '@/components/navbar';
import ProfileOwn from '@/components/profile-own';

export default function Profile() {
  return (
    <section className='flex'>
      <NavBar />
      <ProfileOwn />
    </section>
  );
}
