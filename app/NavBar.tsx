'use client';
import { Container, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { GiCrownedSkull } from 'react-icons/gi';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <GiCrownedSkull className="w-10 h-10 mr-2" />
            </Link>
            <NavLinks />
          </Flex>
          <div>Login</div>
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Players', href: '/players' },
    { label: 'Games', href: '/games' },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map(({ href, label }) => (
        <li key={label}>
          <Link
            href={href}
            className={`${
              href === currentPath ? 'text-zinc-900' : 'text-zinc-500'
            } hover:text-zinc-800 transition-colors`}>
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
