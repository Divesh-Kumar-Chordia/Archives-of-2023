import styles from './App.module.scss';
import { Menu } from './components/menu/menu';
import { Container } from './components/container/container';
import { Favorite } from './components/favorite/favorite';

function App() {
    return (
        <div className={styles.App}>
            <Menu />
            <Container />
            <Favorite />
        </div>
    );
}

export default App;
