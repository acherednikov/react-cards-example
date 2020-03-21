import { useLocation } from 'react-router-dom';

const useQueryParam = (paramName, defaultName) => {
  const query = new URLSearchParams(useQuery());
  const param = query.get(paramName) || defaultName;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  return param
};

export default useQueryParam;