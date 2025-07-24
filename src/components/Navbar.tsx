// import { Link, useNavigate } from 'react-router-dom';
// import { Award, LogOut, User } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';

// export default function Navbar() {
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow-lg">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Award className="h-8 w-8 text-blue-600" />
//             <span className="text-2xl font-bold text-gray-900">CertifyHub</span>
//           </Link>

//           <div className="flex items-center space-x-4">
//             <div className="flex items-center space-x-2">
//               <User className="h-5 w-5 text-gray-600" />
//               <span className="text-gray-700">{user?.name}</span>
//             </div>
//             <button
//               onClick={handleLogout}
//               className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//             >
//               <LogOut className="h-5 w-5" />
//               <span>Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }