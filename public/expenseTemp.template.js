(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['expenseTemp'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr class=\"expense-row\">\n    <td class=\"expense-date\">"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":2,"column":29},"end":{"line":2,"column":37}}}) : helper)))
    + "</td>\n    <td class=\"expense-place\">"
    + alias4(((helper = (helper = helpers.place || (depth0 != null ? depth0.place : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"place","hash":{},"data":data,"loc":{"start":{"line":3,"column":30},"end":{"line":3,"column":39}}}) : helper)))
    + "</td>\n    <td class=\"expense-amount\">"
    + alias4(((helper = (helper = helpers.amount || (depth0 != null ? depth0.amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"amount","hash":{},"data":data,"loc":{"start":{"line":4,"column":31},"end":{"line":4,"column":41}}}) : helper)))
    + "</td>\n    <td class=\"expense-description\">"
    + alias4(((helper = (helper = helpers.descrip || (depth0 != null ? depth0.descrip : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"descrip","hash":{},"data":data,"loc":{"start":{"line":5,"column":36},"end":{"line":5,"column":47}}}) : helper)))
    + "</td>\n    <td class=\"expense-category\">"
    + alias4(((helper = (helper = helpers.category || (depth0 != null ? depth0.category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"category","hash":{},"data":data,"loc":{"start":{"line":6,"column":33},"end":{"line":6,"column":45}}}) : helper)))
    + "</td>\n</tr>\n";
},"useData":true});
})();