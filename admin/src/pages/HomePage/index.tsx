import {
  EmptyStateLayout,
  LoadingIndicatorPage,
  useFetchClient,
  useNotification,
  useFilter,
} from '@strapi/helper-plugin';
import {
  ContentLayout,
  Main,
  Flex,
} from '@strapi/design-system';
import React, {
  useEffect,
  useState,
} from 'react';
import { useIntl } from 'react-intl';
import {
  IEnvVariables,
  VariablesTable,
  Header,
  RequestButton,
  FilterInput,
} from '../../components';
import { getTrad } from '../../utils';

const HomePage = () => {
  const fetchClient = useFetchClient();
  const {
    formatMessage,
    locale,
  } = useIntl();
  const toggleNotification = useNotification();
  const { includes } = useFilter(locale, { sensitivity: 'base' });
  const [originalData, setOriginalData] = useState<IEnvVariables | null>(null);
  const [variables, setVariables] = useState<IEnvVariables | null>(null);
  const [totalVariables, setTotalVariables] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const filteredVariables = Object
      .entries(originalData || {})
      .filter(([key, value]) => (
        includes(key, searchValue) ||
        includes(value, searchValue)
      ));

    setVariables(Object.fromEntries(filteredVariables));
    setTotalVariables(filteredVariables.length);
  }, [searchValue]);

  const loadVariables = async () => {
    setLoading(true);
    setLoadingError(false);

    try {
      const { data } = await fetchClient.get('/environment-variables/environment-variables');

      setOriginalData(data);
      setVariables(data);
      setTotalVariables(Object.keys(data || {}).length);
    } catch (error) {
      setLoadingError(true);
      toggleNotification({
        type: 'warning',
        message: {
          id: formatMessage({
            id: getTrad('messages.loading.error'),
          }, {
            error: String(error),
          }),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVariables();
  }, []);

  const isEmptyObject = (obj: Record<string, string> | null): obj is null => (!obj ||Object.keys(obj).length === 0);

  return (
    <Main aria-busy={loading}>
      <Header
        loadingError={loadingError}
        totalVariables={totalVariables}
        clickHandler={loadVariables}
      />

      <ContentLayout>
        <Flex
          justifyContent="flex-end"
          paddingBottom={4}
        >
          <FilterInput onFilterChange={setSearchValue} />
        </Flex>
        {
          loading && (<LoadingIndicatorPage />)
        }

        {
          isEmptyObject(variables) && !loading
            && (<EmptyStateLayout
                  hasRadius={true}
                  shadow={false}
                  content={{
                    id: getTrad('messages.empty'),
                  }}
                  action={<RequestButton clickHandler={loadVariables} />}
              />)
        }

        {
          !isEmptyObject(variables) && !loading
            && (<VariablesTable
                  variables={variables}
                  searchValue={searchValue}
                />)
        }
      </ContentLayout>
    </Main>
  );
};

export default HomePage;
