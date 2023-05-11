import { Outlet } from 'react-router-dom';
import './styles.css';
import CardList from '../../components/CardList';
import { useAppSelector } from '../../store/hooks';
import { selectListData } from '../../store/cardListSlice/selectors';

function MainPage() {
  const list = useAppSelector(selectListData);

  return (
    <main className="main-page">
      <h1 className="main-page__title">Pokedex</h1>
      <div className="main-page__content">
        <CardList list={list} />
        <Outlet />
      </div>
    </main>
  );
}

export default MainPage;
