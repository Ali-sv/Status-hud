window.ResourceName = 'statushud'


function setHUDDisplay(opacity){
	var nimmug = document.getElementsByClassName('mugshotpos')[0].getBoundingClientRect();
	$('#hud').css('opacity', opacity);
	$('.info-hud.source').css('opacity', opacity);
	$('.info-hud.time-and-place').css('opacity', opacity);
};

function setHUDName(name){
	$('#hud #player-fullname span').text(name);
};

function setHUDID(source){
	$('#hud #source').text(source);
};

setHUDDisplay(1.0);
function setHUDJob(job){
	if(job.job.name == 'nojob'){
		$('#hud #player-job').fadeOut(2000);
	}else{
		$('#hud #player-job').fadeIn(2000);
	};

	if(job.job.ext){
		if(job.job.grade < 0){
			$('#hud #job-name span').text(((job.job.ext).replace('_', ' ')).toUpperCase());
			$('#hud #job-img img').attr('src', './img/logo/jobs/'+job.job.ext+'.png');
			$('#hud #job-grade span').text('Off-Duty');
		}else{
			$('#hud #job-name span').text(((job.job.ext).replace('_', ' ')).toUpperCase());
			$('#hud #job-img img').attr('src', './img/logo/jobs/'+job.job.ext+'.png');
			$('#hud #job-grade span').text(job.job.grade_label);
		};
	}else{
		if(job.job.grade < 0){
			$('#hud #job-name span').text(job.job.label);
			$('#hud #job-img img').attr('src', './img/logo/jobs/'+job.job.name+'.png');
			$('#hud #job-grade span').text('Off-Duty');
		}else{
			$('#hud #job-name span').text(job.job.label);
			$('#hud #job-img img').attr('src', './img/logo/jobs/'+job.job.name+'.png');
			$('#hud #job-grade span').text(job.job.grade_label);
		};
	};
};

function setHUDGang(gang){
	if(gang.gang.name == 'nogang'){
		$('#hud #player-gang').fadeOut(2000);
	}else{
		$('#hud #player-gang').fadeIn(2000);
	};

	$('#hud #gang-name span').text((gang.gang.name).replace('_', ' '));

	if(gang.gang.name == 'Mafia'){
		$('#hud #gang-img img').attr('src', './img/logo/gangs/'+gang.gang.name+'.png');
	}else{
		$('#hud #gang-img img').attr('src', './img/logo/gangs/gang.png');
	};

	$('#hud #gang-grade span').text(gang.gang.grade_label);
};

function updatePing(data){
		var s = data.value;
    $("[name='ping']").html(s)
	var x = document.getElementById("ping");

	
		if (s > 1 && s < 70) {
				$('#player-ping img').attr('src', './img/logo/wifi_g.png');
		x.style.color = "#13e94a";  
			} else if (s > 71 && s < 300) {
				$('#player-ping img').attr('src', './img/logo/wifi_y.png');
			x.style.color = "#e8f016"; }
			else {
		$('#player-ping img').attr('src', './img/logo/wifi_r.png');
		x.style.color = "#f01616"; 
	};

  }


function setHUDCash(money){
	$('#hud #player-cash-text').text('$'+money);
};

function setHUDData(data){
	if(data.health <= 10.0){
		$('#hud #health-img').addClass('ticktok');
	}else{
		$('#hud #health-img').removeClass('ticktok');
	};
	$('#hud #health').css('width', data.health+'%');
	$('#hud #armor').css('width', data.armor+'%');
};

function setHUDStatus(data){
	let hunger = data[0].percent;
    let thirst = data[1].percent;
	if(hunger <= 10.0){
		$('#hud #hunger-img').addClass('ticktok');
	}else{
		$('#hud #hunger-img').removeClass('ticktok');
	};

	if(thirst <= 10.0){
		$('#hud #thirst-img').addClass('ticktok');
	}else{
		$('#hud #thirst-img').removeClass('ticktok');
	};

	$('#hud #hunger').css('width', hunger+'%');
	$('#hud #thirst').css('width', thirst+'%');
};
window.addEventListener('message', (event) => {
	let data = event.data;
	switch(data.action) {
		case 'setHUDDisplay': {
			setHUDDisplay(data.opacity);
			break;
		};

		case 'setHUDName': {
			setHUDName(data.name);
			break;
		};

		case 'setHUDID': {
			setHUDID(data.source);
			break;
		};

		case 'setHUDJob': {
			setHUDJob(data.data);
			break;
		};
		
		case 'setHUDGang': {
			setHUDGang(data.data);
			break;
		};

		case 'setHUDPing': {
			setHUDPing(data.ping);
			break;
		};

		case 'setHUDData': {
			setHUDData(data.data);
			break;
		};

		case 'setHUDCash': {
			setHUDCash(data.money);
			break;
		};

		case 'setHUDStatus': {
			setHUDStatus(data.data);
			break;
		};

		  // Clock based on user's local hour


	};
	if (event.data.action == "ping"){
			updatePing(event.data);
		}
    //updateClock();
	
});