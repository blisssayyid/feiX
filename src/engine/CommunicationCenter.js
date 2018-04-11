const dgram = require('dgram')
const os = require('os')
const iconv = require('iconv-lite');
const commandCode = require('../data/config/CommandCode.json')
const defConfig = require('../data/config/DefConfig.json')
const batman = dgram.createSocket('udp4')

batman.on('error', (err) => {
    console.log(`服务器异常：\n${err.stack}`);
    batman.close();
});

batman.on('message', (msg, rinfo) => {
    let buffer = new Buffer(msg);
    let message = iconv.decode(buffer, 'gbk');
    console.log(`服务器收到来自 ${rinfo.address}:${rinfo.port} 的消息：${message}`);
});

batman.on('listening', () => {
    const address = batman.address();
    console.log(`服务器监听 ${address.address}:${address.port}`);
});

batman.on('close', () => {
    console.log('服务器监听关闭');
});

batman.bind({
    port: defConfig.port
}, () => {
    batman.setBroadcast(true)
});

export default {
    /**
     * 给默认端口发送指令等
     */
    send: function (message, address) {
        let buffer = new Buffer(message);
        let msg = iconv.encode(buffer, 'gbk');
        batman.send(
            msg,
            0,
            msg.length,
            defConfig.port,
            address
        );
        console.log(`发送消息 ${message} 到 ${address}:${defConfig.port}`);
    },

    /**
     * 发送消息
     * @param msg
     * @param address
     */
    message: function (msg, address) {
        this.send(
            this.getChangelessCommand(commandCode.MESSAGE, msg),
            address
        )
    },

    /**
     * 通知大伙，上线了！
     */
    enter: function () {
        this.send(
            this.getChangelessCommand(commandCode.ZERO),
            "255.255.255.255"
            // this.getCurrentCustomIPAddress(i)
        )
        this.send(
            this.getChangelessCommand(commandCode.ONLINE, defConfig.user + defConfig.group),
            "255.255.255.255"
            // this.getCurrentCustomIPAddress(i)
        )
        this.send(
            this.getChangelessCommand(6291459, defConfig.user + defConfig.group),
            "255.255.255.255"
            // this.getCurrentCustomIPAddress(i)
        )
    },

    /**
     * 获得当前IP段随意地址
     *
     * 会受到wifi热点影响，所以过程中不要共享热点
     *
     * @param 最后一位的IP
     */
    getCurrentCustomIPAddress: function (number) {
        if (number < 0) {
            number = 0
        }
        if (number > 255) {
            number = 255
        }
        let currentIP = this.getCurrentIPAddress();
        let array = currentIP.split('.');
        array[array.length - 1] = number;
        return array.join('.')
    },

    /**
     * 获得当前IP地址
     *
     * 会受到wifi热点影响，所以过程中不要共享热点
     */
    getCurrentIPAddress: function () {
        let interfaces = os.networkInterfaces();
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    let array = alias.address.split(':');
                    return array[array.length - 1];
                }
            }
        }
    },

    /**
     * 组合 信息指令（一般固定不变的）
     *
     * @param commandCode 指令
     * @param msg 信息
     */
    getChangelessCommand: function (commandCode, msg = "") {
        return `${defConfig.version}#${defConfig.level}#${defConfig.info}#${defConfig.mysteriousCode}:${Date.now()}:${defConfig.user}:${defConfig.location}:${commandCode}:${msg}`
    }
}
