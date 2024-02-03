import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StarWars from './StarWars/StarWars';
import './App.css';

const queryClient = new QueryClient();

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <StarWars/>
    </QueryClientProvider>
  )
}

export default App;