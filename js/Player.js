/**
 * @author Anh
 */
function Character(game, x, y) {

}

function Player(game, x, y) {
    var self = this;
    //this.socket = io("http://83.136.248.195:3000");
    //this.socket.on('connect', function(){
    //    self.id = this.id;
    //    self.imgKey = Util.getLook();
    //    Phaser.Sprite.call(self, game, x, y, self.imgKey);
    //    game.add.existing(self);
    //});
    //this.socket.on('disconnect', function(){
    //    self.destroy();
    //    Util.removeLook();
    //});
    this.own = function(socket) {
        //this.socket = socket;
        this.name = name;
        this.id = '/#' + socket.id;
        //this.imgKey = Util.getLook();
        Phaser.Sprite.call(this, game, x, y, "whiteBox");
        this.tint = Math.random() * 0xffffff;
        this.anchor.setTo(0.5);
        game.add.existing(this);
        //this.addText();
        //socket.emit('join', {id: this.id, x: this.x, y: this.y});
    };
    this.introduce = function(who) {
        this.name = who.name;
        this.id = who.id;
        //this.imgKey = Util.playerSprites[others.length];
        Phaser.Sprite.call(this, game, x, y, "whiteBox");
        this.tint = Math.random() * 0xffffff;
        this.anchor.setTo(0.5);
        game.add.existing(this);
        //this.addText();
    };
    this.addText = function() {
        var style = { font: "32px Arial", fill: "#fff", align: "center" };
        this.text = game.add.text(300, 200, this.name, style);
        this.text.anchor.set(0.5, 0);
    };
    //this.events.onDestroy.add(function () {
    //   this.text.destroy();
    //});
    this.update = function() {
        //this.text.x = this.x;
        //this.text.y = this.y;
    };
}
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// STATIC FUNCTIONS
