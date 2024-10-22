// This is example of menu item without group for horizontal layout. There will be no children.

// third-party
import { FormattedMessage } from 'react-intl';

// assets
import FolderCopyIcon from '@mui/icons-material/FolderCopy';

const icons = {
    FolderCopyIcon
};
const categoriaPage = {
    id: 'categorias',
    title: <FormattedMessage id="Categorias" />,
    icon: icons.FolderCopyIcon,
    type: 'group',
    url: '/categorias'
};

export default categoriaPage;
