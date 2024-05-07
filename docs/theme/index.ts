import "./styles/vars.css";
import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
};

// Vue School banner, skip on SSG or in an iframe
if (typeof window !== "undefined" && window.self === window.top) {
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://vueschool.io/banner.js?affiliate=vueuse&type=bottom";
  document.head.appendChild(script);
}
