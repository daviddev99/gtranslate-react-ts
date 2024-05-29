import { FromLanguage, Language } from "../types";

interface Props {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  fromText: string;
}
export const translate = ({ fromLanguage, fromText, toLanguage }: Props) => {
  const url = `${
    import.meta.env.VITE_API_URL
  }?client=gtx&sl=${fromLanguage}&tl=${toLanguage}&dt=t&q=${encodeURI(
    fromText
  )}`;

  return fetch(url).then((response) => response.json());
};
