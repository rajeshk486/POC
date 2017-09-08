
var bluetooth = navigator.bluetooth || navigator.mozBluetooth || navigator.webkitBluetooth;

document.querySelector('#find-devices').onclick = function() {
    if (!bluetooth) {
        throw new Error('Bluetooth not supported');
    }

    console.log('requestDevice..');
    navigator.bluetooth.requestDevice({
        acceptAllDevices: true
    }).then(onSuccess, onError);
};


function onSuccess(device) {
    console.log('Connecting to', device, '..');
    document.querySelector('#name').innerHTML=device.name;
    document.querySelector('#id').innerHTML=device.id;
    device.connectGATT()
    .then(function(server) {
        return server.getPrimaryService('heart_rate');
    })
    .then(function(service) {
        // Do something with the GATT service
        console.log(service);
    });
}

function onError(err) {
    console.log('Error:');
    console.log(err);
}
