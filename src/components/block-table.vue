<template>
  <b-form class="bodyTable">
    <b-form-group>
      <b-button variant="outline-primary" @click="fetchData"
        >Fetch Api</b-button
      >
    </b-form-group>
    <b-form-row class="d-flex justify-content-center mb-5">
      <div>
        <b-form-input v-model="formData" trim></b-form-input>
      </div>
      <div class="ml-2">
        <b-button @click="insert" variant="success">Insert</b-button>
      </div>
    </b-form-row>
    <b-form-group>
      <b-table hover :items="items">
        <template #table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong>Loading...</strong>
          </div>
        </template>
        <template #cell(active)="row">
          <b-icon-check-square-fill
            v-if="row.item.active"
          ></b-icon-check-square-fill>
          <b-icon-check-square
            v-else-if="!row.item.active"
          ></b-icon-check-square>
        </template>
        <template #cell(timestamp)="row">
          {{ row.item.timestamp }}
          <b-row class="d-flex justify-content-center">
            <b-button
              :variant="row.item.active ? 'info' : 'warning'"
              @click="updateData(row.item)"
              >{{ row.item.active }}</b-button
            >
            <b-button
              class="ml-2"
              variant="danger"
              @click="deleteItem(row.item)"
              >delete</b-button
            >
          </b-row>
        </template>
      </b-table>
    </b-form-group>
  </b-form>
</template>

<script>
import aws from "../connectDB.js";
const TABLE = "table_user";
export default {
  name: "Table",
  data() {
    return {
      formData: "",
      items: [],
    };
  },
  methods: {
    async insert() {
      console.log("test insert");
      const data = {
        userId: "1234",
        timestamp: new Date().valueOf(),
        name: this.formData,
        active: false,
      };
      let params = {
        TableName: TABLE,
        Item: data,
      };
      await aws.docClient.put(params).promise();
      this.fetchData();
      this.$bvToast.toast("Insert Success", {
        title: `Insert Success`,
        variant: "success",
        solid: true,
      });
    },
    async fetchData() {
      let params = {
        TableName: TABLE,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": "1234" },
      };
      let data = await aws.docClient.query(params).promise();
      this.items = data.Items;
    },
    async deleteItem(items) {
      const params = {
        TableName: TABLE,
        Key: {
          userId: items.userId,
          timestamp: items.timestamp,
        },
      };
      await aws.docClient.delete(params).promise();
      this.fetchData();
      this.$bvToast.toast("Delete Success", {
        title: `Delete Success`,
        variant: "danger",
        solid: true,
      });
    },
    async updateData(items) {
      let data = {
        ...items,
        active: !items.active,
      };
      const params = {
        TableName: TABLE,
        Item: data,
      };

      await aws.docClient.put(params).promise();
      this.fetchData();
      this.$bvToast.toast("Update Success", {
        title: `Update Success`,
        variant: "success",
        solid: true,
      });
    },
  },
};
</script>

<style>
.bodyTable {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.table {
  width: 100%;
}
td {
  border: 0;
}
</style>