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
      className={`h-[200px] w-[200px] border-none outline-blue-200 resize-none  ${
        type === "to" ? "bg-[#f5f5f5] outline-0 outline-none" : ""
      }`}
      readOnly={type === "from" ? false : true}
    ></textarea>
  );
};
