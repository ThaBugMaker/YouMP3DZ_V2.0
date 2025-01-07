import { ref } from "vue";

const isDark = ref<boolean>(false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.documentElement.classList.toggle("dark", isDark.value);
  localStorage.setItem("darkMode", isDark.value ? "true" : "false");
};

const setInitialTheme = () => {
  const storedTheme = localStorage.getItem("darkMode");
  if (storedTheme === "true") {
    isDark.value = true;
    document.documentElement.classList.add("dark");
  }
};

setInitialTheme();

export function useDarkMode() {
  return { isDark, toggleDarkMode };
}
