<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text---secondary mb-3">Create New Product</h1>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            name="tetle"
            label="Title"
            type="text"
            required
            :rules="[v => !!v || 'Tltle is require']"
            v-model="title"
          ></v-text-field>
          <v-text-field
            name="vendor"
            label="Vendor Product"
            type="text"
            v-model="vendor"
          ></v-text-field>
            <v-text-field
            name="color"
            label="Color Product"
            type="text"
            v-model="color"
          ></v-text-field>
            <v-text-field
            name="material"
            label="Material Product"
            type="text"
            v-model="material"
          ></v-text-field>
            <v-text-field
            name="price"
            label="Price Product"
            type="text"
            v-model="price"
          ></v-text-field>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {};
  }
};
</script>