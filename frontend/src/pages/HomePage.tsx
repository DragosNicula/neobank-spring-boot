import ProtectedRoute from '../components/ProtectedRoute';

function HomePage() {

     return (
          <div>
               <ProtectedRoute >
                    <h1>This is home page</h1>
               </ProtectedRoute>
          </div>
     )
}

export default HomePage;