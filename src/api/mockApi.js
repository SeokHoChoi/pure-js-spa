const parseResponse = async (response) => {
  const { status } = response;
  let data;
  // 클라이언트의 요청은 정상적이나 컨텐츠를 제공하지 않는경우(HTTP Response body가 존재하지 않습니다)
  if (status !== 204) {
    data = await response.json();
  }

  return {
    status,
    data,
  };
};

const request = async (params) => {
  const { method = 'GET', url, headers = {}, body } = params;

  const config = {
    method,
    headers: new window.Headers(headers),
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  return parseResponse(response);
};

export const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: 'GET',
  });

  return response.data;
};
