// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;
var plm = require('passport-local-mongoose')

var FoodSchema = new Schema({
    dish: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    type: {type: String, required: true},
    img: {type: String, required: true},
    options: {type: String, required: true}
});


// Creates a User Schema. This will be the basis of how user data is stored in the db
var UserSchema = new Schema({

    email: {type: String},
    fullname: {type: String},
    username: {type: String},
    password: String,
    cook: {type: Boolean},
    foods: [FoodSchema],
    //favlang: {type: String, required: true},
    latitude: String,
    longitude: String, // [Long, Lat]
    htmlverified: String,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    socialId: String,
    rating: {type: Number},
    provider: String,
    loginCount: Number
});

// Sets the created_at parameter equal to the current time
UserSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Indexes this schema in 2dsphere format (critical for running proximity searches)
UserSchema.index({location: '2dsphere'});
UserSchema.plugin(plm);
// Exports the UserSchema for use elsewhere. Sets the MongoDB collection to be used as: "scotch-users"
module.exports = mongoose.model('user', UserSchema);