module.exports = {
  title: "Hbt'blog",
  base: "/",
  description: "Vue React Node Koa2",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  port: "2020",
  tags: "/tags",
  markdown: {
    lineNumbers: true
  },
  plugins: ["@vuepress/active-header-links", "@vuepress/back-to-top"],
  themeConfig: {
    logo: "/logo.png",
    nav: [
      {
        text: "个人简历",
        link: "/my/my"
      },
      {
        text: "掘金",
        link: "https://juejin.im/user/592418062f301e006b2db045",
        target: "_blank"
      },
      {
        text: "GitHub",
        link: "https://github.com/huabingtao",
        target: "_blank"
      }
    ],
    sidebarDepth: 6,
    displayAllHeaders: false,
    // sidebar: ["/node/diary", "/my/my"],
    smoothScroll: true // 页面滚动
  },
  lastUpdated: "Last Updated", // string | boolean
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "path/to/some/dir"
      }
    }
  }
};
