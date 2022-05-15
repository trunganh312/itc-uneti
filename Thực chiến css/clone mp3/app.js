        const $ = document.querySelector.bind(document);
        const $$ = document.querySelectorAll.bind(document);
        const dashboard = $('.dashboard');
        const cd = $('.cd');
        const playlist = $('.playlist');
        const heading = $('header h2');
        const cdThumb = $('.cd-thumb');
        const audio = $('#audio')
        const player = $('.player');
        const btnToggle = $('.btn-toggle-play');
        const progress = $('#progress');
        const btnNext = $('.btn-next');
        const btnPrev = $('.btn-prev');
        const btnRandom = $('.btn-random');
        const volumeUp = $('.volume');
        const btnRepeat = $('.btn-repeat');
        const PLAYER_STORAGE_KEY = 'Trung_Anh'
        const app = {
          currentIndex: 0,
          isPlaying: false,
          isRandom: false,
          isRepeat: false,
          config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
          setConfig: function (key, value) {
              this.config[key] = value;
              localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
          },
          songs: [
            {
              name: 'Corona nhớ người yêu',
              singer: 'tlinh',
              path: './music/Corona nhớ ny.mp3',
              image: './img/corona.jpg',
            },
            {
              name: 'Em là châu báu',
              singer: 'tlinh, MCK',
              path: './music/Em là châu báu.mp3',
              image: './img/img2.jpg',
            },
            {
              name: 'Em vẫn muốn chơi',
              singer: 'Limitlxss feat. Tlinh',
              path: './music/em vẫn muốn chơi.mp3',
              image: './img/img4.jpg',
            },
            {
              name: 'Gái độc thân',
              singer: 'tlinh ft. 2pillz & LastFire Crew',
              path: './music/Gái Độc Thân.mp3',
              image: './img/img3.jpg',
            },
            {
              name: 'Mặc sự đời',
              singer: 'tlinh',
              path: './music/mặc sự đời.mp3',
              image: './img/img5.jpg',
            },
            {
              name: 'Tèn Ten Girls!',
              singer: 'tlinh, Suboi',
              path: './music/Suboi, TLinh -  Tèn Tèn Girls!.mp3',
              image: './img/img6.jpg',
            },
            {
              name: 'Tay To',
              singer: 'RPT MCK x RPT PhongKhin',
              path: './music/Tay To.mp3',
              image: './img/img7.jpg',
            },
            {
              name: 'Tình yêu bận bịu',
              singer: 'tlinh feat. Trung Trần',
              path: './music/Tình yêu bận bịu.mp3',
              image: './img/img8.jpg',
            },
            {
              name: 'Thích quá rùi nà ',
              singer: 'tlinh',
              path: './music/Thích Quá Rùi Nà .mp3',
              image: './img/img9.jpg',
            },
            {
              name: 'Va vào giai điệu',
              singer: 'MCK',
              path: './music/Va vào giai điệu.mp3',
              image: './img/img10.jpg',
            },
            {
              name: 'Vứt zác',
              singer: 'tlinh ft.LowG',
              path: './music/Vứt zác.mp3',
              image: './img/img11.jpg',
            },
            {
              name: 'Xích thêm chút',
              singer: 'RPT Groovie ft TLinh x RPT MCK',
              path: './music/Xích Thêm Chút.mp3',
              image: './img/img12.jpg',
            },

          ],
        
        
        render: function () {
           var indexNew = this.currentIndex
          const htmls = this.songs.map(function (song, index) {
            return `<div class="song ${index === indexNew ? 'active' : ''} " data-index = ${index}>
            <div class="thumb" style="background-image: url(${song.image})">
            </div>
            <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
            </div>
            <div class="option">
            <i class="fas fa-ellipsis-h"></i>
            </div>
            </div>`
            
          })

          
          playlist.innerHTML = htmls.join('');
          
        },
            
            defineProperties: function () {
              Object.defineProperty(this, 'currentSong', {
                get: function () {
                  return this.songs[this.currentIndex]
                }
              })
            },
            handlerEvent: function () {
              const cdWidth = cd.offsetWidth
              const _this = this;
              // CD quay
              var cdThumbAnimate = cdThumb.animate([
                {transform: 'rotate(360deg)'}
              ],{
                duration: 10000,
                iterations: Infinity
              })
              
              cdThumbAnimate.pause();
              
              
              


            // Phóng to/ thu nhỏ ảnh
            document.onscroll = function (e) {
              const scroll = window.scrollY || document.documentElement.scrollTop;
              const newCdWidth = cdWidth - scroll;
              
              cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
              cd.style.opacity = newCdWidth / cdWidth;
              },
            
            // Khi clcik play
              btnToggle.onclick = function () {
                if(_this.isPlaying) {
                  audio.pause();
                } else  {
                  audio.play();
                }
              }
            
              // Khi play
              audio.onplay = function() {
                _this.isPlaying = true;
                player.classList.add('playing')
                cdThumbAnimate.play()
              }

              // Khi pause
              audio.onpause = function() {
                _this.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause();
              }

              // Khi tiến độ bài hát thay đổi
              audio.ontimeupdate = function(e) {
                const progressPercent = (audio.currentTime / audio.duration * 100)
                progress.value = progressPercent; 
                // if(progressPercent == 100){
                //   _this.nextSong()
                //   audio.play()
                // }
              }


              window.onload = function() {
                progress.value = 0;
              }
              // Khi tua
              progress.onchange = function() {
                const seekTime = (audio.duration  /  100 * progress.value  )
                audio.currentTime = seekTime;
              }

              // Khi chuyển bài hát
              btnNext.onclick = function(e) {
                if(_this.isRandom) {
                  _this.random();
                } else {
                  _this.nextSong();
                }
                
                audio.play();
                _this.render();
                _this.scrollToActive();
              }

              btnPrev.onclick = function(e) {
                if(_this.isRandom) {
                  _this.random();
                } else {
                  _this.prevSong();
                }
                audio.play();
                _this.render();
                _this.scrollToActive();
              }
            
              // Random bài hát

              btnRandom.onclick = function(e) {
                _this.isRandom = !_this.isRandom;
                _this.setConfig('isRandom', _this.isRandom);
                btnRandom.classList.toggle('active', _this.isRandom);
                console.log(_this.isRandom)
              }

              // Khi tăng âm lượng
              volumeUp.onchange = function() {
                audio.volume = volumeUp.value / 100;
                console.log(audio.volume);
              }

              window.onkeydown = function (e) {
                if(e.which == 39) {
                  _this.nextSong();
                  audio.play();
                  _this.render();
                } else if(e.which == 37) {
                  _this.prevSong();
                  audio.play();
                  _this.render();
                }
              }


              // Khi end bài hát tự chuyển bài hát tự chuyển bài
               audio.onended = function() {
                 if(_this.isRepeat) {
                   audio.play();
                 }else {
                   btnNext.click();
                 }

               }


               // Khi hết bài lại chạy Lại
               btnRepeat.onclick = function() {
                 _this.isRepeat = !_this.isRepeat;
                _this.setConfig('isRepeat', _this.isRepeat);
                 btnRepeat.classList.toggle("active", _this.isRepeat); 
                 
               }


               // Khi click vào playlist 
               playlist.onclick = function(e) {
                 const songNode = e.target.closest('.song:not(.active)')
                 if(songNode || e.target.closest('.option')) {
                   if(songNode && !e.target.closest('.option')) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    audio.play()
                    _this.render()
                   }

                   if(e.target.closest('.option')) {
                      console.log('option')
                   }
                 }
               }

              
          },
          loadCurrentSong: function () {
            heading.textContent = this.currentSong.name;
            cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
            audio.src = this.currentSong.path;
          },
          loadConfig: function () {
            this.isRandom = this.config.isRandom
            this.isRepeat = this.config.isRepeat
          },
          nextSong: function () {
            this.currentIndex++
            if(this.currentIndex >= this.songs.length) {
              this.currentIndex = 0;
            }
            this.loadCurrentSong();
          },
          prevSong: function () {
            this.currentIndex--
            if(this.currentIndex < 0) {
              this.currentIndex = this.songs.length - 1;
            }
            this.loadCurrentSong();
          },
          random: function () {
            let newIndex;
            do{
                newIndex = Math.floor(Math.random() * this.songs.length)
            } while(newIndex === this.currentIndex)
            this.currentIndex = newIndex;
            this.loadCurrentSong();
            
          },
          scrollToActive: function () {
            setTimeout(function () {
              $('.song.active').scrollIntoView({
                behavior: "smooth", 
                block: "nearest",
              })
            },200)
          },

          start: function() {
            // Gán cấu hình từ config vào ứng dụng
            this.loadConfig()
            // Định nghĩa các thuộc tính cho object
            this.defineProperties();

            // In ra màn hình Playlist
            this.render();

            // Lắng nghe sự kiện DOM 
            this.handlerEvent();

            // Load bài hát đầu tiên vào màn hình
            this.loadCurrentSong();

            // Hiển thị trạng thái ban đầu của button repeat & button random 
            btnRandom.classList.toggle('active', this.isRandom);
            btnRepeat.classList.toggle('active', this.isRepeat);

          }

        }

        app.start()

        