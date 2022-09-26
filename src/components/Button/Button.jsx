import css from './Button.module.css';

export const LoadMoreButton = ({ loadMore }) => {
  return (
    <button onClick={loadMore} className={css.Button} type="button">
      Load more
    </button>
  );
};
