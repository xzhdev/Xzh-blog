---
layout: home
sidebar: false

hero:
  name: 熊支辉
  text: 个人博客
  tagline: 好记性不如烂笔头，站在岸上学不会游泳
  image:
    src: /favicon.svg
    alt: VueUse
  actions:
    - theme: brand
      text: 开始
      link: /guide/javascript.md

features:
  - title: 持续集成
    details: 随着视频的不断更新，文档也在不断丰富，观看视频时对照文档学习效果更好
    icon: 🎛
  - title: 内容丰富
    details: 大部分视频课程都提供了文档，文档内容精炼，摒弃掉啰嗦无用内容
    icon: 🚀
---

<style>
:root {
 --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(
    120deg,
    #35495e -80%,
    #41b883
  );
  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #41b88380 30%,
    #35495e80
  );
  --vp-home-hero-image-filter: blur(30px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>