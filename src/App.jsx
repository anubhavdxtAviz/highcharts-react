import './App.css';
import DeviceLevelView from './pages/page';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DeviceLevelView showNull={true} />,
  },
  {
    path: '/no-null',
    element: <DeviceLevelView showNull={false} />,
  },
]);
const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <DeviceLevelView /> */}
      {/* <ChartWrapper /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
