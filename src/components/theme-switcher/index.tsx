import { MonitorOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useDarkMode } from "@root/hooks/theme.hook";

export const ThemeSwitcher = () => {
  const { activeIndex, enableDarkMode, enableAutoDetect, enableLightMode } =
    useDarkMode();

  const baseBtn =
    "flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200";
  const getButtonClass = (index: number) =>
    `${baseBtn} ${
      activeIndex === index
        ? "bg-blue-600 text-white dark:bg-blue-400"
        : "text-gray-600 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-200 dark:hover:bg-white/10"
    }`;

  return (
    <div className="flex items-center h-10 w-[112px] px-1 bg-white dark:bg-neutral-800 rounded-full shadow-md transition-opacity opacity-50 hover:opacity-100">
      <button
        title="Auto Theme"
        onClick={enableAutoDetect}
        className={getButtonClass(2)}
        aria-label="Auto Theme"
      >
        <MonitorOutlined className="text-base" />
      </button>
      <button
        onClick={enableDarkMode}
        className={getButtonClass(1)}
        title="Dark Theme"
        aria-label="Dark Theme"
      >
        <MoonOutlined className="text-base" />
      </button>
      <button
        onClick={enableLightMode}
        className={getButtonClass(0)}
        title="Light Theme"
        aria-label="Light Theme"
      >
        <SunOutlined className="text-base" />
      </button>
    </div>
  );
};
