import { useNotification } from '@strapi/helper-plugin';
import { IconButton } from '@strapi/design-system';
import { Duplicate } from '@strapi/icons';
import { useCallback } from 'react';
import { useIntl } from 'react-intl';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getTrad } from '../../utils';

export interface ICopyButtonProps {
  data: string
}

const CopyButton = ({ data }: ICopyButtonProps) => {
  const { formatMessage } = useIntl();
  const toggleNotification = useNotification();

  const onCopy = useCallback(() => {
    toggleNotification({
      type: 'success',
      message: {
        id: formatMessage({
          id: getTrad('messages.copy.success'),
        }),
      },
    });
  }, [toggleNotification]);

  return (
    <CopyToClipboard
      text={data}
      onCopy={onCopy}
    >
      <IconButton
        label={formatMessage({
          id: getTrad('table.actions.copy'),
        })}
        icon={<Duplicate />}
        borderWidth={0}
        size="L"
      />
    </CopyToClipboard>
  );
};

export default CopyButton;
