// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import AssignmentIcon from '@mui/icons-material/Assignment';

const icons = {
    AssignmentIcon
};
const adminTareaPage = {
    id: 'mi-tareas',
    title: <FormattedMessage id="Mis Tareas" />,
    icon: icons.AssignmentIcon,
    type: 'group',
    url: '/mi-tareas'
};

export default adminTareaPage;
