$(function(){
  function buildMessage(message){
     
    let image = (message.image) ? `<img class="lower-message__image" src="${message.image}" alt="no_image">` : "";
    
    let html = `<div class="message">
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
      // console.table(message);
      let html = buildMessage(message);
      // console.log(html);
      $('.messages').append(html);
      // $('#message_content').val('');
      $("#new_message")[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('エラー')
      $('.form__submit').prop('disabled', false);
    })
  })
});