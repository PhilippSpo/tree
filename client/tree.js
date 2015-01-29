Template.planificaTree.created = function () {
	var data = this.data;
	var nodeId = '';
	// tell our global tree object the parameters
	_.extend(PlanificaTree, this.data);
	if(data.routeParam){
		nodeId = Router.current().params.nodeId;
		if(nodeId){
			PlanificaTree.selectedNodeId = nodeId;
			PlanificaTree.findParentsForNode(nodeId);
		}
	}
};

// Write your package code here!
Template.planificaTree.helpers({
	rootNodes: function() {
		var rootNodes = this.collection.find({
			parent: null
		}).fetch();
		if(rootNodes.length > 0){
			rootNodes[rootNodes.length-1].isLast = true;
		}
		return rootNodes;
	}
});

Template.treeNode.helpers({
	isSelected: function() {
		if(!this.parentContext.routeParam){
			return;
		}
		if(Router.current().params[this.parentContext.routeParam] === this.context._id){
			return 'active';
		}
	},
	children: function() {
		var self = this;
		if(!this.parentContext){
			return;
		}
		var children = this.parentContext.collection.find({
			_id: {$in: this.context.children}
		}).fetch();

		children = _.map(children, function(child){
			_.extend(child, {
				padding: self.padding + 15
			});
			return child;
		});
		if(children.length > 0){
			children[children.length-1].isLast = true;
		}
		return children;
	},
	icon: function() {
		if(this.root){
			return PlanificaTree.nodeIcon;
		}
		if(this.context.children.length > 0){
			return PlanificaTree.nodeIcon;
		}else{
			return PlanificaTree.leafIcon;
		}
	},
	hasChildren: function(){
		return this.context.children.length > 0;
	},
	childIsSelected: function() {
		var selChildInSubtree = false;
		var children = [];

		if(this.rootChilds){
			this.rootChilds.forEach(function (child) {
				children.push(child._id);
			});
			selChildInSubtree = PlanificaTree.selChildInSubtree(children);
		}else{
			selChildInSubtree = PlanificaTree.selChildInSubtree(this.context.children);
		}
		if(selChildInSubtree === true){
			return 'visible';
		}
	}
});

Template.treeNode.events({
	'click .dropdown-icon': function (e, template) {
		e.preventDefault();
		e.stopPropagation();
		$(template.find('.collapse')).toggleClass('visible');
		$(template.find('.dropdown-icon')).toggleClass('ion-chevron-down');
		$(template.find('.dropdown-icon')).toggleClass('ion-chevron-up');
	}
});