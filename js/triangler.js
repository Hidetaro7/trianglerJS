function Triangler (c, src, px, py, segm, loadfn) {
	
		// public global var

		// private global var
		var _this = this, seg = 1, ctx, canvas, img, w = 0, h = 0, seg = 10, meshToggle = false, pivot = {x: 0, y: 0}, meshes=[];
	
		// public init(canvas, img, segment) : Triangler
		
			canvas = document.getElementById(c);
			ctx = canvas.getContext("2d");
			seg = segm;
			img = new Image();
			img.src = src;
			img.onload = function (){
				w = img.width / seg;
				h = img.height / seg;
				_this.setOrigin(px, py);
				var len = Math.pow( seg, 2 ) + seg*2 + 1;
				var _x = _y = 0;
				for (var i=0; i<len; i++) {
					var mx = Math.floor(_x*w), my = Math.floor(_y*h), corner = false;
					if(my >= img.height) {corner = true;}
					if(mx >= img.width) { _x = 0; _y++; corner = true; } else { _x++; }
					addPoint(mx, my, corner);
				}
				loadfn({"target": img, "canvas": canvas});
			}
			
	
	// ----------- property ----------- //

	// ----------- method ----------- //

		// private Mesh : void
		function Mesh (_x, _y, _corner) { //個別管理用
			this.x = _x;
			this.y = _y;
			this.corner = _corner;
			this.pivotX = _x;
			this.pivotY = _y;
		}
		
		function addPoint (_x, _y, corner) {
			var p = new Mesh((_x+pivot.x), (_y+pivot.y) , corner);
			meshes.push(p);
		}	
		// public draw : Triangler
		this.draw = function (){
			ctx.clearRect(0,0, canvas.width, canvas.height);
			//console.log(canvas.width)
			var l = meshes.length, v = meshes;
			for( var i=0; i<l; i++ ) {
				if(!v[i].corner) {
					//segment1
					ctx.save();
					ctx.beginPath();
					ctx.moveTo(v[i].x,   v[i].y);
					ctx.lineTo(v[i+1].x, v[i+1].y);
					//ctx.lineTo(v[i+seg+2].x,   v[i+seg+1].y); //追加
					ctx.lineTo(v[i+seg+1].x,   v[i+seg+1].y);
					ctx.closePath();
					ctx.clip();
					var t1 = (v[i+1].x - v[i].x)/w;
					var t2 = (v[i+1].y - v[i].y)/w;
					var t3 = (v[i+seg+1].x - v[i].x)/h;
					var t4 = (v[i+seg+1].y - v[i].y)/h;
					ctx.setTransform(t1,t2,t3,t4, v[i].x, v[i].y);
					ctx.drawImage(img, v[i].pivotX-_this.getOrigin().x, v[i].pivotY-_this.getOrigin().y ,w, h, 0, 0 ,w, h);
					
					ctx.restore();
					if (meshToggle) ctx.stroke();
					
					//segment2
					ctx.save();
					ctx.beginPath();
					ctx.lineTo(v[i+1].x, v[i+1].y);
					ctx.lineTo(v[i+seg+1].x, v[i+seg+1].y);
					ctx.lineTo(v[i+seg+2].x, v[i+seg+2].y);
					ctx.closePath();
					
					t1 = (v[i+seg+2].x - v[i+seg+1].x)/w;
					t2 = (v[i+seg+2].y - v[i+seg+1].y)/w;
					t3 = (v[i+seg+2].x - v[i+1].x)/h;
					t4 = (v[i+seg+2].y - v[i+1].y)/h;
	
					ctx.setTransform(t1,t2,t3,t4, v[i+seg+1].x, v[i+seg+1].y);
					
					
					/*if(!v[i+1].corner) { 
					//端っこ以外
						ctx.clip();
						ctx.drawImage(img, v[i].pivotX-_this.getOrigin().x, v[i].pivotY-_this.getOrigin().y ,w+10, h, 0, -h ,w+10, h);
					}else{
						ctx.clip();
						ctx.drawImage(img, v[i].pivotX-_this.getOrigin().x, v[i].pivotY-_this.getOrigin().y ,w, h, 0, -h ,w, h);
	
					}
					*/
						ctx.clip();
						ctx.drawImage(img, v[i].pivotX-_this.getOrigin().x, v[i].pivotY-_this.getOrigin().y ,w, h, 0, -h ,w, h);
	
					
					ctx.restore();
					if (meshToggle) ctx.stroke();
				}
			}
		}
		
		// public clear : Triangler
		
		// public getMesh : Mesh
		this.getMesh = function (){
			return meshes;
		};
		// public get4CornersPoint : Array
		
		// public getOrigin : Object
		this.getOrigin = function () {
			return {"x":pivot.x, "y":pivot.y}
		}
		
		// public setOrigin(x, y) : void
		this.setOrigin = function (_x, _y) {
			pivot.x = _x;
			pivot.y = _y;
		}
		
		this.stroke = function (flag) {
			meshToggle = flag;
		}
		
		// end of Triangler return Triangler !!
		return this;
	} // Triangler

;
