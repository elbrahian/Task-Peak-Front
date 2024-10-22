import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';

// project imports
import { DASHBOARD_PATH } from 'config';
// import Logo from 'ui-component/Logo';
import Logo from '../../../assets/images/icons/logo.png';


const LogoSection = () => (
    <Link component={RouterLink} to={DASHBOARD_PATH} aria-label="theme-logo">
        <img src={Logo} style={{ width: '50px', height: 'auto' }} />
        {/* <Logo /> */}
    </Link>
);

export default LogoSection;
