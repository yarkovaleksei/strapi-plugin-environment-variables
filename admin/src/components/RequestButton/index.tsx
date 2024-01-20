import { Button } from '@strapi/design-system';
import { Refresh } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';

export interface IRequestButtonProps {
  clickHandler: () => void | Promise<void>
}

const RequestButton = ({ clickHandler }: IRequestButtonProps) => {
  const { formatMessage } = useIntl();

  return (
    <Button
      onClick={clickHandler}
      startIcon={<Refresh />}
      variant="primary"
      size="large"
    >
      {formatMessage({
        id: getTrad('ui.request'),
      })}
    </Button>
  );
};

export default RequestButton;
