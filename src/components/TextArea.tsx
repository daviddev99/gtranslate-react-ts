type Props =
  | {
      type: "from";
      onChange: (value: string) => void;
      value: string;
      loading?: boolean;
    }
  | {
      type: "to";
      onChange: (value: string) => void;
      value: string;
      loading: boolean;
    };

const getPlaceholder = ({
  type,
  loading,
}: {
  type: string;
  loading?: boolean;
}) => {
  if (type === "from") return "Introducir texto";
  if (loading === true) return "Cargando...";
  return "Traducción";
};

export const TextArea = ({ onChange, type, value, loading }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      autoFocus={type === "from" ? true : false}
      name=""
      id=""
      onChange={handleChange}
      value={value}
      placeholder={getPlaceholder({ type, loading })}
      className={`block h-[350px] w-[330px] p-2 resize-none text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none  ${
        type === "to" ? "bg-gray-200 outline-0 outline-none border-none" : ""
      }`}
      readOnly={type === "from" ? false : true}
    ></textarea>
  );
};
