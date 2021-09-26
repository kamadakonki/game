function BtnClick() {
    let p = document.getElementById('text');
    let textLists = [
        "ActionScript",
        "Active-Directory",
        "ADSL",
        "AIFF",
        "AMPS",
        "AMR",
        "AngularJS",
        "Apache",
        "API",
        "APM",
        "APOP",
        "ARP",
        "ASCII",
        "ASP",
        "ATA",
        "ATM",
        "ATOK",
        "Atom",
        "AWS",
        "EC",
        "ECC",
        "ECMA",
        "ECMAScript",
        "EGP",
        "EIDE",
        "FDDI",
        "FFFTP",
        "FM",
        "FSF",
        "FTP",
        "FTP-Client",
        "FTP-Server",
        "FTTH",
        "HDLC",
        "HTML",
        "HTTP",
        "IaaS",
        "ICANN",
        "ICMP",
        "ICT",
        "IDE",
        "IEEE",
        "IETF",
        "IGP",
        "IMAP",
        "IMAP-Server",
        "IME",
        "IP",
        "IPv4",
        "IPv6",
        "IP-Address",
        "IRQ",
        "ISDN",
        "ISO",
        "ISP",
        "ITU",
        "M4V",
        "MBR",
        "MDA",
        "MNO",
        "MOV",
        "MP1",
        "MP4",
        "MPEG",
        "MRA",
        "MS-DOS",
        "MSA",
        "MTA",
        "MUA",
        "MVC",
        "MVNO",
        "MVP",
        "MVVM",
        "npm",
        "NTFS",
        "OGP",
        "OOCSS",
        "OOP",
        "OpenStack",
        "OpenVZ",
        "Oracle",
        "Oracle-Database",
        "ORM",
        "OS",
        "OSI",
        "OSPF",
        "OSS",
        "OSS-License",
        "RDBMS",
        "RFC",
        "RHEV",
        "RSpec",
        "RTF",
        "RTP",
        "SCSS",
        "SDK",
        "SFTP",
        "SIer",
        "SMS",
        "SMTP",
        "SMTP-Server",
        "SNMP",
        "SNS",
        "SQL",
        "SQLite",
        "SSG",
        "SSH",
        "SSL",
        "SVG",
        "Web-Application",
        "Web-Server",
        "WEP",
        "Windows",
        "WYSIWYG",
        "Xcode",
        "XHTML",
        "XML",
    ];

    let checkTexts = [];

    createText();

    function createText() {
        let rnd = Math.floor(Math.random() * textLists.length);
        //リセット処理
        p.textContent = '';
        //mapで一文字づつに処理を実行
        checkTexts = textLists[rnd].split('').map(function(value) {
            let span = document.createElement('span');
            span.textContent = value;
            p.appendChild(span);
            return span;
        });
    };
    //console.log(checkTexts);

    //keydownで文字入力後にイベント発生
    document.addEventListener('keydown', keyDown);
    //なんのkeyが入力されているかの情報
    function keyDown(e) {
        if (e.key === checkTexts[0].textContent) {
            checkTexts[0].className = 'add-blue';
            //shiftで前の配列を消す
            checkTexts.shift();
            if (!checkTexts.length) createText();
        }
    };
};