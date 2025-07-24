import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Search, Calendar, Share2, Pencil, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface Certificate {
  id: string;
  title: string;
  date: string;
  file: string;
}

export default function FolderView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [certificates, setCertificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'Web Development Certificate',
      date: '2024-02-15',
      file: 'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg'
    }
  ]);
  const [newCertificate, setNewCertificate] = useState({
    title: '',
    date: '',
    file: ''
  });

  const handleUpload = () => {
    const certificate = {
      id: Math.random().toString(),
      ...newCertificate
    };
    
    setCertificates(prev => [...prev, certificate]);
    setShowUploadModal(false);
    setNewCertificate({ title: '', date: '', file: '' });
    toast.success('Certificate uploaded successfully!');
  };

  const handleDelete = (id: string) => {
    setCertificates(prev => prev.filter(cert => cert.id !== id));
    toast.success('Certificate deleted successfully');
  };

  const handleShare = (id: string) => {
    navigator.clipboard.writeText(`https://certrepo.com/certificates/${id}`);
    toast.success('Share link copied to clipboard!');
  };

  const filteredCertificates = certificates
    .filter(cert => 
      cert.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => 
      sortBy === 'date' 
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : a.title.localeCompare(b.title)
    );

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
        <div className="flex space-x-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search certificates..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
          >
            <option value="date">Sort by Date</option>
            <option value="title">Sort by Title</option>
          </select>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
          >
            <Upload className="h-5 w-5" />
            <span>Upload</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map(certificate => (
          <div
            key={certificate.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
          >
            <img
              src={certificate.file}
              alt={certificate.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{certificate.title}</h3>
              <p className="text-gray-600 mb-4">
                <Calendar className="inline-block h-4 w-4 mr-1" />
                {new Date(certificate.date).toLocaleDateString()}
              </p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleShare(certificate.id)}
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(certificate.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Certificate</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleUpload(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate Title
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCertificate.title}
                  onChange={(e) => setNewCertificate({ ...newCertificate, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCertificate.date}
                  onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certificate File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                  />
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    Click to upload or drag and drop
                  </button>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}