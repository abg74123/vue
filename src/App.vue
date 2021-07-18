<template>
  <div id="app">
    <div>
      <button>fetch Api</button>
    </div>
    <p>
    <div>
      <input type="text" v-model="formData">
      <button @click="insert">Insert</button>
    </div>
    <p>

    <div>
      <table border="1">
        <thead>
<th>
          <td>id</td>
          <td>name</td>
          <td>age</td>
        </th>
        </thead>
        
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import aws from "./connectDB.js";
export default {
  name: "App",
  data() {
    return {
      formData: "",
    };
  },
  methods: {
    async insert() {
      console.log('test insert');
      const data = {
        userId: "U000"+Math.floor(Math.random(1000)*1000),
        timestamp: new Date().valueOf(),
        name: this.formData
      };
      let params = {
        TableName: "table_user",
        Item: data,
      };
      await aws.docClient.put(params).promise();
      alert("create success");
    },
    getData(){
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table {
  margin: auto;
}
</style>
