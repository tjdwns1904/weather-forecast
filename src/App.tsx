import RootLayout from './layout/RootLayout';
import { FavoritesProvider } from './lib/FavoriteContextProvider';
import RouteProvider from './lib/routes';

function App() {

  return (
    <div className="App">
      <FavoritesProvider>
        <RootLayout>
          <RouteProvider />
        </RootLayout>
      </FavoritesProvider>
    </div>
  )
}

export default App
