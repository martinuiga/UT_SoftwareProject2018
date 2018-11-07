import { createConfirmation } from 'react-confirm';
import ConfirmDialog from './ConfirmDialog';

const confirm = createConfirmation(ConfirmDialog);

export default (confirmation, options = {}) => {
  return confirm({ confirmation, ...options });
};
