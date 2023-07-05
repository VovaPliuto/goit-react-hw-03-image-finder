import axios from 'axios';

export const fetchImages = async (searchQuery, page) => {
  const {
    data,
  } = await axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=1&key=36547568-478c5d8084c7a48dd3b1eaaca&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
    );
  
  return data;
};
