function onmousemove_page(event){

  if( window.event)
    event = window.event;
  
  mousePos = {};
  mousePos.x = event.clientX ;
  mousePos.y = event.clientY ;

  let spanx = document.querySelector("#poscx");
  spanx.innerHTML = event.clientX;

  let spany = document.querySelector("#poscy");
  spany.innerHTML = event.clientY;
}


function onkeyd_page(event){
	if(window.event)
		event = window.event;

	keyd = String.fromCharCode(event.keyCode);

	if(keyd == "Q" || event.keyCode == 37)
	{
		leftEna = 1;
	}
	if(keyd == "R" )
	{ 
		l=0;
		loadedAssets.audiorecharger.play();
	}
	
	if(keyd == "Z" || event.keyCode == 38)
	{
		upEna = 1;
	}
	
	if(keyd == "S" || event.keyCode == 40)
	{
		downEna = 1;
	}
	
	if(keyd == "D" || event.keyCode == 39)
	{
		rigthEna = 1;
	}

	if(event.keyCode == 32 && chevalEna == 1)
	{
		//DESCENDRE CHEVAL
		chevalEna = 0;
		ch1.x = p1.x - 15;
		ch1.v = 5;
		p1.v=5;
	}

	if(event.keyCode == 27)
	{
		//GESTION DE LA PAUSE
		if(pauseEna)
		{
			pauseEna = 0;
			icompPause = 0;
			loadedAssets.audiofond.play();
			loadedAssets.audiomus2.pause();
		}
		else if(!pauseEna)
		{
			pauseEna = 1;
			loadedAssets.audiofond.pause();
			loadedAssets.audiomus2.play();
		}
	}

  if(finEnaLose || finEnaWin){
    if(event.keyCode == 32){
      animeInitializer();
      // requestAnimationFrame(anime);
    }
  }
}

function onkeyu_page(event)
{
	if(window.event)
		event = window.event;
	
	keyu = String.fromCharCode(event.keyCode);

	if(keyu == "Q" || event.keyCode == 37)
	{
		leftEna = 0;
	}
	if(keyu == "Z" || event.keyCode == 38)
	{
		upEna = 0;
	}
	if(keyu == "S" || event.keyCode == 40)
	{
		downEna = 0;
	}
	if(keyu == "D" || event.keyCode == 39)
	{
		rigthEna = 0;
	}  
}