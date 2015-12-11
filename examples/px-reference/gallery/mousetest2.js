px.import("px:scene.1.js").then( function ready(scene) {
var root = scene.root;
var basePackageUri = px.getPackageBaseFilePath();

var url;
/*
url = process.cwd() + "/../../images/skulls.png";
var bg = scene.createImage({id:"bg2",url:url,stretchX:2,stretchY:2,parent:root});

url = process.cwd() + "/../../images/radial_gradient.png";
var bgShade = scene.createImage({id:"bg", url:url,stretchX:1,stretchY:1,parent:root});
*/
var txt1 = scene.createText({x:10,text:"",parent:root,pixelSize:64});

//var childText;
url = basePackageUri + "/images/ball.png"
var ballImg = scene.createImage({id:"ball",url:url,x:450,y:150,parent:root});
ballImg.ready.then(function(e){
       e.cx = e.w/2;
    e.cy = e.h/2;
    childText = scene.createText({id:"text",text:"CLICK ME!!!",parent:e,textColor:0xff0000ff, 
				  r:30, pixelSize:64});
    childText.y = e.h/2-childText.h/2;
    childText.x = e.w/2-childText.w/2;
    childText.cx = childText.w/2;
    childText.cy = childText.h/2;
    childText.on("onMouseDown", function(e) {
	// TODO is there a better way to do this??
	rTarget += 360;
	childText.animateTo({r:rTarget}, 1.0, 4, 0); 
	//    childText.animateTo({r:360}, 5.0, 4, 0, function(o) { o.r = 0; }); 
    });
});
var rTarget = 0;


// clean up these names and expose as properties off of some object
var pxInterpLinear = 0;
var easeOutElastic = 1;
var easeOutBounce  = 2;
var pxExp = 3;
var pxStop = 4;

function fancy(p) {
  x1(p);
  y1(p);
  rotate1(p);
  scale1(p);
}

function x1(p) {
    p.animateTo({x:50}, 1.0, pxInterpLinear, 0, x2);
}

function x2(p) {
    p.animateTo({x:450}, 3.0, easeOutElastic, 0, fancy);
}

function y1(p) {
    p.y = 100;
    p.animateTo({y:350}, 1.0, easeOutBounce, 0, y2);
}

function y2(p) {
    p.animateTo({y:150}, 1.0, easeOutElastic, 0);
}

function rotate1(p) {
    p.r = 0;
    p.animateTo({r:-360}, 2.5, easeOutElastic, 0);
}

function scale1(p) {
    p.animateTo({sx:0.2,sy:0.2}, 1, pxInterpLinear, 0, scale2);
}

function scale2(p) {
    p.animateTo({sx:2.0,sy:2.0}, 1.0, pxExp, 0, scale3);
}

function scale3(p) {
    p.animateTo({sx:1.0,sy:1.0}, 1.0, easeOutElastic, 0);
}

scene.on('onKeyDown', function(e) {
  console.log("keydown:" + e.keyCode);
});

scene.on("onMouseMove", function(e) {
    txt1.text = "" + e.x+ ", " + e.y;
});

function updateSize(w, h) {
/*
    bg.w = w;
    bg.h = h;
    bgShade.w = w;
    bgShade.h = h;
*/
    txt1.y = h-txt1.h;
}

scene.on("onResize", function(e){updateSize(e.w,e.h);});
updateSize(scene.getWidth(), scene.getHeight());

}).catch( function importFailed(err){
    console.error("Import failed for mousetest2.js: " + err)
});


