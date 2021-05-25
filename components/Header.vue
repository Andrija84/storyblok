<template>
  <div class="main-header container">
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/search-replace">Search / Replace</nuxt-link>
  </div>
</template>

<script>

 
export default {

}  
</script>

<style scoped>
.container{max-width:1200px;margin:0 auto;}

.main-header{background-color:#ddd;width:100%;height:75px;margin-bottom:25px;padding:25px 12px;}
.main-header a{font-size:16px;font-weight:600;line-height:16px;margin-right:12px;padding-right:12px;border-right:2px solid #000;text-transform: uppercase;color:#000;text-decoration: none;}
.main-header a:last-child{border:none;}

</style>
