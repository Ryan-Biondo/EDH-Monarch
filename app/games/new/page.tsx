import dynamic from 'next/dynamic';

const GameForm = dynamic(() => import('@/app/games/new/NewGameForm'), {
  ssr: false,
});
const NewGamePage = () => {
  return <GameForm />;
};

export default NewGamePage;
