let input = document.getElementById('inp');
let button = document.getElementById('start');
let button2 = document.getElementById('stop');
let result = document.getElementById('res');
var socket = io();
let nam = '';
let checker = true;


inpName()

function inpName(){
    nam = window.prompt('Whats your name');
    if (nam== null){
        nam = 'Anonymous'
    }
    console.log(nam);
    
}


function send(){
};


//ek jagah socket on hota hai aur ek jagah socket emit karta hai
socket.on('id', function(data){
// ab socket id aur socket name ko uske andar isliye banaya hai because 
    socket.emit('name', {'name':nam});
    console.log(data);
});


socket.on('audioMessage', function (audioChunks) {
    //blobs are the temperary memory reserved in browser
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
});
// socket.on('user', function (usercount) {
//     $('.usercount').text(usercount)
// });
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        var audioChunks = [];
        $("start").click(function (e) {
            // if (checker== true){
              mediaRecorder.start();
            //   checker = false
            // $(this).toggleClass("paused");  
            },
            $("stop").click(function (e) {
                mediaRecorder.stop();
                // checker = true
            }
            
        });
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
            socket.broadcast.emit('audioMessage', audioChunks);
            socket.emit('audioMessage', audioChunks);
            audioChunks = [];
        });
    });

socket.on('audioMessage', function (audioChunks) {
    const audioBlob = new Blob(audioChunks);
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
});
socket.on('user', function (usercount) {
    $('.usercount').text(usercount)
});
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        var audioChunks = [];
        ("start").click(function (e) {
            mediaRecorder.start();});
            // $(this).toggleClass("paused");
        })
            ("stop").click(function (e) {
                mediaRecorder.stop();
                $(this).toggleClass("paused");
            });
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", () => {
            //socket.broadcast.emit('audioMessage', audioChunks);
            socket.emit('audioMessage', audioChunks);
            audioChunks = [];
        });
    }