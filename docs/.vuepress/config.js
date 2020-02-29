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
        text: "GitHub",
        link: "https://github.com/huabingtao",
        target: "_blank"
      }
    ],
    sidebarDepth: 6,
    displayAllHeaders: false,
    sidebar: ["/node/diary"],
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
