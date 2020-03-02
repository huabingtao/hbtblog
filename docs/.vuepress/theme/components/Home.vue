<template>
  <main class="home" aria-labelledby="main-title">
    <div class="wrap">
      <div class="home-art">
        <Article :arts="arts" v-if="arts.length" />
      </div>
      <div class="home-sidebar">
        <div class="sidebar-box">
          <div class="sidebar-header">
            <i class="icon"></i>
            分类
          </div>
          <div class="sidebar-content">
            <ul class="sidebar-ul">
              <li
                class="sidebar-li"
                @click="onClickTag(item.tag)"
                v-for="item in tags"
              >
                {{ item.tag }}({{ item.number }})
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="footer" v-if="data.footer">{{ data.footer }}</div>
  </main>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import Article from "./Article";
import { cloneDeep } from "loadsh";

export default {
  data() {
    return {
      arts: [],
      tags: []
    };
  },
  components: { NavLink, Article },
  created() {
    this.initTag();
  },
  computed: {
    data() {
      return this.$page.frontmatter;
    }
  },
  methods: {
    initTag() {
      let arts = cloneDeep(this.$site.pages);
      console.log(this.$site);
      this.originArts = cloneDeep(this.$site.pages);
      arts = arts.filter(art => {
        console.log(art.frontmatter.show);
        if (art.title === "Home") {
          return false;
        }
        if (!art.frontmatter.show) {
          return false;
        }
        return true;
      });
      this.arts = arts;

      let allTags = [];
      arts.forEach(art => {
        if (!art.frontmatter.tags) {
          return;
        }
        allTags.push(...art.frontmatter.tags);
      });
      let flatTags = Array.from(new Set(allTags));
      let tags = flatTags.reduce((res, v) => {
        let o = {};
        o.tag = v;
        o.number = allTags.filter(value => value === v).length;
        res.push(o);
        return res;
      }, []);
      this.tags = tags;
    },
    onClickTag(tagName) {
      let arts = this.originArts.filter(art => {
        if (!art.frontmatter.tags) {
          return false;
        }
        return art.frontmatter.tags.includes(tagName);
      });
      this.arts = arts;
    }
  }
};
</script>

<style lang="stylus" scoped>
.home {
  padding: $navbarHeight 2rem 0;
  max-width: 960px;
  margin: 0px auto;

  .wrap {
    display: flex;
  }

  .home-art {
    margin-top: 1rem;
    width: 70%;
    margin-right 2rem;
  }

  .home-sidebar {
    flex: 1;
    margin-top 1rem;
    .sidebar-box{
      border-radius: 10px;
      background: #fff;
      margin-bottom: 20px;
      .sidebar-header{
        padding: 5px 20px;
        border-bottom: 1px solid #f6f6f6;
        font-size: 1.44rem;
        font-weight: 700;
        color: #515a6e;
      }
      .sidebar-content{
        padding: 15px 20px;
        .sidebar-ul{
          list-style none
          margin 0
          padding 0
          li{
            cursor pointer
            height 2rem
            line-height 2rem
            &:hover{
              color: #409eff;
            }
          }
        }
      }
    }
  }

  .hero {
    text-align: center;

    img {
      max-width: 100%;
      max-height: 280px;
      display: block;
      margin: 3rem auto 1.5rem;
    }

    h1 {
      font-size: 3rem;
    }

    h1, .description, .action {
      margin: 1.8rem auto;
    }

    .description {
      max-width: 35rem;
      font-size: 1.6rem;
      line-height: 1.3;
      color: lighten($textColor, 40%);
    }

    .action-button {
      display: inline-block;
      font-size: 1.2rem;
      color: #fff;
      background-color: $accentColor;
      padding: 0.8rem 1.6rem;
      border-radius: 4px;
      transition: background-color 0.1s ease;
      box-sizing: border-box;
      border-bottom: 1px solid darken($accentColor, 10%);

      &:hover {
        background-color: lighten($accentColor, 10%);
      }
    }
  }

  .features {
    border-top: 1px solid $borderColor;
    padding: 1.2rem 0;
    margin-top: 2.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: stretch;
    justify-content: space-between;
  }

  .feature {
    flex-grow: 1;
    flex-basis: 30%;
    max-width: 30%;

    h2 {
      font-size: 1.4rem;
      font-weight: 500;
      border-bottom: none;
      padding-bottom: 0;
      color: lighten($textColor, 10%);
    }

    p {
      color: lighten($textColor, 25%);
    }
  }

  .footer {
    padding: 2.5rem;
    border-top: 1px solid $borderColor;
    text-align: center;
    color: lighten($textColor, 25%);
  }
}

@media (max-width: $MQMobile) {
  .home {
    .features {
      flex-direction: column;
    }

    .feature {
      max-width: 100%;
      padding: 0 2.5rem;
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home {
    padding-left: 1.5rem;
    padding-right: 1.5rem;

    .hero {
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        font-size: 2rem;
      }

      h1, .description, .action {
        margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .feature {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
