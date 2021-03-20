import forEach from "lodash/forEach";

export default {
  methods: {
    reSetQuery(properties) {
      let needRemove = {};

      forEach(properties, (value, key) => {
        if (!value) {
          properties[key];
        }
      });

      if (Object.keys(properties).length) {
        this.$router.push({query: Object.assign({}, this.$route.query, properties)});
      }
    }
  }
}