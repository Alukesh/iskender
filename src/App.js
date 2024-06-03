import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import api from './services/api';
import AppRouter from './router';

function App() {
  const dispatch = useDispatch()
  const router = AppRouter();

  useEffect(() => {
    if (localStorage.getItem('isk user') && localStorage.getItem('isk user') !== '{}') {
      const user = JSON.parse(localStorage.getItem('isk user'))
      api.get(`/getClient/${user?._id}`)
        .then(({ data }) => {
          dispatch.cart.afterLoginUser(data?.object)
        })
    }
    if (sessionStorage.getItem('isk cart')) {
      dispatch.cart.restore(JSON.parse(sessionStorage.getItem('isk cart')))
    }
  }, [])

  return (
    <RouterProvider router={router} />
  );
}

export default App;