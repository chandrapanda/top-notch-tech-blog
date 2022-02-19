module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: (date) => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      new Date(date).getFullYear() + 5
    }`;
  },
};

(function () {
  Handlebars.registerHelper("post", function () {
    var post = Handlebars.escapeExpression();
    var result = "<a href='" + post + "'></a>";
    console.log(result);

    return new Handlebars.SafeString(result);
  });
});
