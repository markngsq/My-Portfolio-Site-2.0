// So hi, this is where the jsons go...
// right below here you have the space to enter more variants

var userData = {
  mark : {
    name: 'Mark Ng',
    splash: 'dist/images/mark-splash.jpg',
    image: 'dist/images/mark-inline.jpg',
    qn1: 'Hi my name is Mark',
    qn2: 'mark2',
    qn3: 'mark3',
    qn4: 'mark4',
    qn5: 'mark5',
    contact1: '+65 mmmm mmmmmm',
    contact2: 'www.markng.net',
    contact3: 'markngshiqiang@gmail.com'
  },
  hannah : {
    name: 'Hannah Broom',
    splash: 'dist/images/hannah-splash.jpg',
    image: 'dist/images/hannah-inline.jpg',
    qn1: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. \
          Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. \
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. \
          Curabitur aliquet quam id dui posuere blandit. \
          Curabitur aliquet quam id dui posuere blandit. \
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; \
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. \
          Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
    qn2: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. \
          Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. \
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. \
          Curabitur aliquet quam id dui posuere blandit. \
          Curabitur aliquet quam id dui posuere blandit. \
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; \
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. \
          Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
    qn3: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. \
          Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. \
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. \
          Curabitur aliquet quam id dui posuere blandit. \
          Curabitur aliquet quam id dui posuere blandit. \
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; \
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. \
          Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
    qn4: 'Quisque velit nisi, pretium ut lacinia in, elementum id enim. \
          Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. \
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. \
          Curabitur aliquet quam id dui posuere blandit. \
          Curabitur aliquet quam id dui posuere blandit. \
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; \
          Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. \
          Pellentesque in ipsum id orci porta dapibus. Donec rutrum congue leo eget malesuada. \
          Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.',
  },
  robin : {
    name: 'Robin Barnes',
    splash: 'dist/images/robin-splash.png',
    image: 'dist/images/robin-inline.png',
    qn1: ' (insert aesthetic here)',
    qn2: 'roro2',
    qn3: 'roro3',
    qn4: 'roro4',
    qn5: 'roro5'
  }
};

// serializeArray tests

// Not entirely sure what this parts do below but calvin helped me on this...
// not to add more classes in look at the last four lines

$('.user-link').on('click', function(e) {
  e.preventDefault();//prevent the link from being followed
  var slug = $(this).attr('data-slug');
  var userMeta = userData[slug];
  $('.user-name').text(userMeta.name);
  $('.user-splash').css('background-image', 'url(' + userMeta.splash + ')');
  $('.user-image').attr('src', userMeta.image);
  $('.qn1').text(userMeta.qn1);
  $('.qn2').text(userMeta.qn2);
  $('.qn3').text(userMeta.qn3);
  $('.qn4').text(userMeta.qn4);
  $('.qn5').text(userMeta.qn5);
  $('.contact-information1').text(userMeta.contact1);
  $('.contact-information2').text(userMeta.contact2);
  $('.contact-information3').text(userMeta.contact3);
});

$('.navlist span').click(function(e) {
  e.preventDefault(); //prevent the link from being followed
  $('.navlist span').removeClass('user-active');
  $(this).addClass('user-active');
});
