

module.exports = {

	addUser: function(collection,username, password, role, callback) {
        if(this.findByUsername(username) !== undefined)  return callback("UserAlreadyExists");
        var user = {
            username:   username,
            password:   password,
            role:       role,
			details: []
        };
        callback(null, user);
    },
	
	findAll: function() {
        collection.findAll(function(err, document){
            if(err){
                console.log("findone error" + err); 
                return;
            }			
            return document;
        });
	},
	
	findByUsername: function(username) {
        collection.findOne({username: username }, function(err, document){
            if(err){
                console.log("findone error" + err); 
                return;
            }			
            return document;
        });
    },
	
	findById: function(id) {
        collection.findOne({_id: ObjectID.createFromHexString(id) }, function(err, document){
            if(err){
                console.log("findone error" + err); 
                return;
            }
			return document; 
        });
    },
};