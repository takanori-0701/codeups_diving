
// ハンバーガーメニューとトップスライド
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる
    $(function () {
        // ハンバーガーメニューの開閉
        $('.toggle').on('click', function () {
            $(this).toggleClass('open'); // ハンバーガーアイコンのアニメーション切り替え

            // .sp-navのアニメーション制御
            if ($('.sp-nav').is(':visible')) {
                $('.sp-nav').fadeOut(400); // フェードアウト（400ms）
            } else {
                $('.sp-nav').fadeIn(400); // フェードイン（400ms）
            }
        });

        // ウィンドウリサイズ時の処理
        $(window).on('resize', function () {
            if ($(window).width() >= 782) {
                $('.sp-nav').hide(); // 強制的に非表示
                $('.toggle').removeClass('open'); // ハンバーガーアイコンの状態もリセット
            }
        });
        var swiper = new Swiper(".mySwiper", {
            loop: true, // スライダーをループさせる
            autoplay: { // 自動再生設定
                delay: 5000, // 3秒ごとにスライド
                disableOnInteraction: false, // ユーザーが操作しても自動再生を続ける
            },
        });
    });
});


// 戻るボタン
jQuery(function() {
    var pagetop = $('#page_top');   
    pagetop.hide();
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {  //100pxスクロールしたら表示
            pagetop.fadeIn();
        } else {
            pagetop.fadeOut();
        }
    });
    pagetop.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500); //0.5秒かけてトップへ移動
        return false;
    });
});

// 画像用アニメーション
// アニメーション用の初期設定
$(function () {
    var box = $('.colorbox'),
        speed = 700; // アニメーション速度

    // 初期設定
    box.each(function () {
        $(this).append('<div class="color"></div>'); // 背景要素を追加
        var color = $(this).find('.color'),
            image = $(this).find('img, .colorbox__img');

        image.css('opacity', '0'); // 画像を透明化
        color.css('width', '0%'); // 背景の幅を0%に設定
    });

    // Intersection Observerで画面内に入ったらアニメーションを実行
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const colorBox = $(entry.target); // 対象のcolorboxを取得
                const color = colorBox.find('.color');
                const image = colorBox.find('img, .colorbox__img');

                color.stop().animate(
                    { width: '100%' },
                    speed,
                    function () {
                        image.css('opacity', '1'); // 画像を表示
                        $(this).css({ left: '0', right: 'auto' });
                        $(this).animate({ width: '0%' }, speed); // 背景色を縮小
                    }
                );

                // 一度だけアニメーションさせる
                observer.unobserve(entry.target);
            }
        });
    });

    // colorboxを監視対象に設定
    box.each(function () {
        observer.observe(this);
    });
});

 // campaign-swiper
var campaign__swiper = new Swiper(".campaign-swiper", {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    spaceBetween: 26,
    autoplay: {
    delay: 2000,
    disableOnInteraction: false
    },
    watchOverflow: true, // スライドが1つの場合にも正しく動作する
    breakpoints: {
    768: {
        slidesPerView: "auto",
        spaceBetween: 40
    }
    },
    navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
    }
});