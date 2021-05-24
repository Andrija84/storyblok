<template>
<section>
    <img :src="blok.image.filename" alt="">
    <h2 class="pt-2 pb-4 text-2xl font-bold">
      {{ blok.title }}
    </h2>
    <p class="pb-6 leading-relaxed">
      {{ blok.content }}
    </p>
</section>


</template>
 
<script>
export default {
  props: {
    blok: {
      type: Object,
      required: true
    }
  }
}
</script>
 
<style>
.post-teaser:hover {
  box-shadow: 0px 0px 15px 0px rgba(0,0,0,0.75);
}
</style>