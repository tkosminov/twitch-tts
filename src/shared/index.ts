export * from './queue'

export enum EI18nLang {
  RU = 'ru',
  EN = 'en',
}

export enum ETheme {
  DARK = 'dark',
  LIGHT = 'light',
}

export function getQueryParam(param_name: string) {
  const query_params = new URLSearchParams(window.location.search);

  return query_params.get(param_name)
}
