import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/Store';
import App from './App';

export default function Index() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}