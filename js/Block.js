(function(){
	window.Block=function(game){
		this.game=game;
		var arr=["L","I","O","S","Z","T","J"];
		//那到的是什么样式的方块
		this.allType=arr[~~(Math.random()*arr.length)]
//		console.log(this.allType)
		//拿到方块的方向个数
		this.allDirectionNumber=block_json[this.allType].length
		//拿到方向随机
		this.direction=~~(Math.random()*this.allDirectionNumber)
		//拿到方向的2进制码,马上要悬染的
		this.code=block_json[this.allType][this.direction]

		this.row=0;
		this.col=4;
	}


	//渲染方块
	Block.prototype.render=function(){
		for(var i=0;i<4;i++){

			for (var j=0;j<4;j++) {
				if(this.code[i][j]==1){//是1的就要渲染

					game.setClassname(this.row+i,this.col+j,this.allType)
				}

			}

		}
	}





	//方块下落
	Block.prototype.godown=function(){
		//用check ture就在往下

		if(this.check(this.row+1,this.col)){
			this.row++
		}else {
			//如果假,说明到底了
			//1往地图里面加类
			this.addDei()
			//2重新出现一个方块并且覆盖
			game.block=new Block()
			//3每次到底都检测是否消行
			this.remove()

			//每次到底或碰到其他的方块都检测地图地图的第一行有没有0有游戏结束
			game.map.code[0].forEach(function(itme){
				if(itme!=0){
					clearInterval(game.timer);
					alert(`游戏结束 你的总成绩是:${game.score}`)
				}
			})

		}


	}
	//消行
	Block.prototype.remove=function(){
		for(var i=0;i<game.rowCount;i++){
			if(!game.map.code[i].includes(0)){//检测地图的每一行没有0就消行
                document.getElementById("goDie").play()
				document.getElementById("goDie").load()

				game.score++
				game.map.code.splice(i,1)//从地图中消去没有0的一整行
				//然后再在地图头部填一行全部为0的行
				game.map.code.unshift(new Array(12).fill(0))
			}

		}
	}



		 //提供检测碰撞方法，该方法应该只返回true或false
    Block.prototype.check = function(row, col){
        for(var i = 0;i < 4; i++){
            for(var j = 0;j < 4;j++){
                if(this.code[i][j] != 0 && game.map.code[row + i][col + j] != 0){
                    return false; //如果碰到砖块，不能进，返回false
                }
            }
        }
        return true; //没有碰到地图的砖块，能进，返回true
    }

	//addDei   如果方块到底或碰到其他的方块,都要在地图上加类,在地图上渲染颜色
	Block.prototype.addDei=function(){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(this.code[i][j]!=0){

					game.map.code[this.row+i][this.col+j]=this.allType



				}

			}

		}
	}


	//控制方块左
	Block.prototype.left=function(){
		document.getElementById("move").play()
    if(this.check(this.row,this.col-1)){

   		this.col--
    }
	}

	//控制方块右
	Block.prototype.right=function(){
		document.getElementById("move").play()

    if(this.check(this.row,this.col+1)){
   		this.col++
    }
	}

	//控制方块旋转
	Block.prototype.rotate=function(){
		document.getElementById("rotate").play()
		var oldDirection = this.direction;

        //如果旋转的值已经等于自己的方向个数，就回到0，重新旋转
        if(this.direction == this.allDirectionNumber-1){
            this.direction = 0;
        }else{
            //否则就继续加，可以旋转
            this.direction++;
        }
        //重新渲染方向
        this.code = block_json[this.allType][this.direction];

        if(!this.check(this.row, this.col)){
            //如果碰到了，不可以继续旋转，改为刚刚随机出来的旧方向
            this.direction = oldDirection;
            this.code = block_json[this.allType][this.direction];
        }
	}

	//控制方快一键到底
	Block.prototype.down=function(){
		document.getElementById("goDown").play()
		while(this.check(this.row+1,this.col)){
			this.row++
		}
	}
})()
