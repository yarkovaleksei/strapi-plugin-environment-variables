import { HeaderLayout } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';
import RequestButton, {
  IRequestButtonProps,
} from '../RequestButton';

export interface IHeaderProps extends IRequestButtonProps {
  loadingError: boolean
  totalVariables: number
}

const Header = ({
  loadingError,
  totalVariables,
  clickHandler,
}: IHeaderProps) => {
  const { formatMessage } = useIntl();

  return (
    <HeaderLayout
      as="h2"
      title={formatMessage({
        id: getTrad('plugin.name'),
      })}
      subtitle={
        loadingError
          ? undefined
          : formatMessage({
            id: getTrad('messages.total'),
          }, {
            total: totalVariables,
          })
      }
      primaryAction={
        totalVariables
          ? <RequestButton clickHandler={clickHandler} />
          : undefined
      }
    />
  );
};

export default Header;
