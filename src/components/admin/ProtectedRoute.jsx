import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, authChecked } = useContext(AuthContext);
  
  if (!authChecked) {
    return <div className="loader">Cargando...</div>
  }

  return user ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
