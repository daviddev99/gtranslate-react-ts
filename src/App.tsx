import { useEffect } from "react";
import { LanguageSelector } from "./components/LanguageSelector";
import { TextArea } from "./components/TextArea";
import { useStore } from "./hooks/useStore";
import { AUTO_LANGUAJE, LANGUAGES } from "./utils/languages";
import { translate } from "./services/translate";
import { useDebounce } from "./hooks/useDebounce";
import {
  CopyClipboardButton,
  GitHubIcon,
  LinkedInIcon,
  SpeakButton,
  SwitchButton,
} from "./components/Icons";

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

  const debouncedValue = useDebounce(fromText, 500);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result);
    utterance.lang = LANGUAGES[toLanguage];
    speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    translate({
      fromLanguage,
      toLanguage,
      fromText: debouncedValue,
    })
      .then((json) => {
        if (debouncedValue == null) return;
        setResult(json[0]?.map((item: string) => item[0]).join(""));
      })
      .catch((e) => {
        setResult("Error");
        console.log(e);
      });
  }, [fromLanguage, debouncedValue, toLanguage]);

  return (
    <main className="  flex flex-col w-full  justify-center h-fit sm:h-screen items-center gap-2 ">
      <h1 className="text-4xl font-semibold my-4">GTranslate</h1>

      <div className=" shadow-container rounded-2xl flex flex-col sm:flex-row justify-center  items-center">
        <div className="flex flex-col gap-2 p-4 h-full">
          <LanguageSelector
            onChange={setFromLanguage}
            type="from"
            value={fromLanguage}
          />
          <TextArea onChange={setFromText} type="from" value={fromText} />
          <div className="hidden md:flex justify-between md:invisible">
            <div className="group flex relative gap-8">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={handleSpeak}
              >
                <SpeakButton />
              </button>
              <span
                className="group-hover:opacity-100 transition-opacity bg-gray-800 text-md text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 mt-2 py-1 px-3 mx-auto"
              >
                Listen
              </span>
            </div>
            <div className="group flex relative gap-8">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => {
                  navigator.clipboard.writeText(result).catch(() => {});
                }}
              >
                <CopyClipboardButton />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 text-md text-nowrap text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 mt-2 opacity-0 py-1 px-3 mx-auto"
                >
                  Copy translation
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="group flex relative gap-8">
          <button
            onClick={switchLanguajes}
            disabled={fromLanguage === AUTO_LANGUAJE}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <SwitchButton />
          </button>
          <span
            className="group-hover:opacity-100 transition-opacity bg-gray-800 text-md text-nowrap text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full mt-2 opacity-0 py-1 px-3 mx-auto"
          >
            Switch languages
          </span>
        </div>
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
          <div className="flex justify-between">
            <div className="group flex relative gap-8">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={handleSpeak}
              >
                <SpeakButton />
              </button>
              <span
                className="group-hover:opacity-100 transition-opacity bg-gray-800 text-md text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 mt-2 py-1 px-3 mx-auto"
              >
                Listen
              </span>
            </div>
            <div className="group flex relative gap-8">
              <button
                className="p-2 rounded-full hover:bg-gray-200"
                onClick={() => {
                  navigator.clipboard.writeText(result).catch(() => {});
                }}
              >
                <CopyClipboardButton />
                <span
                  className="group-hover:opacity-100 transition-opacity bg-gray-800 text-md text-nowrap text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 mt-2 opacity-0 py-1 px-3 mx-auto"
                >
                  Copy translation
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col my-4 gap-2 items-center">
        <p className="flex  gap-2">
          Made by David Abed{" "}
          <a
            href="https://github.com/daviddev99"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>{" "}
          <a
            href="https://linkedin.com/in/davidabeddev"
            target="_blank"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
        </p>
      </div>
    </main>
  );
}

export default App;
