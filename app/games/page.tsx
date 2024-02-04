import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

const GamesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/games/new">New Game</Link>
      </Button>
    </div>
  );
};

export default GamesPage;
