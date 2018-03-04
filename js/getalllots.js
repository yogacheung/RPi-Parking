var log = console.log.bind(console);

///////////////////////////////////////////////////////////

function getAllLots(callback){
  $.ajax({
    url: '/getalllots',
  })
  .done(callback);
}

function getAvaliable(callback){
  $.ajax({
    url: '/getavaliable',
  })
  .done(callback);
}

///////////////////////////////////////////////////////////

var park_lots = [];
var check = 0;

function refresh(){
	getAvaliable(function(res){
		//log(res); 		
		document.getElementById("park1").innerHTML = "Car Parking Lots 1 - Avaliable : " + res[0].Total;
		document.getElementById("park2").innerHTML = "Car Parking Lots 2 - Avaliable : " + res[1].Total;
				
		getAllLots(function(msg) {		
			//log(msg);
			if(check == 0){
				park_lots = msg;
				check = 1;
				for(i in msg){
				//log(msg[i]);				
				if(msg[i].status == 0)
					document.getElementById(msg[i].car_park_id).style.backgroundColor = "#7FFF00";
					else
					document.getElementById(msg[i].car_park_id).style.backgroundColor = "Red"; 			
				}
			}else{
				for(i in msg){
					//log(msg[i]);
					if(msg[i].status != park_lots[i].status){
						if(msg[i].status == 0)						document.getElementById(msg[i].car_park_id).style.backgroundColor = "#7FFF00";
						else						document.getElementById(msg[i].car_park_id).style.backgroundColor = "Red";			
					
						park_lots[i].status = msg[i].status;
					}
				}
			}						
		});
	});
}
