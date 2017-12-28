const dgram = require('dgram')
const os = require('os')
const batman = dgram.createSocket('udp4')

batman.on('error', (err) => {
  console.log(`服务器异常：\n${err.stack}`);
  batman.close();
});

batman.on('message', (msg, rinfo) => {
  console.log(`服务器收到：${msg} 来自 ${rinfo.address}:${rinfo.port}`);
});

batman.on('listening', () => {
  const address = batman.address();
  console.log(`服务器监听 ${address.address}:${address.port}`);
});

batman.on('close', () => {
  console.log("服务器监听关闭");
});

batman.bind(2425);

/**
 * 给默认端口发送消息
 */
function send(message: String, address: String) {
  batman.send({
    message,
    2425,
    address
  });
}

/**
 * 通知大伙，上线了！
 */
function enter(name: String) {
  batman.send({
    `1_lbt6_8#998#${getMacAddress()}#0#0#0#4001#9:${Date.now()}:${name}:${os.hostname()}:0:`,
    2425,
    getCurrentIPEndAddress()
  });

  batman.send({
    `1_lbt6_8#998#${getMacAddress()}#0#0#0#4001#9:${Date.now()}:${name}:${os.hostname()}:6291457:`,
    2425,
    '255.255.255.255'
  });
}

/**
 * 获得当前IP下最后一个地址
 */
function getCurrentIPEndAddress(): String {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        var array = alias.address.split(":");
        return array[array.length - 1];
      }
    }
  }
}

/**
 * 获得 mac 地址
 */
function getMacAddress(): String {
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
