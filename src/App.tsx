import { useEffect } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAJE } from "./utils/languages";
import { translate } from "./services/translate";

function App() {
  const {
    fromLanguage,
    fromText,
    loading,
    result,
    toLanguage,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
    switchLanguajes,
  } = useStore();

  useEffect(() => {
    translate({
      fromLanguage,
      toLanguage,
      fromText
    })
      .then((json) => {
        if(fromText == null) return 
        setResult(json[0]?.map((item: string) => item[0]).join(""));
      })
      .catch((e) => {
        setResult("Error");
        console.log(e)
      });
  }, [fromLanguage, fromText, toLanguage]);
  return (
    <main className=" flex flex-col w-full h-screen justify-center items-center gap-2 bg-cyan-950">
      <h1>GTranslate</h1>
      <div className=" bg-white flex justify-center  items-center">
        <div className="flex flex-col gap-2 p-4">
          <LanguageSelector
            onChange={setFromLanguage}
            type="from"
            value={fromLanguage}
          />
          <TextArea onChange={setFromText} type="from" value={fromText} />
        </div>
        <button
          onClick={switchLanguajes}
          disabled={fromLanguage === AUTO_LANGUAJE}
        >
          Switch
        </button>
        <div className="flex flex-col gap-2 p-4">
          <LanguageSelector
            onChange={setToLanguage}
            type="to"
            value={toLanguage}
          />
          <TextArea
            loading={loading}
            onChange={setResult}
            type="to"
            value={result}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
