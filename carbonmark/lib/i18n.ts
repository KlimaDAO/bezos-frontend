import { getLocales } from "@klimadao/lib/utils";
import { i18n } from "@lingui/core";
import { IS_LOCAL_DEVELOPMENT, IS_PRODUCTION } from "lib/constants";

export const locales = getLocales(IS_PRODUCTION);

export const loadLocaleData = () => {
  console.log("will load locale data", i18n.localeData);
  for (const key in locales) {
    const locale = locales[key];
    i18n.loadLocaleData(key, { plurals: locale.plurals });
  }
  console.log("loaded locale data", i18n.localeData);
};

/**
 * Loads a translation file
 */
export const loadTranslation = async (locale = "en") => {
  loadLocaleData();
  let data;
  if (IS_LOCAL_DEVELOPMENT) {
    console.log("loading local development strings");
    // dynamic loading in dev https://lingui.js.org/ref/loader.html
    data = await import(`@lingui/loader!../locale/${locale}/messages.po`);
  } else {
    console.log("loading prod development strings");
    data = await import(`../locale/${locale}/messages`);
  }
  console.log(
    "loaded messages",
    data.messages["project.category.renewable_energy"]
  );
  return data.messages;
};
