import { Navigate } from 'react-router-dom';
import type { ProtectedRouteProps } from '../types/ProtectedRouteProps';

function ProtectedRoute({ children }: ProtectedRouteProps) {
     const token = localStorage.getItem('neobankLoginToken');

     if (!token) {
          return (
              <Navigate to="/login" />
          )
     }

     return (
          <div>
               {children}
          </div>
     )
}

export default ProtectedRoute;