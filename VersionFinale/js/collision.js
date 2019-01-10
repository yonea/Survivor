 function CollisionZombieAvecPersonnage() {
 	tableauDesZombies.forEach((r) => {
 		if(((r.x) <= p1.x + 50 ) && ((r.y) <= p1.y + 50 ) && ((r.x) >= p1.x - 50 ) && ((r.y) >= p1.y - 50 )) 
 		{
 			finEnaLose = 1;
 			loadedAssets.audiofond.pause();
 		}
 	});
 }
 function CollisionBalleAvecZombie(zombie,i, balle, j) {
 	let r = balle;
 	if(((r.x) <= zombie.x + 50 ) && ((r.y) <= zombie.y + 50 ) && ((r.x) >= zombie.x - 50 ) && ((r.y) >= zombie.y - 50 )) {
 		if(i==0){
 			tableauDesZombies.splice(i,1);
 		}
 		else{
 			tableauDesZombies.splice(i,1);
 		}

 		if(j==0){
 			tableauDesBalles.splice(j,1);
 		}
 		else{
 			tableauDesBalles.splice(j,1);
 		}		
 	}
 	if(stage1 && tableauDesZombies.length == 0)
 	{
 		Stage2();
 	}
 	if(stage2 && tableauDesZombies.length == 0)
 	{
 		Stage3();
 	}
 	if(stage3 && tableauDesZombies.length == 0)
 	{
 		Stage4();
 	}
 	if(stage4 && tableauDesZombies.length == 0)
 	{
 		finEnaWin = 1;
 	}
 }
 function detectMur()
 {
 	if(p1.x <= 5)
 	{
 		leftEna = 0;
 	}
 	if(p1.x >= (lc))
 	{
 		rigthEna = 0;
 	}
 	if(p1.y <= 6)
 	{
 		upEna = 0;
 	}
 	if(p1.y >= hc)
 	{
 		downEna = 0;
 	}
 }