if (window.location.href.match(/\/groups\/\d+\/messages/)){
  $(function(){
    function buildMessageHTML(message){
      
      let image = (message.image) ? `<img class="lower-message__image" src="${message.image}" alt="no_image">` : "";
      
      let html = `<div class="message", data-message-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.updated_at}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                        ${image}
                    </div>
                  </div>`
      return html;
    }
    let reloadMessages = function() {
      last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        let insertHTML = "";
        messages.forEach(function (message) {
          insertHTML = buildMessageHTML(message); 
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        })
      })
      .fail(function() {
      });
    };
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      let formData = new FormData(this);
      let url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(message){
        let html = buildMessageHTML(message);
        $('.messages').append(html);
        $("#new_message")[0].reset();
        $('.form__submit').prop('disabled', false);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      })
      .fail(function(){
        alert('エラー')
        $('.form__submit').prop('disabled', false);
      })
    });
    setInterval(reloadMessages, 7000);
  });
}