import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from './store';
import ErrorPage from './pages/Error';
import MainPage from './pages/Main';
import CardDetails from './components/CardDetails';
import { fetchCardListAsync, selectCard } from './store/cardListSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      console.log('loader in path: /');
      store.dispatch(fetchCardListAsync());
      return Promise.resolve(null);
    },
    children: [
      {
        path: ':id',
        element: <CardDetails />,
        loader: async ({ params }) => {
          console.log('loader in path: /:id');
          store.dispatch(selectCard(Number(params.id)));
          return Promise.resolve(null);
        },
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
