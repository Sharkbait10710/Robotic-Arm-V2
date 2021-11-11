function On(input, sign) {
    ID = input; dir = sign;
    const Id = motorId(input);
    console.log('On running');
    const data = [
            {"propName": "state", "value": sign}
        ]
    const options = {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('http://192.168.0.15:3000/motors/'+Id, options);
    fetch('http://192.168.0.21/Id:'+Id+",state:"+sign);
}

function Off(input) {
    const Id = motorId(input);
    console.log('Off running');
    const data = [
            {"propName": "state", "value": "0"}
        ]
    const options = {
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    fetch('http://192.168.0.15:3000/motors/'+Id, options);
    fetch('http://192.168.0.21//Id:'+Id+",state:off");
}

function motorId(input) {
    switch (input) {
        case 'shoulder':
            return '608cedbc5957d835a4e40f5a';
        case 'shoulder_2':
            return '608da7277bd6ae4454703dec';
        case 'elbow':
            return '608d992eedc5d13c60b38f80';
        case 'wrist':
            return '608d995be01959233c5d4d18';
        case 'fingers':
            return '608d9ad91a1ec64058d510d3';
    }
} 

var interval_;

document.getElementById('shoulder').onmousedown = function() {
    On('shoulder', '1');
     interval_ = setInterval(function(){ On('shoulder', '1'); }, 2500);
}
document.getElementById('shoulder').onmouseup = function() {
    Off('shoulder');
    clearInterval(interval_); wdsd
}