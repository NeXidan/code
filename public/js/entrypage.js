$(document).ready(function () {
    var mainWrap = $('.js-get-main-wrap');
    var popup = null;
    var popupCntnt = '';
    var sockets = new SocketWrap('localhost', 3000);
    var link = document.createElement('a');

    link.href = location.href;

    if (/doc/.test(link)) {
        var id = substring(url.lastIndexOf('/') + 1);
        console.log(id);
        setTimeout(function () {
            sockets.get(id);
        }, 1000);

        sockets.on(id, function (data) {
            console.log(data);
            $('.editor').html(data);
        });
    }

    $(document).on('click', '.js-get-create-doc', function () {
        popupCntnt = '<div class="popup-wrap pos-fix js-get-popup">' +
                            '<div class="popup-close js-get-close pos-abs"></div>' +
                            '<div class="popup--centered">' +
                                '<div class="popup__content pos-rel">' +
                                    '<div class="popup__content__body">' +
                                        '<textarea name="doc" rows="10" class="js-get-doc-text popup__content__body__text"></textarea>' +
                                    '</div>' +
                                    '<div class="popup__content__footer">' +
                                        '<span class="popup__content__footer__info js-get-info">' +
                                        '</span>' +
                                        '<div class="popup__content__footer__btn-wrap">' +
                                            '<button class="btn btn--sm js-create-method">Save</button>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>';

        mainWrap.append(popupCntnt);

        var saveButton = mainWrap.find('.js-create-method');

        sockets.on('success', function (data, id) {
            mainWrap.find('.js-get-info').html(data);
            saveButton.remove();
            window.location.href = '/doc/' + id;
        });

        popup = mainWrap.find('.js-get-popup');

        saveButton.on('click', function () {
            sockets.create($('.js-get-doc-text').val());
        });

        popup = mainWrap.find('.js-get-popup');

        $(document).on('click', '.js-get-close', function () {
            popup.remove();
        });
    });

    // save users
    var saveLogin = mainWrap.find('.js-save-login-name');

    saveLogin.on('click', function () {
        var name = mainWrap.find('.js-get-login-name').val();
        sockets.create(name);
        mainWrap.find('.profile__name').text(name);
        mainWrap.find('.profile__name').show();
    });
});
