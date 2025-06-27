import { LocalePrefix } from "next-intl/routing";

export const AppConfig = {
  locales: ['en', 'zh', 'ja'], // 支持的语言
  localePrefix: 'as-needed' as LocalePrefix,   // 或 'always'，根据你的 next-intl 配置
  defaultLocale: 'en',         // 默认语言
};
