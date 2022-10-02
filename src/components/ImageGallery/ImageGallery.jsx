import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Dna } from 'react-loader-spinner';
import PropTypes from 'prop-types';
import imagesApi from '../../services/images-api';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { LoadMoreButton } from '../Button/Button';
import noResults from '../../images/no-results.png';
import css from './ImageGallery.module.css';

export default function ImageGallery({ searchQuery }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus('pending');

    imagesApi
      .fetchImages(searchQuery, page)
      .then(response => {
        setImages([...images, ...response.hits]);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });

    if (images !== []) {
      return setImages(images => [...images]);
    }
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(page => page + 1);
  };

  if (status === 'resolved' && !images.length) {
    return <img className={css.noResults} src={noResults} alt="" width="500" />;
  }

  if (status === 'idle') {
    return <h1 className={css.CleanPage}>Please enter search request </h1>;
  }
  if (status === 'pending') {
    return (
      <>
        <div className={css.GalleryWrapper}>
          <ul className={css.Gallery}>
            {images &&
              images.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  webformatURL={image.webformatURL}
                  largeImageURL={image.largeImageURL}
                  alt={image.tags}
                />
              ))}
          </ul>
        </div>
        <div className={css.loader}>
          <Dna
            visible={true}
            height="500"
            width="500"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      </>
    );
  }
  if (status === 'rejected') {
    return <h1 className={css.errorMessage}>{error.message}</h1>;
  }
  if (status === 'resolved' && images.length) {
    return (
      <div className={css.GalleryWrapper}>
        <ul className={css.Gallery}>
          {images &&
            images.map(image => (
              <ImageGalleryItem
                key={image.id}
                webformatURL={image.webformatURL}
                largeImageURL={image.largeImageURL}
                alt={image.tags}
              />
            ))}
        </ul>
        <LoadMoreButton loadMore={loadMore} />
      </div>
    );
  }
}

// Компонент на классах

// export default class ImageGallery extends Component {
//   state = {
//     images: [],
//     page: 1,
//     error: null,
//     status: 'idle',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevProps.searchQuery;
//     const nextQuery = this.props.searchQuery;

//     if (prevQuery !== nextQuery || prevState.page !== this.state.page) {
//       this.setState({ status: 'pending' });
//       imagesApi
//         .fetchImages(nextQuery, this.state.page)
//         .then(response => {
//           this.setState(prevState => ({
//             images: [...prevState.images, ...response.hits],
//             status: 'resolved',
//           }));
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//     if (prevQuery !== nextQuery) {
//       this.setState({ images: [] });
//     }
//   }

//   loadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   render() {
//     const { images, error, status } = this.state;

//     if (status === 'resolved' && !images.length) {
//       return (
//         <img className={css.noResults} src={noResults} alt="" width="500" />
//       );
//     }

//     if (status === 'idle') {
//       return <h1 className={css.CleanPage}>Please enter search request </h1>;
//     }
//     if (status === 'pending') {
//       return (
//         <>
//           <div className={css.GalleryWrapper}>
//             <ul className={css.Gallery}>
//               {images &&
//                 images.map(image => (
//                   <ImageGalleryItem
//                     key={image.id}
//                     webformatURL={image.webformatURL}
//                     largeImageURL={image.largeImageURL}
//                     alt={image.tags}
//                   />
//                 ))}
//             </ul>
//           </div>
//           <div className={css.loader}>
//             <Dna
//               visible={true}
//               height="500"
//               width="500"
//               ariaLabel="dna-loading"
//               wrapperStyle={{}}
//               wrapperClass="dna-wrapper"
//             />
//           </div>
//         </>
//       );
//     }
//     if (status === 'rejected') {
//       return <h1 className={css.errorMessage}>{error.message}</h1>;
//     }
//     if (status === 'resolved' && images.length) {
//       return (
//         <div className={css.GalleryWrapper}>
//           <ul className={css.Gallery}>
//             {images &&
//               images.map(image => (
//                 <ImageGalleryItem
//                   key={image.id}
//                   webformatURL={image.webformatURL}
//                   largeImageURL={image.largeImageURL}
//                   alt={image.tags}
//                 />
//               ))}
//           </ul>
//           <LoadMoreButton loadMore={this.loadMore} />
//         </div>
//       );
//     }
//   }
// }

ImageGallery.propTypes = { searchQuery: PropTypes.string.isRequired };
