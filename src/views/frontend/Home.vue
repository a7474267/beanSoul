<template>
  <div>
    <div
      class="jumbotron jumbotron-fluid bg-style d-flex justify-content-center align-items-center"
      style="background-image:url(img/handy-wicaksono-nSDME0pIuOk-unsplash.jpg);height:500px"
    >
      <div class="container">
        <div class="row justify-content-end">
          <div class="col-md-5 d-md-block bg-shadow py-3 rounded">
            <div class="d-flex flex-column align-items-center align-items-md-end">
              <h3 class="text-light mt-3 mt-md-0 mt-lg-3 font-size-l">您專心喝咖啡！</h3>
              <h2 class="text-light font-weight-bold pt-2 font-size-xl">
                挑豆子的事，就交給我們!
                <br />
              </h2>
              <router-link class="btn btn-outline-light mt-4
              animate__animated animate__bounce animate__infinite"
              to="/products">好豆市集</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-4">
      <div class="row">
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
          <h2 class="text-dark text-center font-weight-bold d-md-none d-lg-block mt-3
          mt-md-0 animate__animated animate__bounce animate__infinite">
            關於我們
            <br />
            <span>Bean Soul</span>
          </h2>
          <p></p>
          <h4 class="text-dark text-center font-weight-bold
          d-none d-md-block d-lg-none">
            關於我們
            <br />
            <span>Bean Soul</span>
          </h4>
          <p class="font-weight-bold" data-aos="fade-left"
          data-aos-duration="2000">
            我們認為精品咖啡可以專業、但應該不要艱澀
            <br />我們認為精品咖啡可以高級、但應該少些高冷
          </p>
          <p class="font-weight-bold" data-aos="flip-right"
          data-aos-duration="2000"
          data-aos-delay="2000">
            在精品咖啡普及化的浪潮中，
            <br />Bean Soul希望帶著的「新手友善」思維，
            <br />成為大家認識精品咖啡的最佳領航員 (握拳)
          </p>
          <p class="font-weight-bold" data-aos="flip-up"
          data-aos-duration="2000">
            我們堅持 24 小時烘焙後出貨的「新鮮」，
            <br />而在圖案上，同樣以咖啡豆為核心，
            <br />但改用簡單而有力的線條，
            <br />描繪出我們對咖啡豆的純粹堅持。
          </p>
          <router-link class="btn btn-primary mt-3" to="/about">了解更多</router-link>
        </div>
        <div class="col-md-3 d-none d-md-block pr-0" data-aos="fade-down"
        data-aos-duration="2000">
          <img src="img/john-forson-WWzDPKot6nQ-unsplash.jpg" alt class="object-fit height-about" />
        </div>
        <div class="col-md-4 d-none d-md-block" data-aos="fade-up"
        data-aos-duration="2000">
          <img src="img/mike-marquez-2anddAkcE24-unsplash.jpg" alt
          class="object-fit height-about" />
        </div>
      </div>
    </div>
    <div class="container mt-4">
      <div class="form-row">
        <div class="col-md-8">
          <div
            class="bg-style d-none d-md-block h-100"
            data-aos="fade-left"
            data-aos-duration="2000"
            style="background-image:url(img/gregory-hayes-Jmc0PORTQ-A-unsplash.jpg)"
          ></div>
          <div
            class="bg-style d-md-none bg-height-s" data-aos="fade-left"
            data-aos-duration="2000" data-aos-delay="2000"
            style="background-image:url(img/gregory-hayes-Jmc0PORTQ-A-unsplash.jpg)"
          ></div>
        </div>
        <div class="col-md-4">
          <div class="bg-gray h-100 d-flex flex-column justify-content-center">
            <h3 class="font-weight-bold text-dark text-center pt-3 px-3
            font-size-m-plus">優秀的烘豆師及團隊</h3>
            <p class="text-dark px-3">優秀的烘豆師，擁有藝術家的品味及美感，且兼具敏銳的感受力，這個特質將會深深影響整份熟豆最後呈現的風味。</p>
            <p class="text-dark px-3">我們的烘豆師具備豐富的實務經驗，更重視顧客的需求，而我們的理想，就是以優異的技巧及品質，來征服顧客的味蕾。</p>
          </div>
        </div>
      </div>
      <div class="form-row mt-2">
        <div class="col-md-4">
          <div
            class="bg-style d-none d-md-block h-100"
            data-aos="fade-left"
            data-aos-duration="2000"
            style="background-image:url(img/anastasiia-chepinska-lcfH0p6emhw-unsplash.jpg)"
          ></div>
          <div
            class="bg-style d-md-none bg-height-s"
            style="background-image:url(img/anastasiia-chepinska-lcfH0p6emhw-unsplash.jpg)"
          ></div>
        </div>
        <div class="col-md-4">
          <div class="bg-success d-flex flex-column justify-content-center">
            <h3 class="font-weight-bold text-light text-center pt-3 px-3">專屬烘豆師</h3>
            <p
              class="text-light px-3"
            >烘豆師在我們團隊裡佔有舉足輕重的地位，花費龐大的心力，只為了烘出適合客人口味的豆子，在與客人不斷討論調整後，最後產出風味滿點的頂級熟豆。</p>
          </div>
        </div>
        <div class="col-md-4 d-none d-md-block">
          <div
            class="bg-style d-none d-md-block h-100"
            data-aos="fade-left"
            data-aos-duration="2000"
            style="background-image:url(img/tim-mossholder-YC6RVdoTtIk-unsplash.jpg)"
          ></div>
          <div
            class="bg-style d-md-none bg-height-s"
            style="background-image:url(img/tim-mossholder-YC6RVdoTtIk-unsplash.jpg)"
          ></div>
        </div>
      </div>
      <div class="form-row mt-2">
        <div class="col-md-4 d-none d-md-block">
          <div class="bg-gray h-100">
            <h3 class="font-weight-bold text-dark text-center
            pt-3 px-3 font-size-m-plus">線上飲食顧問</h3>
            <p
              class="text-dark px-3"
            >為了擁有良好的體態及健康的減脂，我們知道喝咖啡與飲食控制同等重要，若您在享用我們餐食的同時，有任何疑問，歡迎您在上班時間，透過 Email 連絡我們的線上飲食顧問。</p>
            <p
              class="text-dark px-3"
            >我們的顧問將提供您基礎的飲食建議，喝咖啡的基本觀念及餐食購買指南，迅速建立應有的基本概念，協助您在喝咖啡的路上，更快進入狀況，展現成效。</p>
          </div>
        </div>
        <div class="col-md-8">
          <div
            class="bg-style h-100 d-none d-md-block"
            data-aos="fade-right"
            data-aos-duration="2000"
            style="background-image:url(img/brent-gorwin-fltAsDcT2k0-unsplash.jpg)"
          ></div>
          <div
            class="bg-style d-md-none bg-height-s"
            style="background-image:url(img/brent-gorwin-fltAsDcT2k0-unsplash.jpg)"
          ></div>
        </div>
        <div class="col-md-4 d-md-none">
          <div class="bg-gray h-100">
            <h3 class="font-weight-bold text-dark text-center pt-3
            px-3 font-size-m-plus">線上飲食顧問</h3>
            <p
              class="text-dark px-3"
            >為了擁有良好的體態及健康的減脂，我們知道喝咖啡與飲食控制同等重要，若您在享用我們餐食的同時，有任何疑問，歡迎您在上班時間，透過 Email 連絡我們的線上飲食顧問。</p>
            <p
              class="text-dark px-3"
            >我們的顧問將提供您基礎的飲食建議，喝咖啡的基本觀念及餐食購買指南，迅速建立應有的基本概念，協助您在喝咖啡的路上，更快進入狀況，展現成效。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-5">
        <hr>
    </div>
    <div class="container mb-3">
      <div class="row">
        <div class="col">
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Joachim Molesworth.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">南投市 李小姐</h5>
                  <p class="mb-0">
                    <small>有一個對咖啡豆品質與沖煮流程相當重視的老闆!</small>
                  </p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Desmond.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">台中市 劉先生</h5>
                  <p class="mb-0"><small>好喝的手沖 舒服的環境</small></p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Sin Azucar.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">南投市 王小姐</h5>
                  <p class="mb-0"><small>現場也有咖啡與攝影的相關書籍，非常適合一個安靜悠閒的午後。</small></p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Snake Harrison.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">北投 陳大哥</h5>
                  <p class="mb-0"><small>老闆很健談，讓整個下午很愉快！。</small></p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Maggot.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">雲林市 陳小姐</h5>
                  <p class="mb-0"><small>第一口就回味無窮！</small></p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Sam Solo.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">新竹市 李小姐</h5>
                  <p class="mb-0"><small>用心的滋味 聞得到喝得到</small></p>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide>
              <div class="d-flex flex-column align-items-center">
                <img class="bg-style img-fluid rounded-circle"
                src="img/Multiavatar-Orbit Escape.png" alt="">
                <div>
                  <h5 class="mb-0 text-silver font-weight-bold">嘉義市 鄭先生</h5>
                  <p class="mb-0"><small>服務超nice</small></p>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-button-prev bg-style" slot="button-prev">
            </div>
            <div class="swiper-button-next bg-style" slot="button-next">
            </div>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-style {
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}
.bg-shadow {
  background-color: rgba(0, 0, 0, 0.5);
}
.bg-height-s {
  height: 200px;
}
.object-fit {
  width: 100%;
  object-fit: cover;
}
.height-about {
  height: 600px;
}
.swiper-button-prev{
  background-image: url(../../../public/img/arrow-left-solid.svg);
  color: transparent;
}
.swiper-button-next{
  background-image: url(../../../public/img/arrow-right-solid.svg);
  color: transparent;
}
</style>>

<script>
export default {
  data() {
    return {
      swiperOption: {
        breakpoints: {
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    };
  },
};
</script>
