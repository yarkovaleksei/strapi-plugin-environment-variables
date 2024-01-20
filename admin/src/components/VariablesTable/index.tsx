import {
  Flex,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
  VisuallyHidden,
} from '@strapi/design-system';
import { useIntl } from 'react-intl';
import Highlighter from 'react-highlight-words';
import { getTrad } from '../../utils';
import CopyButton from '../CopyButton';

export type IEnvVariables = Record<string, string>;

interface IVariablesProps {
  variables: IEnvVariables
  searchValue?: string
}

const VariablesTable = ({
  variables,
  searchValue = '',
}: IVariablesProps) => {
  const { formatMessage } = useIntl();
  const keyValuePairs = Object.entries(variables);
  const total = keyValuePairs.length;

  const getJSON = (key: string, value: string) => {
    return JSON.stringify({ [key]: value });
  };

  return (
    <Table colCount={3} rowCount={total + 1}>
      <Thead>
        <Tr>
          <Th>
            <Typography
              variant="sigma"
              textColor="neutral1000"
            >
              {formatMessage({
                id: getTrad('table.header.column.name'),
              })}
            </Typography>
          </Th>
          <Th>
            <Typography
              variant="sigma"
              textColor="neutral1000"
            >
              {formatMessage({
                id: getTrad('table.header.column.value'),
              })}
            </Typography>
          </Th>
          <Th>
            <VisuallyHidden>Actions</VisuallyHidden>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {keyValuePairs.map(([key, value]) => (
          <Tr key={key}>
            <Td>
              <Typography textColor="neutral800">
                <Highlighter
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={key}
                />
              </Typography>
            </Td>
            <Td>
              <Typography
                textColor="neutral800"
                style={{ maxWidth: '200px', textOverflow: 'ellipsis', whiteSpace: 'break-spaces' }}
              >
                <Highlighter
                  searchWords={[searchValue]}
                  autoEscape={true}
                  textToHighlight={value}
                />
              </Typography>
            </Td>
            <Td>
              <Flex
                gap={1}
                justifyContent="flex-end"
                onClick={(e: Event) => e.stopPropagation()}
              >
                <CopyButton data={getJSON(key, value)} />
              </Flex>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default VariablesTable;
