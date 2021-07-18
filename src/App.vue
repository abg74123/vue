<template>
  <div id="App" class="container p-4">
    <div>
      <h2>Tets Vue<b-badge variant="warning">V 0.1</b-badge></h2>
    </div>
    <div>
      <Table />
    </div>
    <div>
      <ContentPic />
    </div>
    <b-row class="mt-5">
      <b-col><cardProduct title="มะละกอ"/></b-col>
      <b-col><cardProduct title="กล้วย" /></b-col>
      <b-col><cardProduct title="ส้ม" /></b-col>
      <b-col><cardProduct title="แอปเปิ้ล" /></b-col>
    </b-row>
    <div>
      <footer class="text-center mt-5">END PAGE</footer>
    </div>
  </div>
</template>

<script>
import Table from "./components/block-table.vue";
import ContentPic from "./components/content.vue";
import CardProduct from "./components/card-product.vue"

export default {
  name: "App",
  components: {
    Table,
    ContentPic,
    CardProduct
  },
};
</script>

<style>
</style>
