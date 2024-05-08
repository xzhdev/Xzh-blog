// vitepress/config.js
import { defineConfig } from "vitepress";
const Guide = [
  { text: "JavaScript", link: "/guide/javascript" },
  { text: "Git", link: "/guide/git" },
  { text: "Configurations", link: "/guide/config" },
  { text: "Components", link: "/guide/components" },
  { text: "Contributing", link: "/contributing" },
  { text: "Guidelines", link: "/guidelines" },
];
const Links = [
  { text: "Add-ons", link: "/add-ons" },
  { text: "Ecosystem", link: "/ecosystem" },
  { text: "Export Size", link: "/export-size" },
  { text: "Recent Updated", link: "/functions.html#sort=updated" },
  { text: "Why no translations?", link: "/why-no-translations" },
];

const Learn = [
  {
    text: "Premium Video Course",
    link: "https://vueschool.io/courses/vueuse-for-everyone?friend=vueuse",
  },
  {
    text: "Official Vue Certification",
    link: "https://certification.vuejs.org/?utm_source=vueuse&utm_medium=website&utm_campaign=affiliate&utm_content=guide&banner_type=text&friend=VUEUSE",
  },
];

const DefaultSideBar = [
  { text: "指南", items: Guide },
  { text: "Learn", items: Learn },
  { text: "Links", items: Links },
];

export default defineConfig({
  title: "XzhBlog", // 网站标题
  description: "我的vitepress博客.", //网站描述
  base: "/XzhBlog/", //  部署时的路径 默认 /  可以使用二级地址 /base/
  lastUpdated: true,
  // lang: 'en-US', //语言
  head: [
    ["meta", { name: "theme-color", content: "#ffffff" }],
    ["link", { rel: "icon", href: "/favicon.ico", sizes: "48x48" }],
    [
      "link",
      {
        rel: "icon",
        href: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
    ["meta", { name: "author", content: "Anthony Fu" }],
    ["meta", { property: "og:title", content: "VueUse" }],
    ["meta", { name: "referrer", content: "no-referrer" }],
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1.0, viewport-fit=cover",
      },
    ],

    ["link", { rel: "dns-prefetch", href: "https://fonts.gstatic.com" }],
    [
      "link",
      {
        rel: "preconnect",
        crossorigin: "anonymous",
        href: "https://fonts.gstatic.com",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fira+Code&display=swap",
      },
    ],
  ],

  // 主题配置
  themeConfig: {
    logo: "/favicon.svg",
    outline: {
      label: "页面导航",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2020-PRESENT Anthony Fu and VueUse contributors",
    },
    socialLinks: [{ icon: "github", link: "https://github.com/xzhdev" }],
    nav: [
      { text: "首页", link: "/" },
      {
        text: "指南",
        items: DefaultSideBar,
      },
    ],
    //   侧边导航
    sidebar: {
      "/guide/": DefaultSideBar,
      "/contributing": DefaultSideBar,
      "/add-ons": DefaultSideBar,
      "/ecosystem": DefaultSideBar,
      "/guidelines": DefaultSideBar,
      "/export-size": DefaultSideBar,
    },
  },
});
