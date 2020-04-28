module.exports = {
  title: "Hbt'blog",
  theme: "@vuepress/theme-blog",
  base: "/",
  description: "blog",
  head: [["link", { rel: "icon", href: `./favicon.ico` }]],
  port: "2020",
  tags: "/tags",
  markdown: {
    lineNumbers: true
  },
  plugins: ["@vuepress/active-header-links", "@vuepress/back-to-top"],
  themeConfig: {
    dateFormat: "YYYY-MM-DD",
    logo: "/logo.png",
    nav: [
      {
        text: "个人简历",
        link: "/my/my"
      },
      {
        text: "掘金",
        link: "https://juejin.im/user/592418062f301e006b2db045/posts",
        target: "_blank"
      },
      {
        text: "GitHub",
        link: "https://github.com/huabingtao",
        target: "_blank"
      }
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/huabingtao"
        }
      ],
      copyright: [
        {
          text: "MIT Licensed | Copyright © 2020-present HuaBingTao",
          link: ""
        }
      ]
    },
    comment: {
      // Which service you'd like to use
      service: "vssue",
      // The owner's name of repository to store the issues and comments.
      owner: "You",
      // The name of repository to store the issues and comments.
      repo: "Your repo",
      // The clientId & clientSecret introduced in OAuth2 spec.
      clientId: "b0a4f179d5e6a65ce11b",
      clientSecret: "adf8f30c5f505c36bd52d7748ae349317bb46451"
    },
    sidebarDepth: 6,
    displayAllHeaders: false,
    smoothScroll: true // 页面滚动
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "path/to/some/dir"
      }
    }
  }
};
