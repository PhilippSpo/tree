# tree
folder structure style tree built for meteor collections

    var nodes = [{
        _id: 'a',
        title: 'Building A',
        children: [0, 1, 2],
        parent: ''
    },{
        _id: '0',
        title: 'Floor 0',
        children: [],
        parent: 'a'
    },{
        _id: '1',
        title: 'Floor 1',
        children: [],
        parent: 'a'
    },{
        _id: '2',
        title: 'Floor 2',
        children: [],
        parent: 'a'
    }]
