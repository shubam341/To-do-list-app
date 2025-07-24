import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FolderPlus, Search, GraduationCap, Users, FolderOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Student {
  id: string;
  name: string;
  usn: string;
  department: string;
  folders: Folder[];
}

interface Folder {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      usn: 'USN001',
      department: 'Computer Science',
      folders: [
        {
          id: '1',
          name: 'Academic Certificates',
          description: 'All academic achievements',
          createdAt: '2024-02-20'
        }
      ]
    }
  ]);
  const [newFolder, setNewFolder] = useState({
    name: '',
    description: ''
  });

  const departments = ['Computer Science', 'Electronics', 'Mechanical', 'Civil'];

  const handleCreateFolder = () => {
    // Simulate folder creation
    const folder = {
      id: Math.random().toString(),
      ...newFolder,
      createdAt: new Date().toISOString()
    };
    
    if (user?.role === 'student') {
      setStudents(prev => 
        prev.map(s => 
          s.id === user.id 
            ? { ...s, folders: [...s.folders, folder] }
            : s
        )
      );
    }
    
    setShowCreateModal(false);
    setNewFolder({ name: '', description: '' });
    toast.success('Folder created successfully!');
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.usn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = !selectedDepartment || student.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="max-w-7xl mx-auto">
      {user?.role === 'teacher' ? (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Student Certificates</h1>
            </div>
            <div className="flex space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or USN..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map(student => (
              <div key={student.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">{student.name}</h3>
                  </div>
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-600">USN: {student.usn}</p>
                    <p className="text-gray-600">Department: {student.department}</p>
                  </div>
                  <div className="space-y-2">
                    {student.folders.map(folder => (
                      <Link
                        key={folder.id}
                        to={`/folder/${folder.id}`}
                        className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <FolderOpen className="h-5 w-5 text-blue-600" />
                          <span className="font-medium text-gray-900">{folder.name}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{folder.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-2">
              <FolderOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              <FolderPlus className="h-5 w-5" />
              <span>Create Folder</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students[0].folders.map(folder => (
              <Link
                key={folder.id}
                to={`/folder/${folder.id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-[1.02]"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <FolderOpen className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-900">{folder.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{folder.description}</p>
                  <p className="text-sm text-gray-500">
                    Created on {new Date(folder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create New Folder</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateFolder(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Folder Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newFolder.name}
                  onChange={(e) => setNewFolder({ ...newFolder, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newFolder.description}
                  onChange={(e) => setNewFolder({ ...newFolder, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Folder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}