(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['expenseTemp'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<tr id=\"expense-newrow\">\n    <th id=\"expense-date\">"
    + alias4(((helper = (helper = helpers.Date || (depth0 != null ? depth0.Date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Date","hash":{},"data":data,"loc":{"start":{"line":2,"column":26},"end":{"line":2,"column":34}}}) : helper)))
    + "</th>\n    <th id=\"expense-place\">"
    + alias4(((helper = (helper = helpers.Place || (depth0 != null ? depth0.Place : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Place","hash":{},"data":data,"loc":{"start":{"line":3,"column":27},"end":{"line":3,"column":36}}}) : helper)))
    + "</th>\n    <th id=\"expense-amount\">"
    + alias4(((helper = (helper = helpers.Amount || (depth0 != null ? depth0.Amount : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Amount","hash":{},"data":data,"loc":{"start":{"line":4,"column":28},"end":{"line":4,"column":38}}}) : helper)))
    + "</th>\n    <th id=\"expense-description\">"
    + alias4(((helper = (helper = helpers.Description || (depth0 != null ? depth0.Description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Description","hash":{},"data":data,"loc":{"start":{"line":5,"column":33},"end":{"line":5,"column":48}}}) : helper)))
    + "</th>\n    <th id=\"expense-category\">"
    + alias4(((helper = (helper = helpers.Category || (depth0 != null ? depth0.Category : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"Category","hash":{},"data":data,"loc":{"start":{"line":6,"column":30},"end":{"line":6,"column":42}}}) : helper)))
    + "</th>\n</tr>";
},"useData":true});
})();