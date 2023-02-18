var socket = io.connect('http://10.0.0.13:6677',{'forceNew': true})

socket.on('messages', function(data){
    console.log(data)
    render(data)
})

function render(data){
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong>
                <p>${message.text}</p>
            </div>
        `)
    }).join(' ')

    var msgs = document.getElementById('messages')
    msgs.innerHTML = html
    msgs.scroll = msgs.scrollHeight
    
}

function Addmessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    }

    // document.getElementById('nombre').style.display = 'none'
    document.getElementById('nickname').style.display = 'none'
    socket.emit('Addmessage', message)

    return false
}