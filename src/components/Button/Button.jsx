import css from './Button.module.css';

const Button = ({ onBtnClick }) => {
  return (
    <button onClick={onBtnClick} type="text" className={css.button}>
      Load More
    </button>
  );
};

export default Button;
