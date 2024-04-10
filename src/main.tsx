import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_URI,
});

const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
