// NOTE: Move to axios for better error handling :)

export const fetchData = async (apiEndpoint, apiParams) => {
  let urlParms = '';
  Object.keys(apiParams).forEach(key => {
    urlParms += `${key}=${apiParams[key]}&`;
  });

  const res = await fetch(`/api/${apiEndpoint}?${urlParms}`);
  return await res.json();

  // stockApiError: errorMsg,
  // trendApiError: errorMsg
};
