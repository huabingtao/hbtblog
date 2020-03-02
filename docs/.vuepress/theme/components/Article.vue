<template>
  <div class="container">
    <div class="box-item" v-for="(art, index) in arts" :key="index">
      <router-link :to="{ path: art.path }">
        <div class="content-box">
          <div class="info-box">
            <div class="info-row">
              <ul class="meta-row">
                <li
                  class="item"
                  v-if="art.frontmatter.tags.length"
                  v-for="tag in art.frontmatter.tags"
                >
                  {{ tag }}
                </li>
              </ul>
            </div>
            <div class="info-row">
              <div class="title">{{ art.frontmatter.title }}</div>
            </div>
            <div class="info-row title-row">{{ art.frontmatter.tagline }}</div>
          </div>
          <div class="img">
            <img :src="art.frontmatter.img" width="100%" />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["arts"]
};
</script>

<style lang="stylus" scoped>
.container {
  background: #fff;

  .box-item:not(last-child) {
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);

    .content-box {
      display: flex;
      align-items: center;
      padding: 1.5rem 2rem;
    }
  }

  .info-box {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;

    .title-row {
      margin: 0.5rem 0 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .title {
      font-size: 1.4rem;
      font-weight: 600;
      line-height: 1.2;
      color: #2e3135;
    }

    .meta-row {
      font-size: 1rem;
      color: #b2bac2;
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      .item {
        margin-right: 1rem;
      }
    }
  }

  .img {
    flex: 0 0 auto;
    width: 5rem;
    height: 5rem;
    margin-left: 2rem;
    background-color: #fff;
    border-radius: 2px;
    display: flex;
    align-items: center;
  }
}
</style>
