/**
 * 
 */
 $(document).ready(function() {
	 var canvas = $('#canvas');
	 var context = canvas[0].getContext('2d');

	 
	 var devicePixelRatio = window.devicePixelRatio || 1;

	 
	 var backingStoreRatio = context.webkitBackingStorePixelRatio ||
                 context.mozBackingStorePixelRatio ||
                 context.msBackingStorePixelRatio ||
                 context.oBackingStorePixelRatio ||
                 context.backingStorePixelRatio || 1;

	 
	 var ratio = devicePixelRatio / backingStoreRatio;
	 
	 
	 
	 
	 
	 
	 
	 
	var queue=[]; 
 	var history=[];
 	var drawing = false;
 	var x;
 	var y;
 	var x1;
 	var y1;
 	ini_view();
 	
 	
 	context.lineWidth = 1;
 
 	canvas.bind('mousedown', function(e) {
 		e.preventDefault();
 		if(!drawing) {
 			drawing = true;
 			var offset = $(e.currentTarget).offset()
 			x = (e.pageX - offset.left)/3.46;
 			x=Math.floor(x/14)*14-4;
 			if(x<10){
 				x=10;
 			}else if(x>140){
 				x=290;
 			}
 			y = (e.pageY - offset.top)/3.3;
 			
 			y=Math.floor(y/6.5)*6.5-3;
 			if(y<10){
 				y=10;
 			}else if(y>140){
 				y=140;
 			}
 			queue.push([x,y]);
 		}
 	});
 	canvas.bind('mousemove', function(e) {
 		e.preventDefault();
 		if(drawing) {
 			var old = queue.shift();
 			var offset = $(e.currentTarget).offset();
 			x1 = (e.pageX - offset.left)/3.2;
 			x1=Math.floor(x1/14)*14-4;
 			if(x1<10){
 				x1=10;
 			}else if(x1>290){
 				x1=290;
 			}
 			y1 = (e.pageY - offset.top)/3.2;
 			y1=Math.floor(y1/6.5)*6.5-3;
 			if(y1<10){
 				y1=10;
 			}else if(y1>140){
 				y1=140;
 			}
 			drawLine(context,x,y,x1,y1);
 			queue.push([x,y]);
 			$(".null3").html("("+(x1-10)*100/280+"%,"+100*(y1-10)/130+"%)");
 			clearPad();
 			ini_view();
 			drawLine(context,x,y,x1,y1);
 			}
 	});
 	canvas.bind('mouseup', function(e) {
 		if(drawing) {
 			drawing = false;
 			clearPad();
 			ini_view();
 			drawLine(context,x,y,x1,y1);
 			history.push(x,y,x1,y1);
 			
 		}
 	});
 	canvas.bind('mouseleave', function(e) {
 		if(drawing) {
 			var offset = $(e.currentTarget).offset();
 			x1 = (e.pageX - offset.left)/3.2;
 			x1=Math.floor(x1/14)*14-4;
 			if(x1<10){
 				x1=10;
 			}else if(x1>290){
 				x1=290;
 			}
 			y1 = (e.pageY - offset.top)/3.2;
 			y1=Math.floor(y1/6.5)*6.5-3;
 			if(y1<10){
 				y1=10;
 			}else if(y1>140){
 				y1=140;
 			}
 			drawLine(context,x,y,x1,y1);
 			queue.push([x,y]);
 			$(".null3").html("("+(x1-10)*100/280+"%,"+100*(y1-10)/130+"%)");
 			clearPad();
 			ini_view();
 			drawLine(context,x,y,x1,y1);
 			drawing = false;
 			history.push([x,y,x1,y1]);
 		}
 	});
 	$('#linewidth').bind('change', function() {
 		context.lineWidth = $(this).val();
 	});
 	function ini_view(){
 		context.strokeStyle = "black";
 		context.lineCap = "butt";
 		context.beginPath();
 		context.moveTo(10,10);
 		context.lineTo(10,140);
 		context.moveTo(10,140);
 		context.lineTo(290,140);
 		context.moveTo(290,140);
 		context.lineTo(290,10);
 		context.moveTo(290,10);
 		context.lineTo(10,10);
 		context.closePath();
 		context.stroke();
 		
 		for(i=0;i<history.length;i=i+4){
 			drawLine(context, history[i], history[i+1], history[i+2], history[i+3]);
 		}
 	}
 	function drawLine(context, x, y, x1, y1) {
 		context.strokeStyle = "red";
 		context.lineCap = "butt";
 		context.beginPath();
 		context.moveTo(x,y);
 		context.lineTo(x,y1);
 		context.moveTo(x,y1);
 		context.lineTo(x1,y1);
 		context.moveTo(x1,y1);
 		context.lineTo(x1,y);
 		context.moveTo(x1,y);
 		context.lineTo(x,y);
 		context.closePath();
 		context.stroke();
 	}
 	function clearPad(){
 		var canvas=document.querySelector('#canvas');
 	    var ctx=canvas.getContext("2d");
 	    ctx.clearRect(0,0,canvas.width,canvas.height);
 	}
 });