// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import toast from 'react-hot-toast';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'teacher' | 'student';
//   department?: string;
//   teacherId?: string;
//   usn?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   signup: (userData: { name: string; email: string; password: string; role: 'teacher' | 'student' }) => Promise<void>;
//   logout: () => void;
//   updateProfile: (data: Partial<User>) => Promise<void>;
//   isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const signup = async (userData: { name: string; email: string; password: string; role: 'teacher' | 'student' }) => {
//     // Simulate API call
//     const newUser = {
//       id: Math.random().toString(36).substr(2, 9),
//       name: userData.name,
//       email: userData.email,
//       role: userData.role,
//     };
    
//     setUser(newUser);
//     localStorage.setItem('user', JSON.stringify(newUser));
//     toast.success('Account created successfully!');
//   };

//   const login = async (email: string, password: string) => {
//     // Simulate API call
//     const mockUser = {
//       id: '1',
//       name: 'John Doe',
//       email: email,
//       role: email.includes('teacher') ? 'teacher' : 'student' as 'teacher' | 'student',
//     };
    
//     setUser(mockUser);
//     localStorage.setItem('user', JSON.stringify(mockUser));
//     toast.success('Welcome back!');
//   };

//   const updateProfile = async (data: Partial<User>) => {
//     if (user) {
//       const updatedUser = { ...user, ...data };
//       setUser(updatedUser);
//       localStorage.setItem('user', JSON.stringify(updatedUser));
//       toast.success('Profile updated successfully!');
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       signup, 
//       logout, 
//       updateProfile, 
//       isAuthenticated: !!user 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }