
import { useState, useMemo } from 'react';
import * as R from 'ramda';
import { filterEmpties } from '~/common/DTO';

export const useSearchLazy = (schema) => {
  const [query, setQuery] = useState({});
  const schemaKeys = R.keys(schema);

  const search = (data) => {
    const queryFiltered = R.pipe(
      R.pick(schemaKeys),
      R.toPairs,
      R.filter((item) => !filterEmpties(item[1])),
      R.fromPairs,
    )(query);
    const schemaFiltered = R.pipe(
      R.keys,
      R.pick(R.__, schema),
      R.toPairs,
      R.map(([key, value]) => [key, value(queryFiltered[key])]),
      R.fromPairs,
    )(queryFiltered)

    return R.filter(R.where(schemaFiltered), data);
  };

  return {
    setSearch: setQuery,
    search,
  };
};

const useSearch = (schema, data, deps) => {
  const { search, setSearch } = useSearchLazy(schema);

  const searchData = useMemo(() => {
    return search(data);
  }, [...deps, search]);

  return {
    data: searchData,
    setSearch,
  };
};

export default useSearch;
