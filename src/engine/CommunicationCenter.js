const dgram = require('dgram')
const os = require('os')
const batman = dgram.createSocket('udp4')
const defPort = 2425
// 命令字
const commandNumber = {
    // 未知
    zero: 0,
    // 上线
    online: 6291457
}

batman.on('error', (err) => {
    console.log(`服务器异常：\n${err.stack}`);
    batman.close();
});

batman.on('message', (msg, rinfo) => {
    console.log(`服务器收到来自 ${rinfo.address}:${rinfo.port} 的消息：${msg}`);
});

batman.on('listening', () => {
    const address = batman.address();
    console.log(`服务器监听 ${address.address}:${address.port}`);
});

batman.on('close', () => {
    console.log('服务器监听关闭');
});

batman.bind(defPort);

export default {
    /**
     * 给默认端口发送消息
     */
    send: function (message, address) {
        batman.send(
            message,
            defPort,
            address
        );
        console.log(`发送消息 ${message} 到 ${address}:${defPort}`);
    },

    /**
     * 通知大伙，上线了！
     */
    enter: function (name) {
        batman.send(
            `1_lbt6_8#998#${this.getMacAddress()}#0#0#0#4001#9:${Date.now()}:${name}:${os.hostname()}:${commandNumber.zero}:`,
            defPort,
            this.getCurrentIPEndAddress()
        )

        batman.send(
            `1_lbt6_8#998#${this.getMacAddress()}#0#0#0#4001#9:${Date.now()}:${name}:${os.hostname()}:${commandNumber.online}:`,
            defPort,
            '255.255.255.255'
        )
    },

    /**
     * 获得当前IP下最后一个地址
     */
    getCurrentIPEndAddress: function () {
        let interfaces = os.networkInterfaces();
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    var array = alias.address.split(':');
                    return array[array.length - 1];
                }
            }
        }
    },
    /**
     * 获得 mac 地址
     */
    getMacAddress: function () {
        let interfaces = os.networkInterfaces();
        for (let devName in interfaces) {
            let iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    return alias.mac;
                }
            }
        }
    }
}
