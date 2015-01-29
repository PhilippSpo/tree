Demo here: http://planifica-tree.meteor.com/  
Demo code here: https://github.com/PhilippSpo/tree-demo  
### Getting Started
Add the package to your meteor project:

    meteor add philippspo:tree
    
Next you need a Mongo Collection that holds your tree nodes and follows this structure:
````javascript
var node = {
    _id: String,
    title: String,
    children: [String],
    parent: null|String
}
````
Then you can add the tree as a template to your HTML:
````html
{{>planificaTree collection=nodes}}
````
where 'nodes' is just a template helper holding your Collection to hand over to planificaTree:
````javascript
Template.yourTemplateHoldingTheTree.helpers({
    nodes: function() {
      return Nodes; // where Nodes is a Mongo Collection
    }
});
````    
Then you should see your collection, visualized as a tree.

### Root Node(s)

Your collection may contain NOT one dedicated root node, but several root Nodes. Since a tree normally only has one root, you can add a custom root, by adding it to the template like so:
````html
<template name="tree">
{{>planificaTree collection=nodes rootNode=rootNode}}
</template>
````
where rootNode is a template helper:
````javascript
Template.tree.helpers({
    nodes: function() {
      return Nodes;
    },
    rootNode: function() {
      return {
        title: 'Project A'
      };
    }
});
 ````   
### Event Handling
In order to handle any events on the nodes (and the root node) of the tree, you can just add them to the(/your) template that contains the tree.
* Root node has the id `#rootNode`
* Nodes have the class `.pc-tree-node`

Example:
````javascript
Template.tree.events({
    'click #rootNode': function (e) {
      Router.go('/');
    },
    'click .pc-tree-node': function() {
      Router.go('node', {
        nodeId: this.context._id
      });
    }
  });
````  
### Iron Router Support
The iron-router support consists of hilighting the currently selected node. You can tell planificaTree in which route parameter you store the current nodeId:
````html
{{>planificaTree collection=nodes routeParam="nodeId"}}
````
Where your route might look something like this:
````javascript
Router.route('/:nodeId', {
	name: 'node',
	data: function() {
		return Nodes.findOne({_id: this.params.nodeId});
	},
	action: function() {
		this.render('node');
	}
});
```` 
If you reload the page after selecting a node, you will notice, that the tree autmatically opens exactly the branch where your selected node is.

### Icons
For icons I chose ionicons (http://ionicons.com/).  
The predefined icons are `ion-folder` and `ion-leaf` but you can change both.  
At the moment icons are limited to all ionicons.
Example:
````javascript
PlanificaTree.nodeIcon = 'ion-android-folder';
PlanificaTree.leafIcon = 'ion-leaf';
````
Hope you like the package!
