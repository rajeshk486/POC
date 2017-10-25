function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	var ampm = h >= 12 ? 'PM' : 'AM';
	h = h % 12;
	h = h ? h : 12; // the hour '0' should be '12'
	m = m < 10 ? '0' + m : m;
	s = s < 10 ? '0' + s : s;
	h = h < 10 ? '0' + h : h;
	document.getElementById('time').innerHTML = h + ":" + m + ":" + s + " "
			+ ampm;
	var t = setTimeout(startTime, 500);
}
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}
	; // add zero in front of numbers < 10
	return i;
}
function dateFetch() {
	var dateformat = new Date();
	var day = dateformat.getDate();
	var mon = dateformat.getMonth();
	var year = dateformat.getFullYear();
	mon = mon < 10 ? '0'+mon:mon;
	document.getElementById('date').innerHTML = day + "/" + mon + "/" + year;
}


var value = 0;
function increase(){
	value = value + 20;
	if(value>=100) value = 100;
	document.getElementById("progress").style.width = value + "%";
}
function decrease(){
	value = value - 20;
	if(value<=0) value = 0;
	document.getElementById("progress").style.width = value + "%";
}


function onButtonClick() {
	log('Requesting Bluetooth Device...');
	navigator.bluetooth.requestDevice(
	{filters: [{services: ['battery_service']}]})
	.then(device => {
		log('Connecting to GATT Server...');
		return device.gatt.connect();
	})
	.then(server => {
		log('Getting Battery Service...');
		return server.getPrimaryService('battery_service');
	})
	.then(service => {
		log('Getting Battery Level Characteristic...');
		return service.getCharacteristic('battery_level');
	})
	.then(characteristic => {
		log('Reading Battery Level...');
		return characteristic.readValue();
	})
	.then(value => {
		let batteryLevel = value.getUint8(0);
		log('> Battery Level is ' + batteryLevel + '%');
	})
	.catch(error => {
		log('Argh! ' + error);
	});
}
