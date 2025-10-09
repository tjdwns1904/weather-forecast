import { QueryClientProvider } from '@tanstack/react-query';
import RootLayout from './layout/RootLayout';
import { FavoritesProvider } from './lib/FavoriteContextProvider';
import RouteProvider from './lib/routes';
import { queryClient } from './lib/queryClient';

function App() {

  return (
    <div className="App">
      <FavoritesProvider>
        <QueryClientProvider client={queryClient}>
          <RootLayout>
            <RouteProvider />
          </RootLayout>
        </QueryClientProvider>
      </FavoritesProvider>
    </div>
  )
}

export default App
