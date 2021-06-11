<template>
  <div class="xiugaione">
     <div class="row" style="padding-left: 10px;">
        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>

        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>

        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>

        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>

        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>

        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>

        <div class="col-xs-4 col-md-2">
          <div id="box">
            <div id="shadow"></div>
            <div id="text">
              <div style="margin-left: 8px;">
              <p>根据您的音乐口味生成</p>
              <p>每日更新</p>
              </div>
            </div>
            <img src="../assets/img/img1.jpg" alt="123">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'xiugai-one',
  
}
</script>


<style scoped>

		img{
				width: 170px;
				height: 170px;
			}
			#shadow{
				width: 170px;
				height: 76.6px;
				background-color: grey;
				position: absolute;
				top: -76.6px;
				transition: 1s;
				opacity: 0.5;
			}
			#text{
				width: 170px;
				padding-bottom: 2px;
				padding-top: 2px;
				color: white;
				font-size: small;
				position: absolute;
				top: -76.6px;
				transition: 1s;
			}
			#box{
				overflow: hidden;
				position: relative;
				width: 170px;
				height: 170px;
			}
			#box:hover #shadow{
				top: 0;
				transition: 1s;
			}
			#box:hover #text{
				top: 0;
				transition: 1s;
			}
      .col-xs-4{
        margin-top: 10px;
      }
</style>
