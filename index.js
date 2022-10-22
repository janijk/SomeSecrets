import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import App from './App';

export default function Index() {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </Provider>
    )
}