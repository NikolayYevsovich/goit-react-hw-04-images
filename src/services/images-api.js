function fetchImages(searchQuery, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=29202682-7a05fadb20439a7af92786b6c&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error('Something went wrong and we working on it')
    );
  });
}
const imagesApi = { fetchImages };

export default imagesApi;
