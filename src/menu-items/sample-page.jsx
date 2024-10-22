// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import AssignmentIcon from '@mui/icons-material/Assignment';


// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const icons = {
    AssignmentIcon
};
const samplePage = {
    id: 'sample-page',
    title: <FormattedMessage id="sample-page" />,
    icon: icons.AssignmentIcon,
    type: 'group',
    url: '/sample-page'
};

export default samplePage;
