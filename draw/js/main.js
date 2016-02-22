var socket;
var game = new Phaser.Game(800, 500, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
var ink;
var clearBtn, clearing;

function preload() {
    game.load.image("dot", "img/dot.png");
    game.load.image("char", "img/char.png");
}

function create() {
    socket = io("http://83.136.248.195:3000");
    socket.on('draw', function (msg) {
        getDraw(msg);
    });
    socket.on('clear', function (msg) {
        clear();
    });
    game.stage.backgroundColor = '#fefefe';
    clearBtn = game.add.button(0, 0, 'char', null, this);  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    clearBtn.events.onInputOver.add(function(){clearing=true;});
    clearBtn.events.onInputOut.add(function(){clearing=false;});
    clearBtn.events.onInputDown.add(function(){clearing=true;});
    clearBtn.events.onInputUp.add(function(){clearing=false;});
    //game.input.mouse.capture = true;
    //game.input.onDown.add(updateAnchor, this);
    ink = game.add.group();
}

function update() {
    if (game.input.mousePointer.isDown) {
        draw(game.input.mousePointer);
    }
    if (game.input.pointer1.isDown) {
        draw(game.input.pointer1);
    }
    if (clearing){
        clear();
        socket.emit('clear', "");
    }
}

function getDraw(msg) {
    var data = JSON.parse(msg);
    var dot = ink.create(data.x, data.y, "dot");
    dot.anchor.setTo(0.5, 0.5);
}

function clear() {
    ink.forEach(function (item) {
        item.destroy();
    });
}

function draw(pos) {
    var dot = ink.create(pos.x, pos.y, "dot");
    dot.anchor.setTo(0.5, 0.5);
    socket.emit('draw', JSON.stringify({x: dot.x, y: dot.y}));
}