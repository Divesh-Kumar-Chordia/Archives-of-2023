import styles from './menu.module.scss';
import classNames from 'classnames';

export interface MenuProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-menus-and-templates
 */
export const Menu = ({ className }: MenuProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles.logo}>
                <img
                    src="https://thumbs.dreamstime.com/b/film-icon-filled-website-design-mobile-app-development-cinema-collection-isolated-black-background-157815824.jpg"
                    className={styles.imglogo}
                />
                <span className={styles.logotext}>Divesh Movies</span>
            </div>
        </div>
    );
};
