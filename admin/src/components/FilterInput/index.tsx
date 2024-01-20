import {
  SearchForm,
  Searchbar,
} from '@strapi/design-system';
import {
  useState,
  useEffect,
} from 'react';
import { useIntl } from 'react-intl';
import { getTrad } from '../../utils';
import useDebounce from './useDebounce';

export interface IFilterInputProps {
  onFilterChange: (value: string) => void
}

const FilterInput = ({ onFilterChange }: IFilterInputProps) => {
  const { formatMessage } = useIntl();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(
    () => {
      onFilterChange(debouncedSearch);
    },
    [debouncedSearch],
  );

  return (
    <SearchForm>
      <Searchbar
        placeholder={formatMessage({
          id: getTrad('ui.search'),
        })}
        value={search}
        onClear={() => setSearch('')}
        onInput={(e: InputEvent) => setSearch((e.target as HTMLInputElement).value)}
      />
    </SearchForm>
  );
};

export default FilterInput;
