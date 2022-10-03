import {SplashScreen} from '../screens/SplashScreen'
import { useSelector } from 'react-redux'

export const Loading = () => {
    const isLoading = useSelector(state => state.loader.isLoading)

    return (
        
        <SplashScreen/>
    )
}