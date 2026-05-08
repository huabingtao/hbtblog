/*
 * @Author: your name
 * @Date: 2021-02-24 22:53:11
 * @LastEditTime: 2021-03-20 12:23:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /hbtblog/docs/.vuepress/config.js
 */
module.exports = {
  dest: 'public',
  title: "Hbt'blog",
  theme: "@vuepress/theme-blog",
  base: "/hbtblog/",
  description: "blog",
  head: [["link", { rel: "shortcut icon", href: `./favicon.ico` }]],
  port: "2021",
  tags: "/tags",
  markdown: {
    lineNumbers: true,
  },
  plugins: ["@vuepress/active-header-links", "@vuepress/back-to-top"],
  themeConfig: {
    dateFormat: "YYYY-MM-DD",
    logo: "/logo.png",
    nav: [
      {
        text: "掘金",
        link: "https://juejin.cn/user/8451822992855/posts",
        target: "_blank",
      },
      {
        text: "GitHub",
        link: "https://github.com/huabingtao",
        target: "_blank",
      }
    ],
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/huabingtao",
        },
      ],
      copyright: [
        {
          text: "MIT Licensed | Copyright © 2020-present HuaBingTao",
          link: "",
        },
      ],
    },
    comment: {
      // Which service you'd like to use
      service: "vssue",
      // The owner's name of repository to store the issues and comments.
      owner: "huabingtao",
      // The name of repository to store the issues and comments.
      repo: "hbtblog",
      // The clientId & clientSecret introduced in OAuth2 spec.
      clientId: process.env.VSSUE_CLIENT_ID || "",
      clientSecret: process.env.VSSUE_CLIENT_SECRET || "",
    },
    sidebarDepth: 6,
    displayAllHeaders: false,
    smoothScroll: true, // 页面滚动
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@alias": "path/to/some/dir",
      },
    },
  },
};
