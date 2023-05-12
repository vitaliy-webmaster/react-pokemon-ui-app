import { Outlet } from 'react-router-dom';
import './styles.css';
import CardList from '../../components/CardList';
import TypeFilter from '../../components/TypeFilter';

function MainPage() {
  return (
    <main className="main-page">
      <h1 className="main-page__title">Test Application UI</h1>
      <div className="main-page__content">
        <TypeFilter />
        <CardList />
        <Outlet />
      </div>
    </main>
  );
}

export default MainPage;
