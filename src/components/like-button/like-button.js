import './like-button.scss'

$(document).ready(() => {
  const $likeButtons = $('.like-button')

  $likeButtons.each((index, button) => {
    $(button).click(function() {
      const $this = $(this)

      const $likesNumber = $this.find('.like-button__likes-number')

      $this.toggleClass('like-button_active')

      let likes = $this.data('likes')

      if ($this.hasClass('like-button_active')) {
        likes++
      } else {
        likes--
      }
      $this.data('likes', likes)

      $likesNumber.html(likes)
    })
  })
})
