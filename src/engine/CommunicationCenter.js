const dgram = require('dgram')
const os = require('os')
var iconv = require('iconv-lite');
const batman = dgram.createSocket('udp4')
const defPort = 2425
// 命令字
const commandNumber = {
    // 未知
    zero: 0,
    // 上线
    online: 6291457,
    // 下线
    offline: 6291458,
    // 输入状态
    input: 121,
    // 停止输入状态
    stop_input: 122,
    // 发送消息
    message: 288,
    // 消息接收成功回执
    message_recive_success: 33
}

batman.on('error', (err) => {
    console.log(`服务器异常：\n${err.stack}`);
    batman.close();
});

batman.on('message', (msg, rinfo) => {
    let buffer = new Buffer(msg);
    let message = iconv.decode(buffer,'gbk');
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
    port: defPort
}, () => {
    batman.setBroadcast(true)
});

export default {
    /**
     * 给默认端口发送消息
     */
    send: function (message, address) {
        let buffer = new Buffer(message);
        let msg = iconv.encode(buffer,'gbk');
        batman.send(
            msg,
            0,
            msg.length,
            defPort,
            address
        );
        console.log(`发送消息 ${message} 到 ${address}:${defPort}`);
    },

    message: function (msg, address) {
        this.send(
            `1_lbt6_8#998#FeiX#0#0#0#4001#9:${Date.now()}:def:TINCHER:${commandNumber.message}:${msg}`,
            address
        )
    },

    /**
     * 通知大伙，上线了！
     */
    enter: function (name) {
        for (let i = 0; i <= 255; i++) {
            this.send(
                `1_lbt6_8#998#FeiX#0#0#0#4001#9:${Date.now()}:${name}:TINCHER:${commandNumber.zero}:`,
                this.getCurrentCustomIPAddress(i)
            )
            this.send(
                `1_lbt6_8#998#FeiX#0#0#0#4001#9:${Date.now()}:${name}:TINCHER:${commandNumber.online}:${name}`,
                this.getCurrentCustomIPAddress(i)
            )
        }
    },

    /**
     * 获得当前IP段随意地址
     *
     * 会受到wifi热点影响，所以过程中不要共享热点
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
    }
}
