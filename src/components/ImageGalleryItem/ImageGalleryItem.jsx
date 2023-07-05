import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, selectImg }) => {
  const { webformatURL, tags, id } = image;
  return (
    <li className={css.imageGalleryItem} onClick={() => selectImg(id)}>
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
