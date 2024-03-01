import Image from 'next/image'
import Link from 'next/link';
import ProductCard from './components/ProductCard/ProductCard';

export default function Home() {
  return (
    <main>
      <br />
      <Link href="/users">Users</Link>
      <br />
      <Link href="/users/login">Login</Link>
      <br />
      <Link href="/users/65a78703d0dcecc4c216471b">Specific User</Link>
    </main>
  );
}
