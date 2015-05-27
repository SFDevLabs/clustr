// user.js
// User model logic.
// 
var config = require('../../../config/config');
var neo4j = require('neo4j');
//var uuid = require('node-uuid');
var db = new neo4j.GraphDatabase(
    config.graphdb
);

// private constructor:

var Site = function Site(_node) {
    // all we'll really store is the node; the rest of our properties will be
    // derivable or just pass-through properties (see below).
    this._node = _node;
}

// public instance properties:

Object.defineProperty(Site.prototype, 'id', {
    get: function () { return this._node.id; }
});

Object.defineProperty(Site.prototype, 'name', {
    get: function () {
        return this._node.data['name'];
    },
    set: function (name) {
        this._node.data['name'] = name;
    }
});

// public instance methods:

Site.prototype.save = function (callback) {
    this._node.save(function (err) {
        callback(err);
    });
};

Site.prototype.del = function (callback) {
    // use a Cypher query to delete both this user and his/her following
    // relationships in one transaction and one network request:
    // (note that this'll still fail if there are any relationships attached
    // of any other types, which is good because we don't expect any.)
    var query = [
        'MATCH (user:Site)',
        'WHERE ID(user) = {userId}',
        'DELETE user',
        'WITH user',
        'MATCH (user) -[rel:follows]- (other)',
        'DELETE rel',
    ].join('\n')

    var params = {
        userId: this.id
    };

    db.query(query, params, function (err) {
        callback(err);
    });
};

Site.prototype.update = function (callback) {
    // use a Cypher query to delete both this user and his/her following
    // relationships in one transaction and one network request:
    // (note that this'll still fail if there are any relationships attached
    // of any other types, which is good because we don't expect any.)
    // var query = [
    //     'MATCH (user:Site)',
    //     'WHERE ID(user) = {userId}',
    //     'SET user[key]',
    // ].join('\n')

    // var params = {
    //     userId: this.id,
    //     key: this.id
    // };

    // db.query(query, params, function (err) {
    //     callback(err);
    // });
};

Site.prototype.follow = function (other, callback) {
    this._node.createRelationshipTo(other._node, 'follows', {}, function (err, rel) {
        callback(err);
    });
};

Site.prototype.unfollow = function (other, callback) {
    var query = [
        'MATCH (user:Site) -[rel:follows]-> (other:Site)',
        'WHERE ID(user) = {userId} AND ID(other) = {otherId}',
        'DELETE rel',
    ].join('\n')

    var params = {
        userId: this.id,
        otherId: other.id,
    };

    db.query(query, params, function (err) {
        callback(err);
    });
};

// calls callback w/ (err, following, others) where following is an array of
// users this user follows, and others is all other users minus him/herself.
Site.prototype.getFollowingAndOthers = function (callback) {
    // query all users and whether we follow each one or not:
    var query = [
        'MATCH (user:Site), (other:Site)',
        'OPTIONAL MATCH (user) -[rel:follows]-> (other)',
        'WHERE ID(user) = {userId}',
        'RETURN other, COUNT(rel)', // COUNT(rel) is a hack for 1 or 0
    ].join('\n')

    var params = {
        userId: this.id,
    };

    var user = this;
    db.query(query, params, function (err, results) {
        if (err) return callback(err);

        var following = [];
        var others = [];

        for (var i = 0; i < results.length; i++) {
            var other = new Site(results[i]['other']);
            var follows = results[i]['COUNT(rel)'];

            if (user.id === other.id) {
                continue;
            } else if (follows) {
                following.push(other);
            } else {
                others.push(other);
            }
        }

        callback(null, following, others);
    });
};

// static methods:

// Site.get = function (id, callback) {
//     var query = [
//         'START USEREDGE = relationship('+id+')',
//         'RETURN USEREDGE, startNode(USEREDGE), endNode(USEREDGE)'
//     ].join('\n');

//     db.query(query, null, function (err, result) {
//         if (err) return callback(err);

        
//         callback(null, relationshipParser(result[0]));
//     });
// };

Site.get = function (id, callback) {
    var query = [
        'START siteFrom = node('+id+')',
        'MATCH siteFrom -[USEREDGE:USEREDGE]-(siteTo:Site)',
        'RETURN USEREDGE, siteTo'
    ].join('\n');

    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var parsedResult = results.map(function (result) {
            return itemParser(result);
        })
        
        callback(null, parsedResult);
    });
};

function relationshipParser(result){
    var item = {};
    item['siteFrom']=result['startNode(USEREDGE)']._data.data;
    item['siteFrom'].id=result['startNode(USEREDGE)']._data.metadata.id;
    item['siteTo'] = result['endNode(USEREDGE)']._data.data;
    item['siteTo'].id = result['endNode(USEREDGE)']._data.metadata.id;
    item['USEREDGE'] = result['USEREDGE']._data.data;
    item['USEREDGE'].id = result['USEREDGE']._data.metadata.id;
    return item
}

function itemParser(result){
    var item = {};
    item['siteTo']=result['siteTo']._data.metadata
    item['siteTo'].id=result['siteTo']._data.metadata.id;
    item['USEREDGE']=result['USEREDGE']._data.metadata
    item['USEREDGE'].id=result['USEREDGE']._data.metadata.id;
    return item;
}


        

        
Site.getAll = function (callback) {

    var query = [
        'MATCH (siteFrom)-[USEREDGE:USEREDGE]->(siteTo)',
        'RETURN USEREDGE, siteFrom, siteTo'
    ].join('\n');

    db.query(query, null, function (err, results) {
        if (err) return callback(err);
        var parsedResult = results.map(function (result) {
            var item = {};
            item['siteFrom']=result['siteFrom']._data.data;
            item['siteFrom'].id=result['siteFrom']._data.metadata.id;

            item['USEREDGE'] = result['USEREDGE']._data.data;
            item['USEREDGE'].id=result['USEREDGE']._data.metadata.id;

            item['siteTo'] = result['siteTo']._data.data;
            item['siteTo'].id = result['siteTo']._data.metadata.id;

            return item
        });
        callback(null, parsedResult);
    });
};

// creates the user and persists (saves) it to the db, incl. indexing it:
Site.createConnection = function (nodeOne, nodeTwo, edge, callback) {
    // construct a new instance of our class with the data, so it can
    // validate and extend it, etc., if we choose to do that in the future:
    // var node = db.createNode(data);
    // var user = new Site(node);


    // but we do the actual persisting with a Cypher query, so we can also
    // apply a label at the same time. (the save() method doesn't support
    // that, since it uses Neo4j's REST API, which doesn't support that.)
    
    var query = [];
    query.push('CREATE (siteOne:Site {nodeOne})');
    query.push('CREATE (SiteTwo:Site {nodeTwo})');
    query.push('CREATE (siteOne)-[userEdge:USEREDGE{edge}]->(SiteTwo)');
    query.push('RETURN userEdge');
    query = query.join('\n');


    var params = {
        nodeOne: nodeOne,
        nodeTwo: nodeTwo,
        edge: edge
    };

    console.log(query, params, 'params')

    db.query(query, params, function (err, results) {
        if (err) return callback(err);
        //var user = new Site(results[0]['user']);
        callback(null, results);
    });
};

module.exports = Site;