// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const icons = {
    CalendarMonthIcon
};
const calendarioPage = {
    id: 'calendario',
    title: <FormattedMessage id="Calendario" />,
    icon: icons.CalendarMonthIcon,
    type: 'group',
    url: '/calendario'
};

export default calendarioPage;
