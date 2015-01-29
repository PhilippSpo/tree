// Write your package code here!
Template.tree.helpers({
	rootNodes: function() {
		var rootNodes = this.collection.find({
			parent: null
		});
		return rootNodes;
	}
});

Template.treeNode.helpers({
	children: function() {
		var self = this;
		var children = this.parentContext.collection.find({
			_id: {$in: this.context.children}
		}).fetch();

		children.map(function(child){
			_.extend(child, {
				padding: self.padding + 10
			});
			return child;
		});
		return children;
	}
});