
// Chuyển động slick slider




var currentIndex = 0;
var isPlaying = false;
var isRandom = false;
var isRepeat = false;
const playBtn = document.querySelector('li .bottom-icon.fa-solid.fa-play');
const pauseBtn = document.querySelector('li .bottom-icon.fa-solid.fa-pause');
const nextBtn = document.querySelector('.fa-forward-step');
const prevBtn = document.querySelector('.fa-backward-step');
const randomBtn = document.querySelector('.fa-shuffle');
const repeatBtn = document.querySelector('.fa-repeat');
const progress = document.querySelector('.progress');
const playlistBtn = document.querySelector('.swiper-list-song');
const swiperImg = document.querySelector('.swiper-img');
const mediaImg = document.querySelector('.media-img > img');
const mediaName = document.querySelector('.media-name');
const mediaSingle = document.querySelector('.media-single');
const audio = document.querySelector('#audio');
audio.volume = 0.5;
const inforSong = [
    {
      name: "Corona nhớ người yêu",
      single: "tlinh",
      path: "./music/Corona nhớ ny.mp3",
      image: "./img/corona.jpg"
    },
    {
      name: "Em là châu báu",
      single: "tlinh, MCK",
      path: "./music/Em Là Châu Báu.mp3",
      image: "./img/img2.jpg"
    },
    {
      name: "Em vẫn muốn chơi",
      single: "tlinh",
      path: "./music/em vẫn muốn chơi.mp3",
      image: "./img/img4.jpg"
    },
    {
      name: "Gái độc thân",
      single: "tlinh",
      path: "./music/Gái Độc Thân.mp3",
      image: "./img/img3.jpg"
    },
    {
      name: "Mặc sự đời",
      single: "tlinh",
      path: "./music/mặc sự đời.mp3",
      image: "./img/img5.jpg"
    },
    {
      name: "Tèn ten girls",
      single: "tlinh, Suboi",
      path: "./music/Suboi, TLinh -  Tèn Tèn Girls!.mp3",
      image: "./img/img6.jpg"
    },
    {
      name: "Tay to",
      single: "MCK",
      path: "./music/Tay To.mp3",
      image: "./img/img7.jpg"
    },
    {
      name: "Thích quá rùi nà",
      single: "tlinh",
      path: "./music/Thích Quá Rùi Nà.mp3",
      image: "./img/img9.jpg"
    },
    {
      name: "Tình yêu bận bịu",
      single: "tlinh",
      path: "./music/Tình yêu bận bịu.mp3",
      image: "./img/img8.jpg"
    },
    {
      name: "Va vào giai điệu này",
      single: "MCK",
      path: "./music/Va vào giai điệu này.mp3",
      image: "./img/img10.jpg"
    },
    {
      name: "Vứt zác",
      single: "tlinh",
      path: "./music/Vứt zác.mp3",
      image: "./img/img11.jpg"
    },
    {
      name: "Xích thêm chút",
      single: "MCK",
      path: "./music/Xích Thêm Chút.mp3",
      image: "./img/img12.jpg"
    }
  ]

// Render ra giao diện
function renderSong() {
    const listSongBlock = document.querySelector('.swiper-list-song')

    var htmls = inforSong.map(function(song, index) {
        
        return `<li class="swiper-item ${index === currentIndex ? 'active' : ''}" data-index = ${index}>
                <div class="img-song">
                    <img src="${song.image}" alt="">
                    <i class="fa-solid fa-play"></i>

                </div>
                <div class="name-song">
                    <h5>${song.name}</h5>
                    <p>${song.single}</p>
                </div>
                <div class="time-song">

                </div>
                <div class="list-item-more">
                    <i class="icon fa-solid fa-microphone"></i>
                    <i class="icon fa-solid fa-heart") ></i>
                    <i class="icon fa-solid fa-ellipsis"></i>
                </div>
            </li>`

        })

        
        
        listSongBlock.innerHTML = htmls.join('')
        
      }


// Load bài hát ra giao diện
function loadCurrentSong() {
    

    swiperImg.src = inforSong[currentIndex].image;
    mediaImg.src = inforSong[currentIndex].image;
    mediaName.innerText = inforSong[currentIndex].name;
    mediaSingle.innerText = inforSong[currentIndex].single;
    audio.src = inforSong[currentIndex].path;

}


// Xử lí sự kiện
function handlerEvent() {
    // sự kiện play/ pause bài nhạc

    playBtn.onclick = function() {
        audio.play();
        
    }

    pauseBtn.onclick = function() {
        audio.pause();
    }

    // Sự kiện song được play
    audio.onplay = function() {
        isPlaying = true;
        cdThumb.play();
        document.querySelector('.bottom-icon.fa-solid.fa-play').classList.add('active')
        document.querySelector('.bottom-icon.fa-solid.fa-pause').classList.remove('active')
    }

    // Sự kiện song được pause
    audio.onpause = function() {
        isPlaying = false;
        cdThumb.pause();
        document.querySelector('.bottom-icon.fa-solid.fa-pause').classList.add('active')
        document.querySelector('.bottom-icon.fa-solid.fa-play').classList.remove('active')
    }

    // sự kiện next bài hát
    nextBtn.onclick = function() {
        if(isRandom) {
            random();
        } else {
            nextSong();
        }
        audio.play();
        renderSong()
    }

    //Sự kiện prev bài hát
    prevBtn.onclick = function() {
        if(isRandom) {
            random();
        } else {
            backSong();
        }
        audio.play();
        renderSong()
    }

    // Khi tiến độ bài hát thay đổi thanh range
       audio.ontimeupdate = function() {
       const timePercent =  audio.currentTime / audio.duration * 100
       progress.value = timePercent;
    }

    // Khi tua bài
    progress.onchange = function() {
        const seekTime = audio.duration / 100 * progress.value;
        audio.currentTime = seekTime;
    }

    // Sự kiện random bài hát
    randomBtn.onclick = function() {
        isRandom = !isRandom;
        randomBtn.classList.toggle('active', isRandom)
    }

    // Sự kiện repeat bài hát
    repeatBtn.onclick = function() {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat)
        
    }

    // Khi hết bài phát lại 
    audio.onended = function() {
        if(isRepeat) {
          audio.play();
        }else {
          nextBtn.click();
        }

      }
    // Click vào bài hát
    playlistBtn.onclick = function(e) {
      const songNode = e.target.closest('.swiper-item:not(.active)')
      // Xử lí click vào song 
        if(songNode  ) {
          currentIndex = Number(songNode.dataset.index);
          loadCurrentSong();
          audio.play();
          renderSong();
        }

      }


      // Sự kiện âm Thanh
      const volumeBtn =  document.querySelector('#control-extend-progress')
      
      volumeBtn.onchange = function() {
        const valueVolum = volumeBtn.value / 100;
        audio.volume = valueVolum;
      }
      
      const openVolume = document.querySelector('.bottom-icon.fa-solid.fa-volume-high')
      const closeVolume = document.querySelector('.bottom-icon.fa-solid.fa-volume-xmark ')
      
      openVolume.onclick = function() {
        closeVolume.classList.remove('active')
        openVolume.classList.add('active')
        audio.volume = 0;
        volumeBtn.value = 0;
      }
      
      closeVolume.onclick = function() {
        openVolume.classList.remove('active')
        closeVolume.classList.add('active')
        audio.volume = 0.5;
        volumeBtn.value = 50;
      }
      
      
      
      // Sự kiện khi bài chạy thì  cd quay
      const cdThumb = swiperImg.animate([
        {
          transform: 'rotate(360deg)'
        }
      ], {
        duration: 10000,
        iterations: Infinity,
      });
      
      cdThumb.pause()
      
      // Click vào cdThumb
      swiperImg.onclick = function() {
        isPlaying = !isPlaying;
        console.log(isPlaying)
        if( isPlaying == true) {
          audio.play();
          cdThumb.play();
        } else  {
        audio.pause();
        cdThumb.pause();
      }
      }
      
      // Sự kiện active vào list
      const listItem = document.querySelectorAll('.nav__list-item')
      listItem.forEach(function(item) {
        item.onclick = function() {
          document.querySelector('.nav__list-item.active').classList.remove('active')
          item.classList.add('active')
          
        }
      })

      // mở slider bên phải
      const sliderRightBlock = document.querySelector('i.bottom-icon.fa-solid.fa-sliders')
      sliderRightBlock.onclick = function() {
        document.querySelector('.slider-right').classList.toggle('open')
      }

      // ẩn slider bên phải
      
      
}




// Hàm xử lí khi next bài
function nextSong() {
    currentIndex++;
    if(currentIndex > inforSong.length - 1) {
        currentIndex = 0;
    }
    loadCurrentSong();
}

// Hàm xử lí khi lùi bài
function backSong() {
    currentIndex--;
    if(currentIndex < 0) {
        currentIndex = inforSong.length - 1
    }
    loadCurrentSong();
}


// Hàm xử lí random bài hát
function random() {
    let newIndex;
    do {
         newIndex = Math.floor(Math.random() * inforSong.length);

    } while (newIndex == currentIndex);
    currentIndex = newIndex;
    loadCurrentSong();
}




// Chạy khi trình duyệt khởi động
function start() {
    renderSong();
    

    // Tải bài hát đầu tiên vào UI
    loadCurrentSong();

    // Xử lí sự kiện
    handlerEvent();	


    // Render history
    


}

start();

function timePlayingSong() {
    const remainingTime = document.querySelector('.remaining')
    const durationTime = document.querySelector('.duration-time')
    const {duration, currentTime} = audio;
    if(!duration) {
        remainingTime.textContent = '00:00'
    } else {
        minutes = Math.floor(duration / 60);
        seconds = Math.floor(duration - minutes * 60);
        if(seconds < 10) {
        remainingTime.textContent = `0${minutes}:0${seconds}`         
        } else {
        remainingTime.textContent = `0${minutes}:${seconds}`  
        }
    }

    
        var min = Math.floor(currentTime / 60)
        var sec = Math.floor(currentTime % 60)
        durationTime.textContent = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec)

    

}

timePlayingSong()
setInterval(timePlayingSong, 500)



// History
var historyList = ['Sơn Tùng M-TP', 'Sai cách yêu'];
function renderHistory() {
  var innerHtml = historyList.map(function(historyItem, i) {
    return `<li class="profile__search-history-items" >
                <i class="fa-solid fa-magnifying-glass size-s "></i>
                <p class="profile__search-history-content">${historyItem}</p>
                <i class="fa-solid fa-xmark" onclick="removehistory(${i})"></i>
          </li>`
  })

  document.querySelector('.profile__search-history-list').innerHTML = innerHtml.join('\n')



}

function eventInput() {
        // Sự kiện forcus ô input 
        const inputBlock = document.querySelector('.border-radius');
        const historyBlock = document.querySelector('.profile__search-history')
        inputBlock.onfocus = function() {
          inputBlock.classList.add('active-border')
          historyBlock.style.display = 'block'
        }

        inputBlock.onblur = function() {
          inputBlock.classList.remove('active-border')
          historyBlock.style.display = 'none'
        }

        historyBlock.onmousedown = function(e) {
          e.preventDefault();
        }

        // Lấy dữ liệu từ ô input   
        inputBlock.onkeydown = function(e) {
          if(e.which == 13) {
            const inputValue = inputBlock.value;
            if(inputValue != '')
            historyList.unshift(inputValue);
            inputBlock.value = ''
            renderHistory();
            
          }

        }
}

// Xóa phần tử history
function removehistory(index) {
  historyList.splice(index, 1)
  
  renderHistory();
  if(historyList.length == 0) {
    document.querySelector('.profile__search-history-list').style.padding = '0px';
    
  }
}





function run() {

  renderHistory();

  eventInput();


}

run();

window.onload = function() {
  document.querySelector('.progress').value = 0;
}


// Render phần ảnh

const arrImages = [
  {
    imageContent: 'https://photo-resize-zmp3.zadn.vn/w240_r1x1_jpeg/cover/5/c/b/e/5cbeea8c68ba03c81907b2f0637a3e72.jpg',
    textH4: 'Nhẹ Nhàng Cùng V-Pop',
    textContentP: 'Thả mình cùng những giai điệu V-Pop nhẹ nhàng',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
  },
  {
    imageContent: 'https://media.thieunien.vn/upload/traht/2022/01/24/loa-mat-voi-do-chiu-choi-cua-hoang-thuy-linh-trong-mv-gieo-que-1643010103-2.jpg',
    textH4: 'Nhạc trẻ gây nghiện',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textContentP: 'Giai điệu nghe một lần là không thể quen V-Pop',
  },
  {
    imageContent: 'https://source.unsplash.com/random',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textH4: 'Sing Along V-Pop',
    textContentP: 'Luôn là lựa chọn hàng đầu trong các buổi Karaoke...'
  },
  {
    imageContent: 'https://m.media-amazon.com/images/I/71JyAa6pguL._SY450_.jpg',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textH4: 'Synth Pop',
    textContentP: 'Cảm hứng từ quá khứ tạo lên âm nhạc của tương lai'
  },
  {
    imageContent: 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2019/11/29/769102/Ap.jpg',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textH4: 'K-Pop Deabak',
    textContentP: 'Căng đét cùng K-Pop đến từ Red Velvet, TaeYeon...'
  },
  {
    imageContent: 'https://billboardvn.vn/wp-content/uploads/2019/02/NHOMNHACVPOP-OP2.jpg',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textH4: 'V-Pop Band',
    textContentP: 'Tất tần tật những nhóm nhạc V-Pop nổi bật'
  },
  {
    imageContent: 'https://file.tinnhac.com/resize/600x-/music/2016/12/28/136501478771758492-8b11.jpg',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textH4: 'Internet Rewwind',
    textContentP: 'US-UK thời thiếu niên'
  },
  {
    imageContent: 'https://photo-xone.zadn.vn/xone/image/2022010422563d0e5d918c2b3d9efc8973ab66609e26.jpg',
    srcRadio: 'https://i.picsum.photos/id/870/200/300.jpg?hmac=JX9iOiKD1A168ozbMTARKt6OKYtgsGx9GaBC8tX7oBg',
    textH4: 'Thích XONE Hơi Nhiều',
    textContentP: 'Top V-Pop nóng bỏng XONE dành riêng cho bạn', 
  },
];





function renderListImage() {
  var imageHtml = arrImages.map(function (itemImage) {
    return `<div class="today-item">
          <div class="today-img">
              <img src="${itemImage.imageContent}" alt="">
              
              <div class="today-icon">
                  <i class=" fa-solid fa-heart "></i>
                  <i class="fa-solid fa-play"></i>
                  <i class=" fa-solid fa-ellipsis"></i>
              </div>
          </div>
          <div class="today-text">
              <h4>${itemImage.textH4}</h4>
              <p>${itemImage.textContentP}</p>
          </div>
      </div>`

    })
    document.querySelector('.today-container').innerHTML = imageHtml.join('')
}

renderListImage();



function renderRadio() {
  var radioHtml = arrImages.map(function (itemImage) {
    return `<div class="radio-item">
        <div class="radio-img">
            <img src="${itemImage.imageContent}" alt="">

        </div>
        <span>LIVE</span>
        <img src="${itemImage.srcRadio}" alt="">
        
    </div>`
  })

  document.querySelector('.radio-list').innerHTML = radioHtml.join('')
}

renderRadio();

/*

*/

function renderSliderSong() {
  var sliderSongHtml = inforSong.map(function (item, i) {
    // const sliderRight = 
    return `<div class="slider__content-item" >
          <div class="slider__content-img">
              <img src="${item.image}" alt="">
          </div>
          <div class="slider__content-text">
              <h4>${item.name}</h4>
              <p>${item.single}</p>
          </div>
          <div class="slider__content-icon">
              <i class="fa-solid fa-ellipsis"></i>
          </div>
      </div>`

  })


  document.querySelector('.slider__content').innerHTML  = sliderSongHtml.join('')
  
}
renderSliderSong();

document.querySelectorAll('.slider__header-p p').forEach(function(item, index) {
  const tabSlider = document.querySelectorAll('.slider__content')[index]
  item.onclick = function() {
    document.querySelector('.slider__active').classList.remove('slider__active')
    document.querySelector('.slider__content.active').classList.remove('active')
    item.classList.add('slider__active')
    tabSlider.classList.add('active')
  }
})

document.querySelector('.slider-right').onmousemove= function(e) {
  document.querySelector('.slider-right').classList.add('active')
}

document.querySelector('.slider-right').onmouseout= function(e) {
  document.querySelector('.slider-right').classList.remove('active')
}
