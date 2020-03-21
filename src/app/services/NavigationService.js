// import {
//   useHistory,
// } from 'react-router-dom';
import { get, reduce, compact, pickBy, identity } from 'lodash';

//TODO handle array values[]
function navigate(history, path = '/', params = {}) {
    const currentParamsString = get(history, 'location.search', '');
    const currentParamsArray = compact(currentParamsString.split('&'));

    const currentParamsObject = reduce(currentParamsArray, (result, value, key) => {
        let paramsKVSplit = value.split('=');
        if (key === 0) paramsKVSplit[0] = paramsKVSplit[0].substr(1);
        result[paramsKVSplit[0]] = paramsKVSplit[1];
        return result
    }, {});

    let mergedParams = {...currentParamsObject, ...params};
    mergedParams = pickBy(mergedParams, identity); // remove falsey values
    const mergedParamsString = new URLSearchParams(mergedParams).toString();

    history.push(path + '?' + mergedParamsString)
}

export default {
    navigate,
}