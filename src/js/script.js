
// ハンバーガーメニューとトップスライド

jQuery(function ($) { // WordPressでも「$」が使用可能にする
    $(function () {
        // ハンバーガーメニューの開閉
        $('.toggle').on('click', function () {
            $(this).toggleClass('open'); // ハンバーガーアイコンのアニメーション切り替え
            $('.header__inner').toggleClass('menu-open');

            // .sp-navのアニメーション制御
            if ($('.sp-nav').is(':visible')) {
                $('.sp-nav').fadeOut(400); // フェードアウト（400ms）
                $('html').removeClass('scroll-prevent'); // 背景スクロールを有効化
                
            } else {
                $('.sp-nav').fadeIn(400); // フェードイン（400ms）
                $('html').addClass('scroll-prevent'); // 背景スクロールを無効化
            }
        });
        

        // スワイパー設定
        var swiper = new Swiper(".js-topSwiper", {
            loop: true, // スライダーをループさせる
            effect: "fade", // フェード切り替えを有効にする
            fadeEffect: {
                crossFade: true, // フェード中にスライドを重ねる
            },
            autoplay: { // 自動再生設定
                delay: 5000, // 5秒ごとにスライド
                disableOnInteraction: false, // ユーザーが操作しても自動再生を続ける
            },
            speed: 1000, // フェードの速度（ミリ秒）
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

//campaign-swiper
var campaign__swiper = new Swiper(".js-campaign-swiper", {
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
    },
    on: {
      init: adjustCardHeights, // 初期化時に高さを揃える
      resize: adjustCardHeights, // ウィンドウリサイズ時に再計算
    },
});

var campaign__swiper = new Swiper(".campaign-swiper2", {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    spaceBetween: 26,
    autoplay: {
    delay: 2000,
    disableOnInteraction: false
    },
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

// campaign-swiper高さそろえ
function adjustCardHeights() {
    const slides = document.querySelectorAll(".campaign-swiper__item .campaign-card");

    // 1. 高さリセット
    slides.forEach((card) => {
      card.style.height = "auto"; // 高さを一度リセット
    });

    // 2. 最大高さを取得
    const maxHeight = Math.max(...Array.from(slides).map((card) => card.offsetHeight));

    // 3. 最大高さを全てのカードに適用
    slides.forEach((card) => {
    card.style.height = `${maxHeight}px`;
    });
}

  // ウィンドウリサイズ時の高さ調整（Swiper外でも対応可能にするため）
window.addEventListener("resize", adjustCardHeights);



// voiceタブ切り替え
// document.addEventListener('DOMContentLoaded', () => {
//     // タブボタンを全て取得
//     const tabs = document.querySelectorAll('.voice-btn button');
  
//     // タブコンテンツを全て取得
//     const contents = document.querySelectorAll('.voice-cards .content');
  
//     // 各タブボタンにクリックイベントを設定
//     tabs.forEach((tab, index) => {
//       tab.addEventListener('click', () => {
//         // 全てのタブからactiveクラスを削除
//         tabs.forEach(tab => tab.classList.remove('active'));
  
//         // 全てのコンテンツからactiveクラスを削除
//         contents.forEach(content => content.classList.remove('active'));
  
//         // クリックされたタブとそれに対応するコンテンツにactiveクラスを付与
//         tab.classList.add('active');
//         contents[index].classList.add('active');
//       });
//     });
//   });

// タブの見出し（tab-item）を取得
document.addEventListener("DOMContentLoaded", () => {
    const tabItems = document.querySelectorAll(".tab-list__item");
    const tabPanels = document.querySelectorAll(".voice-page__tab-panel");
  
    tabItems.forEach((tabItem) => {
      tabItem.addEventListener("click", () => {
        // タブ非アクティブ化
        tabItems.forEach((t) => t.classList.remove("active"));
  
        // パネル非表示
        tabPanels.forEach((panel) => panel.classList.remove("active"));
  
        // アクティブ化
        tabItem.classList.add("active");
  
        const tabIndex = Array.from(tabItems).indexOf(tabItem);
        tabPanels[tabIndex].classList.add("active");
      });
    });
  });
  

  // タブの見出し（tab-item）を取得
const tabItems = document.querySelectorAll(".tab-item");

tabItems.forEach((tabItem) => {
  tabItem.addEventListener("click", () => {
    // すべてのタブを非アクティブにする
    tabItems.forEach((t) => {
      t.classList.remove("active");
    });
    // すべてのコンテンツを非表示にする
    const tabPanels = document.querySelectorAll(".tab-panel");
    tabPanels.forEach((tabPanel) => {
      tabPanel.classList.remove("active");
    });

    // クリックされたタブをアクティブにする
    tabItem.classList.add("active");

    // 対応するコンテンツを表示
    const tabIndex = Array.from(tabItems).indexOf(tabItem);
    tabPanels[tabIndex].classList.add("active");
  });
});


//モーダル
$(".gallery__item .gallery__img").click(function () {
    var src = $(this).attr("src");
    var cap = $(this).attr("alt");
    $(".modal-block").fadeIn().css("display", "flex");

$("#popup").attr("src", src);
$(".caption").text(cap);
});

$(".modal-block").click(function (e) {
// モーダルの外側をクリックした場合にのみモーダルを閉じる
if (e.target === this) {
    $(this).css("display", "none");
}
});

$(".img-section > span").click(function () {
// モーダルを閉じるボタンがクリックされた場合にモーダルを閉じる
$(".modal-block").css("display", "none");
});


//モーダル

$(".gallery__item .gallery__img").click(function () {
    var src = $(this).attr("src");
    var cap = $(this).attr("alt"); // キャプションとしてaltを利用

    $(".modal-block").fadeIn().css("display", "flex");

    // 画像とaltをモーダルに設定
    $("#popup").attr("src", src).attr("alt", cap); // ← altを必ずセット！

    $(".caption").text(cap);
});