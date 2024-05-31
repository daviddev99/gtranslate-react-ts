import { FromLanguage, Language } from "../types";
import { AUTO_LANGUAJE, LANGUAGES } from "../utils/languages";

type Props =
  | {
      type: "from";
      onChange: (language: FromLanguage) => void;
      value: FromLanguage;
    }
  | { type: "to"; onChange: (language: Language) => void; value: Language };

export const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as Language);
  };
  return (
    <select
      name=""
      id=""
      value={value}
      onChange={handleChange}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 "
    >
      {type === "from" && <option value={AUTO_LANGUAJE}>Auto</option>}
      {Object.entries(LANGUAGES).map(([key, literal]) => {
        return (
          <option value={key} key={key}>
            {literal}
          </option>
        );
      })}
    </select>
  );
};
