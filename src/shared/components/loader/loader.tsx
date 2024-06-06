import Spinner from 'react-bootstrap/Spinner';
import './loader.scss';

function AppLoader() {
    return (
        <Spinner animation="border" role="status" className='loaderStyle'></Spinner>
    );
}

export default AppLoader;