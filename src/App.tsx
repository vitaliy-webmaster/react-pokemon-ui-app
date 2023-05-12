import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { store } from './store';
import ErrorPage from './pages/Error';
import MainPage from './pages/Main';
import CardDetails from './components/CardDetails';
import {
  fetchCardListAsync,
  fetchTypeListAsync,
  selectCard,
} from './store/cardListSlice';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <MainPage />,
      errorElement: <ErrorPage />,
      loader: async () => {
        store.dispatch(fetchCardListAsync());
        store.dispatch(fetchTypeListAsync());
        return Promise.resolve(null);
      },
      children: [
        {
          path: ':id',
          element: <CardDetails />,
          loader: async ({ params }) => {
            store.dispatch(selectCard(Number(params.id)));
            return Promise.resolve(null);
          },
        },
      ],
    },
  ],
  { basename: '/react-test-ui-app' },
);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
