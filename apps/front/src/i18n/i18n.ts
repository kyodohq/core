import i18n from "i18next";
import { resolveResource } from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/plugin-fs";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

export const supportedLanguages = {
  "en-US": "english",
  "fr-FR": "french",
};

export const supportedLanguagesKeys = Object.keys(supportedLanguages);
export const supportedLanguagesValues = Object.values(supportedLanguages);

export function getI18nLanguageName() {
  const name =
    supportedLanguages[i18n.language as keyof typeof supportedLanguages];
  return name;
}

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(async (language: string) => {
      if (!supportedLanguagesKeys.includes(language)) {
        return;
      }
      const resourcePath = `./locales/${language}`;
      const languageDirectory = await resolveResource(resourcePath);
      let files;
      try {
        files = await fs.readDir(languageDirectory);
      } catch (readDirError) {
        return;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const translations: any = {};
      await Promise.all(
        files.map(async (file) => {
          const filePath = `${languageDirectory}/${file.name}`;
          const namespace = file.name.replace(".json", "");
          const content = await fs.readTextFile(filePath);
          translations[namespace] = JSON.parse(content);
        }),
      );
      return translations;
    }),
  )
  .init({
    debug: false,
    fallbackLng: "en-US",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
export default i18n;
