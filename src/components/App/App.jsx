import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = searchQuery => {
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
