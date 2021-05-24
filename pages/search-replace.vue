<template>
  <section>
    <h2 class="">This is a search and replace page</h2>
    <p>Here you can search and replace inside all stories on Storyblok</p>
    <input type="text" placeholder="Enter word you want to replace">
    <input type="text" placeholder="Enter word to replace word entered above">
    <p v-if="showSuccessMessage">Word has been replaced</p>
    <p v-if="showErrorMessage">No matched words</p>
    <button @click="replaceWord">Replace</button>


    <pre>{{posts}}</pre>


  </section>
</template>
 
<script>
export default {
  data () {
    return {
      posts:[],
      showSuccessMessage: false,
      showErrorMessage: false
    }
  },
  methods:{
    getAllPosts(){
      this.$storyapi.get('cdn/stories', {
        starts_with: 'posts/',
        version: 'draft'
      }).then((res) => {
        console.log(res.data.stories)
        this.posts = res.data.stories
      }).catch((res) => {
        if (!res.response) {
          console.error(res)
          context.error({ statusCode: 404, message: 'Failed to receive content form api' })
        } else {
          console.error(res.response.data)
          context.error({ statusCode: res.response.status, message: res.response.data })
        }
      })
    },
     replaceWord(){
       console.log('clicked')
     }
  },
 
  created(){     
    this.getAllPosts();
  }

}
</script>