import ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
const httpLink = createHttpLink({
  uri: 'https://syn-api-prod.herokuapp.com/graphql/',
});

const authLink = setContext((_, { headers }) => {
  // Obtener el token de autenticación de donde lo tengas guardado (por ejemplo, localStorage)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwb3NpdGlvbklkIjoiYTMzNWI3ZmMtNGNkOC00ZTYwLTgwYmYtMTEyNjQwMWM1ZTU4IiwicHJvamVjdElkIjoiY2ZiNzYzM2UtZWEyMC00MzMwLWIzYzAtZDBlYjg1ZDA0MmM1IiwiZnVsbE5hbWUiOiJHYWJyaWVsIFZpbGxhbnVldmEgVmVnYSIsImVtYWlsIjoiZ3ZpbGxhbnVldmF2ZWdhQGdtYWlsLmNvbSIsImlhdCI6MTcxMjM0MTQwOX0.cbSRxKibjwpY-MyHV0Bpy3GG3LMcqGC_dTuzYambGqM';

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
