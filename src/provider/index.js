export default {
  install: (app, options) => {
    app.provide("provider", options);
  },
};
