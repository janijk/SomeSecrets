import {SplashScreen} from '../screens/SplashScreen'
import { useSelector } from 'react-redux'

/**
 * Checks state with useSelector state.loader.isAuth. Shows SplashScreen meanwhile state is being fetched.
 * @param {*} children 
 * @returns Splash screen if app is loading, else children
 */
export const Authenticated = ({children}) => {
    const isAuth = useSelector(state => state.loader.isAuth);
    
    return (
        <>       
        {isAuth?
            <SplashScreen/>
            :
            <>
            {children}
            </>
        }
        </> 
    )
}