import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
// import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import reportWebVitals from './reportWebVitals';
import { EnterProvider } from './context/EnterContext.jsx';
import { BasketProvider } from './context/BasketContext.jsx';
import './styles/index.scss';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));

const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: twentyFourHoursInMs,
    },
  },
});
root.render(
  // React.StrictMode
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <EnterProvider>
          <BasketProvider>
            <App />
          </BasketProvider>
        </EnterProvider>
      </QueryClientProvider>
    </Provider>
);

reportWebVitals();
