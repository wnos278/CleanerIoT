const mqtt = require('mqtt')
const mongo = require('../db/connectmgdb')
const host = 'localhost'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
var count_receivermessage = 0;

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 6000,
    username: 'admin',
    password: 'admin',
    reconnectPeriod: 1000,
})


client.on('connect', () => {
    console.log('Connected')
    topic = 'hutbuiiotcommand';
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
})

client.on('connect', () => {
    console.log('Connected')
    topic = 'hutbuiiothomeinfo';
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
})

client.on('message', (topic, payload) => {
    if (topic == 'hutbuiiothomeinfo') {
        if (count_receivermessage % 100 == 0) {
            // get current timestamp
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time_end = Date.parse(date + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
            console.log(payload.toString());
            try {
                var data = JSON.parse(payload.toString())
                data["timestamp"] = time_end;
                mongo.insertData(data);
            }
            catch (exception)
            {

            }
            
        }
        count_receivermessage += 1;
    }
    if (topic == 'hutbuiiotcommand')
        console.log("Command: ", payload.toString())
})

exports.publishMessage = async (topic, data) => {
    if (topic == null)
        topic = 'hutbuiiotcommand';

    client.publish(topic, data, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
    })
}
