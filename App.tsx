import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Main from './Main'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    )
}

export default App