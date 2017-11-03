var Textures = {
    donut1: { src: './assets/levels/donut1.png', width: 1024, height: 1024 },
    beach1: { src: './assets/levels/beach1.png', width: 1024, height: 1024 },
    circuit1: { src: './assets/levels/circuit1.png', width: 1024, height: 1024 },
    vanilla2: { src: './assets/levels/vanilla2.png', width: 1024, height: 1024 },
    choco2: { src: './assets/levels/choco2.png', width: 1024, height: 1024 },
    rainbow: { src: './assets/levels/rainbow.png', width: 1024, height: 1024 },
    spook3: { src: './assets/levels/spook3.png', width: 1024, height: 1024 },

    meryo: { src: './assets/sprites/meryo.png', width: 32, height: 32 },
    loogi: { src: './assets/sprites/loogi.png', width: 32, height: 32 },
    peach: { src: './assets/sprites/peach.png', width: 32, height: 32 },
    toad: { src: './assets/sprites/toad.png', width: 32, height: 32 },
    yosh: { src: './assets/sprites/yosh.png', width: 32, height: 32 },
    koop: { src: './assets/sprites/koop.png', width: 32, height: 32 },
    bows: { src: './assets/sprites/bows.png', width: 32, height: 32 },
    dkjr: { src: './assets/sprites/dkjr.png', width: 32, height: 32 },

    lakitu: { src: './assets/sprites/lakitu.png', width: 35, height: 32 },

    banana: { src: './assets/sprites/banana.png', width: 16, height: 16 },
    greenshell: { src: './assets/sprites/greenshell.png', width: 16, height: 16 },
    redshell: { src: './assets/sprites/redshell.png', width: 16, height: 16 },
    womp: { src: './assets/sprites/womp.png', width: 24, height: 32 },
    pipe: { src: './assets/sprites/pipe.png', width: 24, height: 33 }
};

Object.values(Textures).map( function (ref) {
var src = ref.src;
var i = new Image(); i.src = src;});

var Vec3 = function Vec3 (x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
};

var Entity = function Entity (pos, rot, scale) {
	this.el = document.createElement('div');
	this.el.classList.add('surface3d');
	this.pos = pos || new Vec3();
	this.rot = rot || new Vec3();
	this.scale = scale || new Vec3(1, 1, 1);
};

var prototypeAccessors = { style: { configurable: true } };

prototypeAccessors.style.set = function (s) {
	this.el.style = s;
};
prototypeAccessors.style.get = function () {
	return this.el.style;
};

Entity.prototype.render = function render () {
	var css = "\n\ttranslate3d(" + (this.pos.x) + "px, " + (this.pos.y) + "px, " + (this.pos.z) + "px)\n\trotateX(" + (this.rot.x) + "rad)\n        rotateY(" + (this.rot.y) + "rad)\n        rotateZ(" + (this.rot.z) + "rad)\n\tscale3d(" + (this.scale.x) + ", " + (this.scale.y) + ", " + (this.scale.z) + ")";
	this.style.webkitTransform = css;
	this.style.msTransform = css;
	this.style.transform = css;
};

Object.defineProperties( Entity.prototype, prototypeAccessors );

var Sprite = (function (Entity) {
    function Sprite (ref, pos, rot, scale,
	options
    ) {
	var src = ref.src;
	var width = ref.width;
	var height = ref.height;
	if ( options === void 0 ) options = {
	    billboard: true
	};

	Entity.call(this, pos, rot, scale);
	this.billboard = options.billboard;
	this.el.style = "\n\twidth:" + width + "px; height:" + height + "px;\n\tmargin-left: -" + (width/2) + "px; margin-top: -" + (height/2) + "px;\n\t";
	this.el.style.backgroundImage = "url('" + src + "')";
	//this.el.style.transformOrigin = `${width/2}px ${height/2}px`;
    }

    if ( Entity ) Sprite.__proto__ = Entity;
    Sprite.prototype = Object.create( Entity && Entity.prototype );
    Sprite.prototype.constructor = Sprite;

    return Sprite;
}(Entity));

var Scene = function Scene (id, cam, entities) {
	var this$1 = this;

	this.el = document.getElementById(id);
	this.camera = cam;
	this.entities = entities;

	this.el.appendChild(this.camera.el);

	this.entities.map(function (e) { return this$1.camera.el.appendChild(e.el); });
};

var prototypeAccessors$1 = { style: { configurable: true } };

Scene.prototype.addSprite = function addSprite (s) {
	this.entities.push(s);
	this.camera.el.appendChild(s.el);
};

prototypeAccessors$1.style.set = function (s) {
	this.el.style = s;
};
prototypeAccessors$1.style.get = function () {
	return this.el.style;
};

Scene.prototype.setCamera = function setCamera (cam) {
	this.camera = cam;
};

Scene.prototype.render = function render () {
	var this$1 = this;

	this.camera.render();
	this.entities.map(function (e) {
	if(e.billboard)
		{ e.rot.y = -this$1.camera.rot.y }
	});
	this.entities.map(function (e) { return e.render(); });
};

Object.defineProperties( Scene.prototype, prototypeAccessors$1 );


var lakitu = new Sprite(
    Textures.lakitu,
    new Vec3(-350, -42, -60),
    new Vec3(0, 0, 0), new Vec3(1.25, 1.25, 1.25));
lakitu.style.filter = "drop-shadow(19px 40px 3px rgba(0, 0, 0, 0.4))";
lakitu.style.webkitFilter = "drop-shadow(19px 40px 3px rgba(0, 0, 0, 0.4))";

var womp = new Sprite(
	Textures.womp,
	new Vec3(290,-70,37),
	new Vec3(0, 0, 0), new Vec3(1.0, 1.0, 1.0));
womp.style.filter = "drop-shadow(10px 50px 3px rgba(0, 0, 0, 0.4))";
womp.style.webkitFilter = "drop-shadow(10px 50px 3px rgba(0, 0, 0, 0.4))";

//lakitu.style.background = `transparent`;

//let loogi = new Sprite(Textures.loogi, new Vec3(600, -500, 0), new Vec3(-90, 0, 0), new Vec3(-1,1,1));
//let peach = new Sprite(Textures, new Vec3(500, -500, 10), new Vec3(-90, 0, 0));
//let toad = new Sprite(Textures.toad, new Vec3(10, -600, -250), new Vec3(-90, 0, 0), new Vec3(-1,1,1));
//let koop = new Sprite(Textures.koop, new Vec3(-19, -600, -170), new Vec3(-90, 0, 0), new Vec3(1,1,1));
//let meryo = new Sprite(Textures.meryo, new Vec3(467, -739, -250), new Vec3(-90, 0, 0));
//let koop = new Sprite(Textures.koop, new Vec3(534, -500, 0), new Vec3(-90, 0, 0));
var meryo = new Sprite(
    Textures.meryo,
    new Vec3(338, -24, -130),
    new Vec3(0, 0, 0), new Vec3(-1.5, 1.5, 1.5));

var loogi = new Sprite(
    Textures.loogi,
    new Vec3(-30, -24, 200),
    new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5));

var peach = new Sprite(
    Textures.peach,
    new Vec3(200, -24, -410),
    new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5));

var toad = new Sprite(
    Textures.toad,
    new Vec3(-400, -24, 20),
    new Vec3(0, 0, 0), new Vec3(-1.5, 1.5, 1.5));

var koop = new Sprite(
    Textures.koop,
    new Vec3(-330, -24, -280),
    new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5));

var yosh = new Sprite(
    Textures.yosh,
    new Vec3(0, -24, -400),
    new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5));

var dkjr = new Sprite(
    Textures.dkjr,
    new Vec3(150, -24, 175),
    new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5));

var bows = new Sprite(
    Textures.bows,
    new Vec3(-405,-24,120),
    new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5));


var items = [
    new Sprite(
	Textures.banana,
	new Vec3(Math.random()*800-400,-12,Math.random()*800-400),
	new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5))
    ,
    new Sprite(
	Textures.banana,
	new Vec3(Math.random()*800-400,-12,Math.random()*800-400),
	new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5))
    ,
    new Sprite(
	Textures.redshell,
	new Vec3(-405,-12,165),
	new Vec3(0, 0, 0), new Vec3(1.5, 1.5, 1.5))
    ,
    new Sprite(
	Textures.pipe,
	new Vec3(415,-17,-357),
	new Vec3(0, 0, 0), new Vec3(1.0, 1.0, 1.0))
    ,
    new Sprite(
	Textures.pipe,
	new Vec3(375,-17,-290),
	new Vec3(0, 0, 0), new Vec3(1.0, 1.0, 1.0)) ];

    //greenshell: { src: './assets/sprites/greenshell.png', width: 16, height: 16 },
    //redshell: { src: './assets/sprites/redshell.png', width: 16, height: 16 },
    //womp: { src: './assets/sprites/womp.png', width: 24, height: 32 },
    //pipe: { src: './assets/sprites/pipe.png', width: 32, height: 32 }


var ground = new Sprite(
    Textures.donut1,
    new Vec3(0, 0, 0),
    new Vec3(Math.PI/2,0,0),undefined,
    {billboard: false});
ground.style.transition = "background-image 2s ease-in-out";
ground.style.webkitTransition = "background-image 2s ease-in-out";

var camera = new Entity(new Vec3(0, -100, 0), new Vec3(-0.5, 0, 0));
camera.zoom = -100;

var scene = new Scene('scene', camera,
    [ground, lakitu, womp, meryo, loogi, peach, toad, koop, yosh, bows, dkjr].concat(items)
);
/*
function updateGui() {
    let el = document.getElementById('data');
    function printVec3 ({x, y, z}) {
	return `x: ${x}<br/>y: ${y}<br/>z: ${z}`;
    }
    el.innerHTML = printVec3(bows.pos);
}
*/
var turbo = 1;
var frame = 0;

function render () {
    camera.rot.y -= 0.001 * turbo;
    camera.pos.z = camera.zoom+Math.sin(frame/180)*60;
    scene.render();

    frame++;
    requestAnimationFrame(render);
}


var levels = [
    // TODO Gradient
      {texture: Textures.donut1, background: '#70d8e0'}
    , {texture: Textures.beach1, background: '#40d4d8'}
    , {texture: Textures.circuit1, background: '#70e0e8'}
    , {texture: Textures.spook3, background: '#020004'}
    , {texture: Textures.vanilla2, background: '#b0b8e0'}
    , {texture: Textures.rainbow, background: '#06000f'}
    , {texture: Textures.choco2, background: 'linear-gradient(#f49040, #3060b8)'}
    ];

function setLevel (lvl) {
    console.log(lvl.texture.src);
    ground.style.backgroundImage = "url(" + (lvl.texture.src) + ")";
    document.getElementById('container').style.background = lvl.background;
}

var curr_level = 0;

setInterval(function (){
    setLevel(levels[++curr_level % levels.length]);
}, 9000);

addEventListener('keydown', function(e) {
    switch(e.key) {
	case 'o':
	    setLevel(levels[++curr_level % levels.length]);
	    break;
	case 't':
	    turbo = 10;
	    break;
	case 'r':
	    camera.pos.y += 5;
	    break;
	case 'f':
	    camera.pos.y -= 5;
	    break;
	case 'a':
	    camera.pos.x += 5;
	    break;
	case 'd':
	    camera.pos.x -= 5;
	    break;
	case 'w':
	    camera.zoom += 5;
	    break;
	case 's':
	    camera.zoom -= 5;
	    break;
	//case 'f':
	    //bows.rot.z -= 0.02;
	    //break;
    }
});

addEventListener('keyup', function(e) {
    switch(e.key) {
	case 't':
	    turbo = 1;
	    break;
    }
});

function main() {
    setLevel(levels[0]);

    requestAnimationFrame(render);
}

main();

