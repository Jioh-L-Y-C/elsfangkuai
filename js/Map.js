(function() {
	//地图类
		window.Map = function(game) {
			this.game = game;
			//地图的样式
			this.code = (function() {//地图的数组有20组,1组16项全部为0
					var arr = []
					for(var i = 0; i < game.rowCount; i++) {
						arr.push([])
						for(var j = 0; j < game.colCount; j++) {
							arr[i].push(0)
						}
					}
//            arr.push([1,1,1,1,1,1,1,1,1,1,1,1])
				arr.push(Array(12).fill(1))
					return arr
			})()
			
	    }
		
		//x渲染地图
		Map.prototype.render=function(){
			for(var i=0;i<game.rowCount;i++){
				for(var j=0;j<game.colCount;j++){
					//表格中有非0的我才渲染
					 if(this.code[i][j] != 0){
					 	//console.log(this.code[i][j])
                    game.setClassname(i, j, this.code[i][j])
               }
				}
				
			}
		}
		
		
})()