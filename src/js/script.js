
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
