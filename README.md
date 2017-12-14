# FeiX

平时工作需要，需要用到飞秋，但是找不到 mac 平台上的飞秋，所已想要做一个统一三个平台（ mac os, linux, windows ）的局域网通讯工具，深度兼容飞秋。

### 开发进度

平台兼容顺序：

1. mac os ( 开发中。。。 )
2. linux
3. windws

### 飞秋简介（ [资料来自网络](http://blog.163.com/weiming886521365@126/blog/static/3311507420124141159195/) ）

>飞秋是一款局域网聊天传送文件的绿色软件，它参考了飞鸽传书(IPMSG)和QQ, 完全兼容飞鸽传书(IPMSG)协议，具有局域网传送方便，速度快，操作简单的优点，同时具有QQ中的一些功能,是飞鸽的完善代替者，另外，飞秋支持语音，远程协助群聊天（不需要服务器），它参考了飞鸽传书（FreeEIM）和QQ, 完全兼容飞鸽传书协议，具有局域网传送方便，速度快，操作简单的优点，同时具有QQ中的一些功能。

1. 飞秋启动时使用UDP协议向255.255.255.255这个广播地址发送广播包,默认端口是2425。广播包内容包含用户名、工作组、主机名、IP等信息；已启动飞秋的用户通过2425端口收到此广播包后，就会在自己的用户列表中添加这个用户的用户名、工作组等信息，同时向对方IP发送本机用户的个人信息；从而双方都能建立起用户列表；

2. 刷新用户列表时发送的广播包和启动时差不多，只不过返回的标识信息略有不同；

3. 传送聊天信息时同样使用UDP协议；由于UDP协议是无连接协议，传输速度快，但是没有确认机制，是不可靠的协议，需要自己定义返回信息的标志来判断对方是否收到信息；

4. 用户离线时发送一个离线广播包到255.255.255.255，收到此广播包的用户，根据包中的IP地址（也可能是多种判断标志或者包含硬件标识，比如网卡地址等）删除对方的用户列表信息；

5. 广域网无法直接使用广播方式，靠手工添加”局域网外广播列表”来建立相互的关系；

6. 飞秋传送文件是使用TCP协议，端口2425；

### IPMSG （ [资料来源于网络](https://www.cnblogs.com/hnrainll/archive/2011/05/07/2039567.html) ）

>本协议是由日本人Shirouzu Hiroaki （白水 启章）先生编写。它是基于TCP/IP端口的收发信息服务;飞鸽传书可以安装在任一使用TCP/IP协议的的操作系统上。在网络中完成了动态用户识别机制。所有飞鸽用户之间可以相互交换信息。飞鸽使用TCP/UDP端口（默认端口：2425）。信息发送/接收使用UDP协议， 文件发送/接收使用TCP协议。

#### 1. 命令

##### 1) 命令功能（32位命令字的低8位）

IPMSG_NOOPERATION  没有任何操作

IPMSG_BR_ENTRY 上线（开始于广播此命令）

IPMSG_BR_EXIT  下线（结束于广播此命令）

IPMSG_ANSENTRY 通报新上线

IPMSG_BR_ABSENCE 更改为离开状态

IPMSG_BR_ISGETLIST 搜寻有效的主机用户

IPMSG_OKGETLIST 主机列表发送通知

IPMSG_GETLIST 主机列表发送请求

IPMSG_ANSLIST 主机列表发送

IPMSG_SENDMSG 消息传送

IPMSG_RECVMSG 接收消息确认

IPMSG_READMSG 消息打开通知

IPMSG_DELMSG 消息丢弃通知

IPMSG_ANSREADMSG 消息打开确认通知（版本8中加入）

IPMSG_GETFILEDATA 基于TCP的文件传送请求

IPMSG_RELEASEFILES 丢弃（取消）附件文件的接收

IPMSG_GETDIRFILES 文件夹传书请求

IPMSG_GETINFO 飞鸽版本信息

IPMSG_SENDINFO 传送飞鸽版本信息

IPMSG_GETABSENCEINFO 获取离线判定

IPMSG_SENDABSENCEINFO 发送离线判定

IPMSG_GETPUBKEY RSA公钥获取

IPMSG_ANSPUBKEY RSA公钥相应

##### 2）选项位（32位命令字的高24位）

IPMSG_ABSENCEOPT 离开状态（用户识别命令）

IPMSG_SERVEROPT 服务器（保留）

IPMSG_DIALUPOPT 发送个人用户识别命令

IPMSG_SENDCHECKOPT 传送检查

IPMSG_SECRETOPT 封闭信息

IPMSG_READCHECKOPT 封闭信息检查（版本8中加入）

IPMSG_PASSWORDOPT 锁

IPMSG_BROADCASTOPT 广播信息

IPMSG_MULTICASTOPT 多播

IPMSG_NEWMUTIOPT 新版本多播

IPMSG_AUTORETOPT 自动回复

IPMSG_NOLOGOPT 无日志文件

IPMSG_NOADDLISTOPT 不在线用户通知

IPMSG_FILEATTACHOPT 文件附件选项

IPMSG_ENCRYPTOPT 编码

IPMSG_NOPOPUPOPT 不可用

IPMSG_RETRYOPT 重发位（在获取hostlist时使用）

##### 3）扩展编码位（十六进制格式组合）

IPMSG_RSA_512

IPMSG_RSA_1024

IPMSG_RSA_2048

IPMSG_RC2_40

IPMSG_RC2_128

IPMSG_RC2_256

IPMSG_BLOWFISH_128

IPMSG_BLOWFISH_256

IPMSG_SIGN_MD5

##### 4）文件附件扩展（文件属性低8位）

IPMSG_FILE_REGULAR

IPMSG_FILE_DIR

IPMSG_FILE_RETPARENT

IPMSG_FILE_SYMLINK

IPMSG_FILE_CDEV

IPMSG_FILE_BDEV

IPMSG_FILE_FIFO

IPMSG_FILE_RESFORK

##### 5）附件文件属性（文件属性高24位）

IPMSG_FILE_RONLYOPT

IPMSG_FILE_HIDDENOPT

IPMSG_FILE_EXHIDDENOPT

IPMSG_FILE_ARCHIVEOPT

IPMSG_FILE_SYSTEMOPT

##### 6）附件文件的扩展文件属性

IPMSG_FILE_UID

IPMSG_FILE_USERNAME

IPMSG_FILE_GID

IPMSG_FILE_GROUPNAME

IPMSG_FILE_PERM

IPMSG_FILE_MAJORNO

IPMSG_FILE_MINORNO

IPMSG_FILE_CTIME

IPMSG_FILE_MTIME

IPMSG_FILE_ATIME

IPMSG_FILE_CREATETIME

IPMSG_FILE_CREATOR

IPMSG_FILE_FILETYPE

IPMSG_FILE_FINDERINFO

IPMSG_FILE_ACL

IPMSG_FILE_ALIASFNAME

IPMSG_FILE_UNICODEFNAME


#### 2. 数据包格式（使用字符串形式）

版本：包编号：发送者名字：发送主机：命令编号：附加信息区域

例："1:100:shirouzu:jupiter:32:Hello"


#### 3. 数据包过程总览

##### 1) 用户识别

1. 飞鸽启动时 IPMSG_BR_ENTRY 命令向当前所有用户发送上线通知。
2. 所有用户当受到通知信息时把用户加入列表。
3. IPMSG_ANSENTRY 命令回发到上线新用户。
4. 新用户通过 IPMSG_ANSENTRY 命令得到当前在线用户信息。所有用户在IP存在时可以互相通信。
5. IPMSG_BR_ABSENCE 信息广播给所有用户该用户离开状态取消或者昵称改变,但是和 IPMSG_BR_ENTRY 命令不同的是 IPMSG_BR_ABSENCE 命令不回发信息。
6. IPMSG_BR_ENTRY, IPMSG_ANSENTRY, 和 IPMSG_BR_ABSENCE 命令使用 IPMSG_ABSENCEOPT 标识离开状态。输入昵称到附加命令中。
7. 添加 IPMSG_DIALUPOPT 标识广播信息不能达到的拨号用户。用户判定命令需要个别发任选位到用户。
8. IPMSG_BR_ENTRY 和IPMSG_BR_ABSENCE 命令可以发送组名，采用在当前命令格式串后添加组名。 (在当前命令和附加名字之间添加‘\0’）

##### 2) 发送/接收信息

1. 使用 IPMSG_SENDMSG 命令发送信息，采用在扩展区域添加信息。
2. 如果 IPMSG_SENDCHECKOPT 位打开，接收信息回发 IPMSG_RECVMSG 命令。添加最初的包编号到扩展区域中。
3. 使用 IPMSG_BOADCASTOPT 命令发送广播信息，IPMSG_SENDMSG 位应该打开。
4. 自动发送包（离开通知）需要添加进 IPMSG_AUTORETOPT for ping-pong 保护，如果一个或者另外一个是打开状态，确认/自动发送包不回发。
5. 发送信息时密封需要 IPMSG_SECRETOPT 包打开。这种情况之下，接收信息发送一个 IPMSG_READMSG命令。在附加区域加入最初包号。
6. 当接收文件时，来自主机的IPMSG_SENDMSG 包没有在你的发送/接收列表，飞鸽将确认主机通过发送 IPMSG_BR_ENTRY 命令，或者添加主机名到发送/接收列表。但是，单脉冲信息发送/接收行为需要被禁止。添加 IPMSG_NOADDLISTOPT 位到 IPMSG_SENDMSG 命令。
7. 当 IPMSG_READMSG 命令含有 IPMSG_READCHECKOPT 位，飞鸽处理过程和 IPMSG_SENDMSG 同样具有 IPMSG_SENDCHECKOPT 位。但是，发送信息使用 IPMSG_ANSREADMSG 命令，不是 IPMSG_RECVMSG。

##### 3）信息发送/接收 加密扩展(在版本-9中加入)

使用公钥和普通密钥的结合。加密扩展区域使用十六进制格式

公钥获得）发送IPMSG_GETPUBKEY命令接收文件。接收文件时得到意味着接收到发送端公钥的命令 IPMSG_ANSPUBKEY。

IPMSG_GETPUBKEY/IPMSG_ANSPUBKEY 都需要加密容量位 在扩展区域的开始处使用OR。另外，在IPMSG_ANSPUBKEY中，公钥按照以下形式EE-NNNNNN E=Exponent丄N=method)用':'分开。同时，在E和N中间添加‘-’.

这个序列可以在第二次发送/接收处理时通过记录公钥和加密信息跳过。(加密信息)当发送方建立一个发送方和接收方的普通密钥后，它就能加密信息。另外，接收方的公钥加密普通密钥。

（加密信息传输）IPMSG_ENCRYPTOPT在IPMSG_SENDMSG中使用。在扩展区域的开始，加入公钥和普通密钥的or值。然后使用使用以':'为分隔符的公钥加密的普通密钥。然后加入使用':'为分隔符的加密信息。如果都是IPMSG_SIGN_XXX，则添加‘：’和签名。


当然，在编码填充的方法上，PKCS#1ECB被用于RSA，PKCS#5 CBC被用于RC2/blowfish。当然，包关联于使用IPMSG_ENCRYPTOPT加密支持的容量的入口表现

##### 4）文件附件扩展（从版本-9时可以使用）

1. 包含IPMSG_FILEATTACHOPT位的IPMSG_SENDMSG文件传输命令标志着有附件信息。在信息后和附件信息后加入'\0'。（大小，修改时间，十六进制描述的文件属性，如果文件名中含有':'，请用"::"替代。）

2. 当接收信息下载附件文件时，IPMSG_GETFILEDATA命令请求和UDP一样的TCP数据传输包端口。在扩展区域添加packetID:fileID: offset（均使用十六进制格式）

3. 文件发送方收到请求。当判定它是正确的请求之后发送指定数据。（无格式）当数据接收方下载划分的附件文件时，使用IPMSG_GETDIRFILES命令，并且将packetID:fileID写入扩展区域，发送数据传输请求包。（均使用十六进制）

具体步骤：

1. 发送端发送一个UDP数据包，通知接收端准备接收文件,通知在一个socket上监听TCP连接事件

2. 接收端回发一个UDP数据包,告诉发送端已准备好接收数据,并请求一个TCP的连接

3. 发送端接收连接的请求,并将文件映射到内存中,然后创建发送文件线程,开始进行数据的发送

4. 接收端创建接收的文件,然后创建接收数据的线程,开始收取数据.接受完以后,将数据写入到创建好的文件中.

>文件的传输，要稍微复杂一些，它是通过 IPMSG_SEND_MSG 命令与 IPMSG_FILEATTACHOPT选项的组合，通知接收方“现在有文件要发给你了
”,同时要将一些描述文件属性的数据（如文件名、大小、创建时间、类别属性如文件夹），发送给接收方，具体格式如下：
file1ID:filename:size:mtime:fileattr[:extend-attr=val1[,val2...][:extend-attr2=...]]:\a:file2ID...
这里需要注意的有几点，
第一，一条文件传送命令，可以携带多条文件信息；
第二，多个文件信息之前，要用\a分割；
第三，size, mtime 和fileattr 是用十六进制数描述的）；第四，如果文件名中包含“:”，则需要将其转义为“::”。

>相应的，接收方收到文件传送命令后，首先需要从文件属性的数据中解析出要接收的文件的属性。然后向发送方相同的端口进行TCP连接，
连接成功后，通过TCP通道向发送方发送IPMSG_GETFILEDATA命令用于接收文件或发送IPMSG_GETDIRFILES命令，用于接收文件夹。
具体接收文件的命令如下：
1:XXX:m8:<主机名>:IPMSG_GETFILEDATA:packetID:fileID : offset
这条命令通过packetID，让发送方明白对方请求的文件是源于哪个命令包；通过fileId让发送方确定要发哪个文件;通过offset；
让发送方明白要从哪个字节开始发送。
发送方的TCP通道收到上面的命令，就会发送对方请求的文件；而接收方将收到的数据保存到磁盘上即可。

比较乱，待整理。。。

##### 5）其他命令

1. 当获得不同的版本时，发送 IPMSG_GETINFO 命令。接收方发送版本信息字符串到扩展区域。
2. 发送 IPMSG_GETABSENCEINFO 命令来获取离开信息，如果接收方是离开状态，则回发 IPMSG_SENDABSENCEINFO。如果状态不是离开状态，字符串"Not absence mode"将会被发送。

##### 6）确认/重发

如果IPMSG_SENDMSG 或者 IPMSG_RECVMSG的确认包没有在指定时间内投递，它将会被重发。重发行为或者间隔的时间段将依赖于当前的条件。

#### 4. 其他

##### 1）换行

在发送信息中的换行符是以Unix类型为标准的。如果需要可以改变。

##### 2）分隔符

1. ':'被用做分隔符。你不可以在用户名和主机名中使用这个分隔符。

2. 如果用户/主机中含有':'，请使用其他符号替换，例如';'.

### 飞秋协议分析

飞秋在 IPMSG 协议上做了拓展，下面将会使用 [Wireshark](https://www.wireshark.org/) 逐步进行分析补充
