// Constant
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;
var SPEED = 5;
var HOST = "http://83.136.248.195:3001";

var socket = io(HOST);
//var name = prompt("Enter your name");
var name = "default";
var game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', { preload: preload, create: create, update: update, render: render });
var me;
var others = {};
var myText = null;
var sprite = null;
var dragged = false;

function preload() {
    game.load.image("char", "img/char.png");
    game.load.image("whiteBox", "img/whiteBox.png");
    game.load.image("p1", "img/p1.png");
    game.load.image("p2", "img/p2.png");
    game.load.image("p3", "img/p3.png");
    game.load.image("p4", "img/p4.png");
}

function create() {
    me = new Player(game, 100, game.world.height * Math.random());
    // Create the player object locally on connect.
    socket.on('connect', function(){
        me.own(socket);
    });
    // Inform server of the player's existence after acknowledging the game world.
    socket.on('welcome', function(stat){
        acknowledge(stat);
        socket.emit('join', {id: me.id, x: me.x, y: me.y, name: me.name});
    });
    socket.on('join', function(newPlayer){
        var nP = new Player(game, newPlayer.x, newPlayer.y);
        others[newPlayer.id] = nP;
        //Util.playerCount++;
        nP.introduce(newPlayer);
    });
    socket.on('leave', function(player){
        console.log(player.id + " is leaving.");
        console.log(player);
        others[player.id].destroy();
        //Util.removeLook();
    });
    socket.on('sync', function(stat){
        delete stat.players[me.id];
        for (var i in stat.players) {
            for (var j in stat.players[i]) {
                others[i][j] = stat.players[i][j];
            }
            //others[i].x = stat.players[i].x;
            //others[i].y = stat.players[i].y;
        }
    });
}

function update() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        me.x -= SPEED;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        me.x += SPEED;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
        me.y -= SPEED;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
        me.y += SPEED;
    }
    if (me.id) {
        socket.emit('sync', {id: me.id, x: me.x, y: me.y});
    }
}

function render() {

}

function acknowledge(stat) {
    for (var i in stat.players) {
        var nP = new Player(game, stat.players[i].x, stat.players[i].y);
        others[i] = nP;
        nP.introduce(stat.players[i]);
    }
}

function sync() {
    Util.playerCount = stat.playerCount;
}

var Util = {
    playerCount: 0,
    playerSprites : ["p1", "p2", "p3", "p4"],
    getLook: function() {
        var res = this.playerSprites[this.playerCount];
        this.playerCount++;
        return res;
    },
    removeLook: function() {
        this.playerCount--;
    }
};