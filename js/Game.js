(function(){
	window.Game=function(){
		this.rowCount=20;
		this.colCount=12;
		this.init();
		//开启游戏定时器
		this.start();
		//键盘事件
		this.bindEvent()
		//方块实例化
		this.block=new Block(this)
		//地图实例化
		this.map=new Map(this)
	}
	Game.prototype.init=function(){
		this.dom=document.createElement("table");
		//table上树
		document.getElementById("box").appendChild(this.dom)

		var tr,td
		for(var i=0;i<this.rowCount;i++){
			tr=document.createElement('tr')
			this.dom.appendChild(tr)
			for(var j=0;j<this.colCount;j++){
				td=document.createElement('td');
			tr.appendChild(td)
			}

		}
	}

	//提供设计颜色的方法
	Game.prototype.setClassname=function(row,col,classname){
//		console.log(classname)
		this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].className=classname
		//this.dom.getElementsByTagName("tr")[row].getElementsByTagName("col")[0].className=classname
	}
	//清屏
	Game.prototype.clear=function(){
		for (var i=0;i<this.rowCount;i++) {
			for (var j=0;j<this.colCount;j++) {
				game.setClassname(i,j,"")
			}
		}
	}

	//游戏开启定时器
	Game.prototype.start=function(){
		this.f=0
		var self=this
		this.score=0

		this.timer=setInterval(function(){
		self.f++
		   document.getElementById('info').innerHTML = "帧编号：" + self.f;
         document.getElementById('score').innerHTML = "总分数：" + self.score;


			//清屏
			self.clear()
			//渲染方块
			self.block.render()

			//渲染地图
			self.map.render()
			//方块下落
	   self.f%20==0&& self.block.godown()
		},30)
	}

	//游戏的键盘事件
	Game.prototype.bindEvent=function(){
		var self=this;
		document.onkeyup=function(e){
			switch (e.keyCode){
				case 37:
				self.block.left()

					break;
					case 38:
				self.block.rotate()//旋转
					break;
					case 39:
				self.block.right()
					break;
					case 40:
				self.block.down()
					break;
			}

		}
	}
})()
