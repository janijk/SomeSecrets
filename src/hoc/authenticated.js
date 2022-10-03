import { Navigate } from "react-router-dom"
import { useSelector} from 'react-redux';

const authenticated = (Component, props) => {
    const isAuth = useSelector(state => state.username.value);
    if(isAuth !== ""){
        return <Component {...props}/>
    }
    else return <Navigate to="/"/>
};
export default withAuth;