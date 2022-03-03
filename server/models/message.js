const mongo = require('../db/connectmgdb')
var md = require('../services/MQTTBroker');
const queueName = "hutbuiiotcommand"
// type, temperature, humidity, turnOnLed, timestamp

exports.getRoomInfo = async (time_begin, time_end) => {
    // MGDB.insertData(""); // test db
    let result = await mongo.selectManyDataWithTimeStamp(time_begin, time_end);
    var fix_results = [];
    (result).forEach(element => {
        fix_results.push(
            {
                "temperature": element["temperature"], 
                "humidity": element["humidity"], 
                "timestamp": element["timestamp"],
            }
            );
    });
    return fix_results;
}

exports.makeTurnDownMessage = async () => {
    message = 'd';
    await md.publishMessage(queueName, message);
    return 1;
}

exports.makeTurnUpMessage = async () => {
    message = 'u';
    await md.publishMessage(queueName, message);
    return 1;
}

exports.makeTurnRightMessage = async () => {
    message = 'r';
    await md.publishMessage(queueName, message);
    return 1;
}

exports.makeTurnLeftMessage = async () => {
    message = 'l';
    await md.publishMessage(queueName, message);
    return 1;
}

exports.makeTurnOffAutoMessage = async () => {
    message = '0';
    await md.publishMessage(queueName, message);
    return 1;
}

exports.makeTurnOnAutoMessage = async () => {
    message = '1';
    await md.publishMessage(queueName, message);
    return 1;
}