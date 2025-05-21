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

export function removeEmotes(message: string, emotes_range: string[]) {
  const range_list = emotes_range.map(range => {
    let [start, end] = range.split('-').map(Number);

    [start, end] = [Math.min(start, end), Math.max(start, end)];
  
    return { start, end };
  }).sort((a, b) => b.start - a.start);

    const arr = [...message];

    for (const { start, end } of range_list) {
      if (start >= arr.length) {
        continue
      };

      const adjusted_end = Math.min(end, arr.length - 1);

      arr.splice(start, adjusted_end - start + 1);
    }

    return arr.join('');
}
