define([
  'js/widgets/facet/factory',
  'analytics'
], function (
  FacetFactory,
  analytics
) {
  return function () {
    var widget = FacetFactory.makeHierarchicalCheckboxFacet({
      facetField: 'doctype_facet_hier',
      facetTitle: 'Publication Type',
      logicOptions: { single: ['limit to', 'exclude'], multiple: ['or', 'exclude'] }
    });


    widget.handleLogicalSelection = function (operator) {
      var q = this.getCurrentQuery();
      var paginator = this.findPaginator(q).paginator;
      var conditions = this.queryUpdater.removeTmpEntry(q, 'SelectedItems');

      // XXX:rca - hack ; this logic is triggerd multiple times
      // we need to prevent that

      if (conditions && _.keys(conditions).length > 0) {
        conditions = _.values(conditions);
        _.each(conditions, function (c, i, l) {
          l[i] = 'doctype:"' + c.title + '"';
        });

        q = q.clone();

        var fieldName = 'fq_doctype';

        if (operator == 'and' || operator == 'limit to') {
          this.queryUpdater.updateQuery(q, fieldName, 'limit', conditions);
        } else if (operator == 'or') {
          this.queryUpdater.updateQuery(q, fieldName, 'expand', conditions);
        } else if (operator == 'exclude') {
          if (q.get(fieldName)) {
            this.queryUpdater.updateQuery(q, fieldName, 'exclude', conditions);
          } else {
            conditions.unshift('*:*');
            this.queryUpdater.updateQuery(q, fieldName, 'exclude', conditions);
          }
        }

        var fq = '{!type=aqp cache=false cost=150 v=$' + fieldName + '}';
        var fqs = q.get('fq');
        if (!fqs) {
          q.set('fq', [fq]);
        } else {
          var i = _.indexOf(fqs, fq);
          if (i == -1) {
            fqs.push(fq);
          }
          q.set('fq', fqs);
        }
        q.unset('facet.prefix');
        q.unset('facet');
        this.dispatchNewQuery(paginator.cleanQuery(q));

        analytics('send', 'event', 'interaction', 'facet-applied', JSON.stringify({ name: this.facetField, logic: operator, conditions: conditions }));
      }
    };
    return widget;
  };
});
