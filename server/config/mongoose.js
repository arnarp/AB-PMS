var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('pms db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashedPwd: String,
        roles: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashedPwd;
        }
    };
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'arnar');
            User.create({firstName: 'Arnar', lastName: 'Birgisson', username: 'arnar', salt: salt, hashedPwd: hash, roles: ['admin']});
            salt = createSalt();
            hash = hashPwd(salt, 'angela');
            User.create({firstName: 'Angela', lastName: 'Santos', username: 'angela', salt: salt, hashedPwd: hash, roles: []});
            salt = createSalt();
            hash = hashPwd(salt, 'birgir');
            User.create({firstName: 'Birgir', lastName: 'Birgisson', username: 'birgir', salt: salt, hashedPwd: hash});
        }
    });
}

function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}
