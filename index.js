import { Provider } from 'react-redux';
import { store } from './src/redux/Store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { registerRootComponent } from 'expo';
import App from './App';

const Index = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </Provider>
    )
}

export default registerRootComponent(Index)