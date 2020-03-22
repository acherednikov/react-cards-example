import { useHistory } from 'react-router-dom';
import { get, reduce, compact, pickBy, identity } from 'lodash';


const useNavigation = () => {
  const history = useHistory();

  //TODO handle array values[]
  // function navigate(path = '/', params = {}) {
  function navigate({ path = null, params = {} }) {
      const currentParamsString = get(history, 'location.search', '');
      const currentParamsIterator = new URLSearchParams(currentParamsString).entries();
      const currentParamsObject = paramsIteratorToObject(currentParamsIterator);

      let mergedParams = {...currentParamsObject, ...params};
      mergedParams = pickBy(mergedParams, identity); // remove falsey values
      const mergedParamsString = new URLSearchParams(mergedParams).toString();

      console.log('=> useNavigation', history.location.pathname)
      const to = (path === null) ? history.location.pathname : path

      history.push(to + '?' + mergedParamsString)
  }

  function paramsIteratorToObject(entries) {
    let result = {}
    for(let entry of entries) { // each 'entry' is a [key, value] tupple
      const [key, value] = entry;
      result[key] = value;
    } 
    return result;
  }

  return navigate
};

export default useNavigation;