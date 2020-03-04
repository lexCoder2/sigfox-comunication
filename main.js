const service = require('./service');

function getMessages(deviceId) {
  return service.getMessagePerDevice(deviceId)
  .then(messages => 
    messages.map(mess => ({data: mess.data, time: mess.time, seqNumber: mess.seqNumber}) ) 
  )
}

function getDevicesIds() {
  return service.getDevices().then(devices => 
    devices.map(device=> device.id)
  )
}
const log = (data) => { console.log(data); return data }
const logLength = (data) => { console.log(data.length ? data.length : -1); return data }

function filterEmptyMessages() {
  return getMessages('40FF43')
  .then(logLength)  
  .then(msjs => msjs.filter(msj =>{
      const events = (msj.data+'').substring(msj.data.length - 2)
      return events.split('').map(e => +e).filter(e => e > 0) ? true : false;
    }))
    .then(logLength);
}

filterEmptyMessages()