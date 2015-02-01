PlanificaTree = {
	nodeIcon: 'ion-folder',
	leafIcon: 'ion-leaf',
	selectedNodePath: [],
	findParentsForNode: function(nodeId) {
		this.selectedNodePath.push(nodeId);
		var node = this.collection.findOne({_id: nodeId});
		if(node && node.parent !== null){
			this.findParentsForNode(node.parent);
		}
	},
	selChildInSubtree: function(children) {
		var self = this;
		var found = false;
		_.each(children, function(child){
			if(_.indexOf(self.selectedNodePath, child)!==-1){
				found = true;
			}
		});
		return found;
	}
};