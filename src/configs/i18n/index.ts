import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./scriptEn";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: { en },
        lng: "en", // language to use
        // you can use the i18n.changeLanguage function to change the language manually
        // if you're using a language detector, do not define the lng option

        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

export default i18n;
