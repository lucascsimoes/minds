import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Home, CreditCard, HandCoins, LayoutGrid } from 'lucide-react';

import App from './pages/Principal/App';
import Cards from './pages/Cards/Cards';
import AddCard from './components/AddCard/AddCard';
import Dashboard from './pages/Dashboard/Dashboard';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';

interface AuthProps {
  isAuthenticated: boolean;
}

// interface PrivateRouteProps {
//   auth: AuthProps;
//   children: React.ReactNode;
// }

interface PrivateWrapperProps {
  auth: AuthProps;
}

export const routes = [
  {
      name: 'Início',
      icon: <Home size={20} strokeWidth={1.5}/>,
      path: '/'
  },
  {
    name: 'Cartões',
    icon: <CreditCard size={20} strokeWidth={1.5}/>,
    path: '/cards'
  },
  {
    name: 'Serviços',
    icon: <HandCoins size={20} strokeWidth={1.5}/>,
    path: '/services'
  },
  {
    name: 'Dashboard',
    icon: <LayoutGrid size={20} strokeWidth={1.5}/>,
    path: '/dashboard'
  }
]

// const PrivateRoute = ({ auth: { isAuthenticated }, children }: PrivateRouteProps) => {
//   return isAuthenticated ? children : <Navigate to="/signin" />;
// };

const PrivateWrapper = ({ auth: { isAuthenticated } }: PrivateWrapperProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
};

export default function AppRoutes() {

  const auth = {
    isAuthenticated: !!sessionStorage.getItem('token')
  };

  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />

      <Route element={<PrivateWrapper auth={auth}/>}>
        <Route path="/" element={<App />}>
          <Route path="cards" element={<Cards />}>
            <Route path='add' element={<AddCard values={undefined}/>}/>
          </Route>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
      {/* <Route path="*" element={<Pagina404 />} /> */}
    </Routes>
  );
}
