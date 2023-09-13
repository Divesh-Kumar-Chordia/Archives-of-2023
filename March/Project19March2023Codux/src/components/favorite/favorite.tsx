import styles from './favorite.module.scss';
import classNames from 'classnames';

export interface FavoriteProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-favorites-and-templates
 */
export const Favorite = ({ className }: FavoriteProps) => {
    return <div className={classNames(styles.root, className)}>Favorite</div>;
};
