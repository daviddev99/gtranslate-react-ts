import { AUTO_LANGUAJE, LANGUAGES } from "./utils/languages"

export interface State {
    fromLanguage: FromLanguage,
    toLanguage: Language,
    fromText: string,
    result: string,
    loading: boolean,
}

export type Action =
 | {type: 'SET_FROM_LANGUAGE', payload: FromLanguage}
 | {type: 'SET_FROM_TEXT', payload: string}
 | {type: 'SET_TO_LANGUAGE', payload: Language}
 | {type: 'SET_RESULT', payload: string}
 | {type: 'SWITCH_LANGUAGES'}

 export type Language =  keyof typeof LANGUAGES
 export type AutoLanguage = typeof AUTO_LANGUAJE
 export type FromLanguage = Language | AutoLanguage