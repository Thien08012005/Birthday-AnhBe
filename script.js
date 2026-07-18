/*=========================================================
        HAPPY BIRTHDAY CINEMATIC
        PART 1
=========================================================*/

"use strict";
// =========================
// DEVICE CHECK
// =========================

function checkMobile() {
  if (window.innerWidth < 768) {
    document.body.classList.add("mobile");
  } else {
    document.body.classList.remove("mobile");
  }
}

checkMobile();

window.addEventListener("resize", checkMobile);

/*=========================================================
                    ELEMENTS
=========================================================*/

const scenes = document.querySelectorAll(".scene");
const replayBtn = document.getElementById("btn-replay");

const loader = document.getElementById("loader");

const music = document.getElementById("music-bg");

const btnStart = document.getElementById("btn-start");
const btnReplay = document.getElementById("btn-replay");
let currentScene = 0;

let musicStarted = false;

/*=========================================================
                SHOW SCENE
=========================================================*/

function showScene(index) {
  console.log("Show scene:", index);

  scenes.forEach((scene) => {
    scene.classList.remove("active");

    gsap.set(scene, {
      opacity: 0,
      visibility: "hidden",
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
    });
  });

  if (scenes[index]) {
    scenes[index].classList.add("active");

    gsap.set(scenes[index], {
      opacity: 1,
      visibility: "visible",
      scale: 1,
      x: 0,
      y: 0,
      rotation: 0,
    });
  }

  currentScene = index;
}
/*=========================================================
            GO TO NEXT SCENE
=========================================================*/

function nextScene() {
  if (currentScene >= scenes.length - 1) return;

  const oldScene = scenes[currentScene];
  const nextIndex = currentScene + 1;

  gsap.to(oldScene, {
    opacity: 0,
    duration: 0.8,
    ease: "power2.out",

    onComplete: () => {
      // Ẩn scene cũ
      oldScene.classList.remove("active");

      // Hiện scene mới
      showScene(nextIndex);

      console.log("Chuyển sang scene:", currentScene);

      // Đóng popup nếu còn mở
      const popup = document.getElementById("memory-popup");
      if (popup) {
        popup.style.display = "none";
      }

      // =========================
      // SCENE 3 - ẢNH
      // =========================
      if (currentScene === 2) {
        const photos = scenes[currentScene].querySelectorAll(".photo-card");

        if (window.innerWidth < 768) {
          gsap.set(photos, {
            opacity: 1,
            scale: 1,
            y: 0,
          });
        } else {
          gsap.fromTo(
            photos,
            {
              opacity: 0,
              y: 80,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.15,
              duration: 0.8,
              ease: "back.out(1.7)",
            },
          );
        }
      }

      // =========================
      // SCENE 4 - CHỮ
      // =========================
      if (currentScene === 3) {
        const title = scenes[currentScene].querySelector(".h1-main");
        const sub = scenes[currentScene].querySelector(".h2-sub");
        const desc = scenes[currentScene].querySelector(".p-desc");

        console.log("SCENE 4:", title, sub, desc);

        if (title) {
          gsap.fromTo(
            title,
            {
              opacity: 0,
              scale: 0.5,
            },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "back.out(1.7)",
            },
          );
        }

        if (sub) {
          gsap.fromTo(
            sub,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.3,
            },
          );
        }

        if (desc) {
          gsap.fromTo(
            desc,
            {
              opacity: 0,
              y: 30,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 0.6,
            },
          );
        }
      }
    },
  });
}
/*=========================================================
            START BUTTON
=========================================================*/

/*=========================================================
                MUSIC
=========================================================*/

function startMusic() {
  if (musicStarted) return;

  music.volume = 0.35;
  music.play().catch(() => {});

  musicStarted = true;
}

/*=========================================================
                LOADER
=========================================================*/

/*=========================================================
                START BUTTON
=========================================================*/

btnStart?.addEventListener("click", () => {
  startMusic();

  nextScene();
});

/*=========================================================
                REPLAY
=========================================================*/

btnReplay?.addEventListener("click", () => {
  currentScene = 0;

  scenes.forEach((scene) => {
    scene.classList.remove("active");

    scene.style.opacity = "";
  });

  scenes[0].classList.add("active");

  if (music) {
    music.currentTime = 0;

    music.play();
  }

  window.scrollTo({
    top: 0,

    behavior: "smooth",
  });
});

/*=========================================================
                STARS
=========================================================*/

function createStars() {
  const layer = document.getElementById("background-layers");

  let count = window.innerWidth < 768 ? 70 : 180;

  for (let i = 0; i < count; i++) {
    const star = document.createElement("span");

    star.className = "star";

    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";

    star.style.animationDelay = Math.random() * 5 + "s";

    layer.appendChild(star);
  }
}

createStars();

/*=========================================================
                METEOR
=========================================================*/

function createMeteor() {
  const meteor = document.createElement("div");

  meteor.className = "meteor";

  meteor.style.top = Math.random() * 30 + "%";

  meteor.style.left = "-200px";

  meteor.style.animationDuration = 2 + Math.random() * 2 + "s";

  document.body.appendChild(meteor);

  setTimeout(() => {
    meteor.remove();
  }, 4000);
}

setInterval(createMeteor, window.innerWidth < 768 ? 9000 : 4500);

/*=========================================================
                PARALLAX
=========================================================*/

if (window.innerWidth > 768) {
  document.addEventListener("mousemove", (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    gsap.to("#background-layers", {
      x: (x - 0.5) * 30,
      y: (y - 0.5) * 20,
      duration: 1,
    });
  });
}

/*=========================================================
                HEART CURSOR
=========================================================*/

document.addEventListener("click", (e) => {
  const heart = document.createElement("div");

  heart.innerHTML = "❤️";

  heart.className = "click-heart";

  heart.style.left = e.clientX + "px";

  heart.style.top = e.clientY + "px";

  document.body.appendChild(heart);

  gsap.fromTo(
    heart,

    {
      scale: 0,

      opacity: 1,
    },

    {
      scale: 2,

      y: -80,

      opacity: 0,

      duration: 1.2,

      onComplete: () => heart.remove(),
    },
  );
});
/*=========================================================
            PART 2
            SCENE 2 - LETTER
=========================================================*/

const envelope = document.getElementById("envelope-img");
const envelopeLid = document.querySelector(".envelope-lid");

const letterPaper = document.getElementById("letter-paper");

const letterWrapper = document.querySelector(".letter-wrapper");

const btnNextScene = document.getElementById("btn-next-scene");

const hintText = document.querySelector(".hint-text");

let letterOpened = false;

/*=========================================================
            ENVELOPE SHAKE
=========================================================*/

gsap.to(envelope, {
  rotation: 2,

  duration: 0.15,

  repeat: -1,

  yoyo: true,

  ease: "power1.inOut",
});

/*=========================================================
            OPEN LETTER
=========================================================*/

envelope.addEventListener("click", () => {
  if (letterOpened) return;

  letterOpened = true;

  hintText.style.display = "none";

  gsap.killTweensOf(envelope);

  gsap.to(envelope, {
    scale: 0.96,

    duration: 0.2,
  });

  envelopeLid.classList.add("open");

  setTimeout(() => {
    letterPaper.classList.add("show");
  }, 600);

  gsap.to(letterWrapper, {
    scale: 1.08,

    duration: 1.4,

    ease: "power2.out",
  });

  showLetterParagraphs();
});

/*=========================================================
        PARAGRAPH FADE
=========================================================*/

function showLetterParagraphs() {
  const paragraphs = letterPaper.querySelectorAll("p,h2,span,.birthday-info");

  paragraphs.forEach((el) => {
    el.style.opacity = 0;

    el.style.transform = "translateY(30px)";
  });

  paragraphs.forEach((el, index) => {
    gsap.to(el, {
      opacity: 1,

      y: 0,

      duration: 0.8,

      delay: index * 0.25,

      ease: "power2.out",
    });
  });
}

/*=========================================================
        SCROLL TO READ
=========================================================*/

letterPaper.addEventListener("mouseenter", () => {
  gsap.to(letterPaper, {
    boxShadow: "0 0 70px rgba(255,255,255,.25)",

    duration: 0.5,
  });
});

letterPaper.addEventListener("mouseleave", () => {
  gsap.to(letterPaper, {
    boxShadow: "0 0 25px rgba(255,255,255,.12)",

    duration: 0.5,
  });
});

/*=========================================================
        LETTER PARTICLES
=========================================================*/

function createLetterSparkle() {
  for (let i = 0; i < 25; i++) {
    const s = document.createElement("div");

    s.className = "letter-spark";

    s.style.left = Math.random() * window.innerWidth + "px";

    s.style.top = Math.random() * window.innerHeight + "px";

    document.body.appendChild(s);

    gsap.fromTo(
      s,

      {
        opacity: 0,

        scale: 0,
      },

      {
        opacity: 1,

        scale: 1,

        duration: 0.6,

        y: -80,

        repeat: 1,

        yoyo: true,

        onComplete() {
          s.remove();
        },
      },
    );
  }
}

/*=========================================================
        HEART BURST
=========================================================*/

function burstHearts() {
  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");

    heart.className = "click-heart";

    heart.innerHTML = "❤️";

    heart.style.left =
      window.innerWidth / 2 + (Math.random() - 0.5) * 220 + "px";

    heart.style.top =
      window.innerHeight / 2 + (Math.random() - 0.5) * 120 + "px";

    document.body.appendChild(heart);

    gsap.to(heart, {
      x: (Math.random() - 0.5) * 400,

      y: (Math.random() - 0.5) * 400,

      scale: 1.6,

      opacity: 0,

      duration: 1.5,

      onComplete() {
        heart.remove();
      },
    });
  }
}

/*=========================================================
        AFTER OPEN
=========================================================*/

envelope.addEventListener("click", () => {
  setTimeout(() => {
    burstHearts();

    createLetterSparkle();
  }, 700);
});

/*=========================================================
        NEXT SCENE
=========================================================*/

if (btnNextScene) {
  btnNextScene.onclick = () => {
    console.log("Đã bấm nút tiếp tục");

    gsap.to(letterPaper, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in",
    });

    setTimeout(() => {
      console.log("Chuyển sang scene:", currentScene + 1);

      nextScene();
    }, 800);
  };
}

const photos = document.querySelectorAll(".polaroid-photo");
const gallery = document.querySelector(".gallery-container");

function showPhotos() {
  photos.forEach((photo, index) => {
    setTimeout(() => {
      photo.classList.remove("hidden");
      photo.classList.add("show");
    }, index * 700);
  });
}

/*=========================================================
                PHOTO CLICK
=========================================================*/

photos.forEach((photo) => {
  photo.addEventListener("click", () => {
    gsap.to(photo, {
      scale: 1.12,
      rotation: gsap.utils.random(-5, 5),
      duration: 0.35,
      yoyo: true,
      repeat: 1,
    });

    confetti({
      particleCount: 40,
      spread: 70,
      origin: {
        x: Math.random(),
        y: Math.random() * 0.6,
      },
    });
  });
});

/*=========================================================
                HEART CENTER
=========================================================*/

const centerHeart = document.querySelector(".memory-center-point");

if (centerHeart) {
  gsap.to(centerHeart, {
    scale: 1.3,
    duration: 1,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });
}

/*=========================================================
        AUTO NEXT AFTER ALL PHOTOS
=========================================================*/

let clicked = 0;

photos.forEach((photo) => {
  photo.addEventListener("click", () => {
    if (photo.dataset.clicked) return;

    photo.dataset.clicked = true;

    clicked++;

    if (clicked === photos.length) {
      setTimeout(() => {
        nextScene();
      }, 1800);
    }
  });
});

/*=========================================================
                SCENE OBSERVER
=========================================================*/

const observerScene = new MutationObserver(() => {
  if (currentScene === 2) {
    showPhotos();
  }
});

observerScene.observe(document.body, {
  childList: true,
  subtree: true,
});

/*=========================================================
                PARTICLE SCENE
=========================================================*/

const particleTarget = document.getElementById("particle-target-name");
const particleBtn = document.getElementById("btn-trigger-particle");

if (particleTarget) {
  gsap.from(".h1-main", {
    opacity: 0,
    y: -80,
    duration: 1.4,
  });

  gsap.from(".h2-sub", {
    opacity: 0,
    scale: 0.5,
    delay: 0.8,
    duration: 1.2,
  });

  gsap.from(".p-desc", {
    opacity: 0,
    y: 50,
    delay: 1.5,
    duration: 1,
  });
}

/*=========================================================
        SHOW BUTTON
=========================================================*/

setTimeout(() => {
  if (particleBtn) {
    particleBtn.classList.remove("hidden");

    gsap.fromTo(
      particleBtn,
      {
        scale: 0.6,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
      },
    );
  }
}, 3500);

/*=========================================================
        BUTTON NEXT
=========================================================*/

if (particleBtn) {
  particleBtn.addEventListener("click", () => {
    confetti({
      particleCount: 150,
      spread: 120,
    });

    nextScene();
  });
}

/*=========================================================
        FLOATING LIGHT
=========================================================*/

function floatingSparkle() {
  const star = document.createElement("div");

  star.className = "spark";

  star.style.left = Math.random() * innerWidth + "px";

  star.style.top = innerHeight + "px";

  document.body.appendChild(star);

  gsap.to(star, {
    y: -innerHeight - 300,

    opacity: 0,

    duration: 5,

    ease: "none",

    onComplete() {
      star.remove();
    },
  });
}

setInterval(floatingSparkle, 400);
/*=========================================================
            SCENE 3 → SCENE 4
=========================================================*/

/*=========================================================
                SCENE 3 -> SCENE 4
=========================================================*/

const btnMemoryNext = document.getElementById("btn-memory-next");

if (btnMemoryNext) {
  btnMemoryNext.addEventListener("click", () => {
    nextScene();
  });
}

/*=========================================================
                MEMORY POPUP
=========================================================*/

const memoryPhotos = document.querySelectorAll(".photo-card");

const popup = document.getElementById("memory-popup");
const popupImg = document.getElementById("popup-image");
const popupQuestion = document.getElementById("popup-question");

const closeMemory = document.getElementById("close-memory");
const nextQuestion = document.getElementById("next-question");

const questions = [
  "Điều gì khiến em mỉm cười nhiều nhất khi ở bên anh? ❤️",

  "Nếu được quay lại một khoảnh khắc, anh muốn quay lại lúc nào? 💕",

  " có điều gì làm anh cảm thấy đặc biệt không? 🥰",

  "Kỷ niệm nào khiến anh  nhớ nhất? 🌸",

  "Anh có biết hôm nay anh đẹp trai không? 😆",

  "Nếu được chọn một nơi để đi cùng anh, em sẽ chọn đâu? ✨",

  "Điều em thích nhất ở anh là gì? ❤️",

  "Em có muốn tạo thêm thật nhiều kỷ niệm với anh không? 💕",

  "Anh có hạnh phúc khi xem món quà này không? 🥰",

  "Chúc tuổi mới của anh luôn thật nhiều niềm vui nhé ❤️",
];

function randomQuestion() {
  return questions[Math.floor(Math.random() * questions.length)];
}

memoryPhotos.forEach((photo) => {
  photo.addEventListener("click", () => {
    const img = photo.querySelector("img");

    if (img) {
      popupImg.src = img.src;
    }

    popupQuestion.innerHTML = randomQuestion();

    popup.style.display = "flex";

    gsap.fromTo(
      ".memory-box",
      {
        scale: 0.6,
        opacity: 0,
        y: 80,
      },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
      },
    );
  });
});

function closePopup() {
  gsap.to(".memory-box", {
    scale: 0.7,
    opacity: 0,
    y: 60,
    duration: 0.25,

    onComplete() {
      popup.style.display = "none";
    },
  });
}

closeMemory.onclick = closePopup;

popup.onclick = function (e) {
  if (e.target === popup) {
    closePopup();
  }
};

nextQuestion.onclick = function () {
  gsap.to(popupQuestion, {
    opacity: 0,
    y: -10,
    duration: 0.2,

    onComplete() {
      popupQuestion.innerHTML = randomQuestion();

      gsap.fromTo(
        popupQuestion,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
        },
      );
    },
  });
};
/*=========================================================
        END PART 3
=========================================================*/
/*=========================================================
        SCRIPT.JS - PART 4
        SCENE 5 - BIRTHDAY CAKE
=========================================================*/

const candleBtn = document.getElementById("btn-blow-candle");
const flame = document.querySelector(".flame");
const smoke = document.getElementById("smoke-puff");

/*=========================================================
                CAKE FLOAT
=========================================================*/

gsap.to(".cake-premium", {
  y: -12,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

/*=========================================================
                CANDLE FLAME
=========================================================*/

if (flame) {
  gsap.to(flame, {
    scale: 1.15,
    duration: 0.35,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
  });

  gsap.to(flame, {
    rotation: 6,
    duration: 0.15,
    repeat: -1,
    yoyo: true,
  });
}

/*=========================================================
                BLOW CANDLE
=========================================================*/

if (candleBtn) {
  candleBtn.addEventListener("click", () => {
    candleBtn.disabled = true;

    /*==========================
            TẮT LỬA
    ==========================*/

    if (flame) {
      gsap.to(flame, {
        opacity: 0,
        scale: 0,
        duration: 0.5,
      });
    }

    /*==========================
            KHÓI
    ==========================*/

    if (smoke) {
      smoke.classList.remove("hidden");

      gsap.fromTo(
        smoke,
        {
          opacity: 0,
          scale: 0.3,
          y: 0,
        },
        {
          opacity: 1,
          scale: 1.3,
          y: -80,
          duration: 2,
          ease: "power2.out",
          onComplete() {
            smoke.classList.add("hidden");
          },
        },
      );
    }

    /*==========================
          CONFETTI
    ==========================*/

    confetti({
      particleCount: 220,
      spread: 120,
      origin: {
        y: 0.55,
      },
    });

    /*==========================
        HIỆN LỜI CHÚC
    ==========================*/

    gsap.to("#cake-instruction", {
      duration: 0.5,
      opacity: 0,
      onComplete() {
        document.getElementById("cake-instruction").innerHTML =
          "🎉 Chúc Anh Bé tuổi mới thật nhiều sức khỏe, bình an và hạnh phúc ❤️";

        gsap.to("#cake-instruction", {
          opacity: 1,
          duration: 1,
        });
      },
    });

    /*==========================
        RUNG BÁNH
    ==========================*/

    gsap.fromTo(
      ".cake-premium",
      {
        rotation: -2,
      },
      {
        rotation: 2,
        repeat: 5,
        yoyo: true,
        duration: 0.08,
      },
    );

    /*==========================
        CHUYỂN SCENE
    ==========================*/

    setTimeout(() => {
      nextScene();
    }, 4500);
  });
}

/*=========================================================
        FIREWORK LOOP
=========================================================*/

function cakeFirework() {
  confetti({
    particleCount: 60,
    spread: 80,
    startVelocity: 35,
    origin: {
      x: Math.random(),
      y: Math.random() * 0.5,
    },
  });
}

let fireworkInterval;

const cakeObserver = new MutationObserver(() => {
  if (currentScene === 4) {
    fireworkInterval = setInterval(cakeFirework, 1200);
  } else {
    clearInterval(fireworkInterval);
  }
});

cakeObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

/*=========================================================
        END PART 4
=========================================================*/
/*=========================================================
        SCRIPT.JS - PART 5
        SCENE 6 - FINAL MESSAGE
=========================================================*/

const typingBox = document.getElementById("typing-main-message");
const giftButton = document.getElementById("btn-go-gift");

/*=========================================================
                MESSAGE
=========================================================*/

const finalMessage = `Anh Bé à ❤️

Hôm nay là ngày đặc biệt nhất của anh.

Em chỉ mong anh sẽ luôn mạnh khỏe,
luôn bình an sau mỗi ngày làm nhiệm vụ.

Mong những điều tốt đẹp nhất
sẽ luôn đến với anh.

Cảm ơn anh vì đã xuất hiện
trong thanh xuân của em.

Hy vọng khi xem hết món quà này,
anh sẽ mỉm cười thật nhiều.

🎂 Chúc mừng sinh nhật Anh Bé ❤️`;

/*=========================================================
                TYPE WRITER
=========================================================*/

let typeIndex = 0;
let typingStarted = false;

function typeMessage() {
  if (!typingBox) return;

  if (typeIndex < finalMessage.length) {
    const char = finalMessage.charAt(typeIndex);

    if (char === "\n") {
      typingBox.innerHTML += "<br>";
    } else {
      typingBox.innerHTML += char;
    }

    typeIndex++;

    setTimeout(typeMessage, 45);
  } else {
    setTimeout(() => {
      giftButton.classList.remove("hidden");

      gsap.fromTo(
        giftButton,
        {
          scale: 0.6,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
        },
      );
    }, 500);
  }
}

/*=========================================================
            START WHEN SCENE 6
=========================================================*/

const typingObserver = new MutationObserver(() => {
  if (currentScene === 5 && !typingStarted) {
    typingStarted = true;

    typingBox.innerHTML = "";

    typeIndex = 0;

    typeMessage();
  }
});

typingObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

/*=========================================================
                HEART RAIN
=========================================================*/

function floatingHeart() {
  const heart = document.createElement("div");

  heart.innerHTML = "❤️";

  heart.className = "floating-heart";

  heart.style.left = Math.random() * innerWidth + "px";

  heart.style.fontSize = 18 + Math.random() * 20 + "px";

  document.body.appendChild(heart);

  gsap.fromTo(
    heart,
    {
      y: innerHeight + 100,
      opacity: 0,
    },
    {
      y: -150,
      opacity: 1,
      duration: 6,
      ease: "none",
      onComplete() {
        heart.remove();
      },
    },
  );
}

let heartInterval;

const heartObserver = new MutationObserver(() => {
  if (currentScene === 5) {
    heartInterval = setInterval(floatingHeart, 350);
  } else {
    clearInterval(heartInterval);
  }
});

heartObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

/*=========================================================
                ICON HEART
=========================================================*/

gsap.to(".icon-heart", {
  scale: 1.25,

  duration: 1,

  repeat: -1,

  yoyo: true,

  ease: "power1.inOut",
});

/*=========================================================
                GIFT BUTTON
=========================================================*/

if (giftButton) {
  giftButton.addEventListener("click", () => {
    confetti({
      particleCount: 180,

      spread: 100,

      origin: {
        y: 0.6,
      },
    });

    nextScene();
  });
}

/*=========================================================
                BACKGROUND GLOW
=========================================================*/

gsap.to(".message-card", {
  boxShadow: "0 0 60px rgba(255,105,180,.6)",

  duration: 2,

  repeat: -1,

  yoyo: true,
});

/*=========================================================
                END PART 5
=========================================================*/
/*=========================================================
        SCRIPT.JS - PART 6
        SCENE 7 - GIFT
=========================================================*/

const gift = document.getElementById("gift-img");
const giftLid = document.querySelector(".gift-lid-top");

let giftOpened = false;

/*=========================================================
                GIFT FLOAT
=========================================================*/

gsap.to(".gift-box-3d", {
  y: -15,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

gsap.to(".gift-box-3d", {
  rotation: 2,
  duration: 0.8,
  repeat: -1,
  yoyo: true,
});

/*=========================================================
            LIGHT EFFECT
=========================================================*/

function createLight() {
  const light = document.createElement("div");

  light.className = "gift-light";

  light.style.left = window.innerWidth / 2 + (Math.random() - 0.5) * 250 + "px";

  light.style.top = window.innerHeight / 2 + "px";

  document.body.appendChild(light);

  gsap.fromTo(
    light,
    {
      opacity: 1,
      scale: 0.2,
    },
    {
      y: -400,
      x: (Math.random() - 0.5) * 250,
      scale: 1.4,
      opacity: 0,
      duration: 2,
      ease: "power2.out",
      onComplete() {
        light.remove();
      },
    },
  );
}

/*=========================================================
            HEART BURST
=========================================================*/

function burstGiftHeart() {
  for (let i = 0; i < 50; i++) {
    createHeart(
      window.innerWidth / 2 + (Math.random() - 0.5) * 180,
      window.innerHeight / 2 + (Math.random() - 0.5) * 150,
    );
  }
}

/*=========================================================
            OPEN GIFT
=========================================================*/

if (gift) {
  gift.addEventListener("click", () => {
    if (giftOpened) return;

    giftOpened = true;

    /*-------------------------
            NẮP HỘP BAY
    --------------------------*/

    if (giftLid) {
      gsap.to(giftLid, {
        y: -180,
        rotation: 18,
        duration: 0.9,
        ease: "back.out(1.8)",
      });
    }

    /*-------------------------
          HỘP PHÓNG TO
    --------------------------*/

    gsap.to(".gift-box-3d", {
      scale: 1.15,

      duration: 0.6,

      yoyo: true,

      repeat: 1,
    });

    /*-------------------------
            CONFETTI
    --------------------------*/

    confetti({
      particleCount: 350,

      spread: 180,

      origin: {
        y: 0.55,
      },
    });

    /*-------------------------
        ÁNH SÁNG
    --------------------------*/

    for (let i = 0; i < 80; i++) {
      setTimeout(createLight, i * 25);
    }

    /*-------------------------
        TIM BAY
    --------------------------*/

    burstGiftHeart();

    /*-------------------------
        CAMERA ZOOM
    --------------------------*/

    gsap.fromTo(
      "#scene-gift",
      {
        scale: 1,
      },
      {
        scale: 1.04,
        duration: 1.5,
        yoyo: true,
        repeat: 1,
      },
    );

    /*-------------------------
        CHUYỂN SCENE
    --------------------------*/

    setTimeout(() => {
      nextScene();
    }, 4500);
  });
}

/*=========================================================
            AUTO LIGHT
=========================================================*/

let giftLightLoop;

const giftObserver = new MutationObserver(() => {
  if (currentScene === 6) {
    giftLightLoop = setInterval(createLight, 300);
  } else {
    clearInterval(giftLightLoop);
  }
});

giftObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

/*=========================================================
            END PART 6
=========================================================*/
/*=========================================================
        SCRIPT.JS - PART 7
        SCENE 8 - CINEMATIC END
=========================================================*/

let endingStarted = false;

/*=========================================================
                START ENDING
=========================================================*/

function startEnding() {
  if (endingStarted) return;

  endingStarted = true;

  /*==============================
            FIREWORK LOOP
    ==============================*/

  const firework = setInterval(() => {
    confetti({
      particleCount: 120,

      spread: 90,

      startVelocity: 40,

      origin: {
        x: Math.random(),
        y: Math.random() * 0.5,
      },
    });
  }, 900);

  /*==============================
            BIG FIREWORK
    ==============================*/

  setTimeout(() => {
    confetti({
      particleCount: 500,

      spread: 360,

      startVelocity: 65,

      ticks: 350,

      origin: {
        x: 0.5,
        y: 0.5,
      },
    });
  }, 2500);

  /*==============================
            TITLE GLOW
    ==============================*/

  gsap.to(".end-title-name", {
    textShadow: "0 0 15px #fff," + "0 0 35px gold," + "0 0 60px gold",

    duration: 1,

    repeat: -1,

    yoyo: true,
  });

  /*==============================
            MESSAGE
    ==============================*/

  gsap.from(".ending-message", {
    y: 60,

    opacity: 0,

    duration: 2,

    delay: 1,
  });

  /*==============================
            FRAME FLOAT
    ==============================*/

  gsap.to(".final-frame", {
    y: -10,

    duration: 2,

    repeat: -1,

    yoyo: true,

    ease: "power1.inOut",
  });

  /*==============================
            FIREWORK TEXT
    ==============================*/

  gsap.to(".end-firework-fx", {
    scale: 1.15,

    opacity: 1,

    duration: 1,

    repeat: -1,

    yoyo: true,
  });

  /*==============================
            STAR LOOP
    ==============================*/

  setInterval(createEndingStar, 120);

  /*==============================
            HEART LOOP
    ==============================*/

  setInterval(createEndingHeart, 250);
}

/*=========================================================
            STAR
=========================================================*/

function createEndingStar() {
  const star = document.createElement("div");

  star.className = "ending-star";

  star.style.left = Math.random() * innerWidth + "px";

  star.style.top = Math.random() * innerHeight + "px";

  document.body.appendChild(star);

  gsap.fromTo(
    star,
    {
      opacity: 0,
      scale: 0,
    },
    {
      opacity: 1,
      scale: 1.6,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      onComplete() {
        star.remove();
      },
    },
  );
}

/*=========================================================
            HEART
=========================================================*/

function createEndingHeart() {
  const heart = document.createElement("div");

  heart.className = "ending-heart";

  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * innerWidth + "px";

  heart.style.fontSize = 18 + Math.random() * 24 + "px";

  document.body.appendChild(heart);

  gsap.fromTo(
    heart,
    {
      y: innerHeight + 100,
      opacity: 0,
    },
    {
      y: -150,
      opacity: 1,
      duration: 6,
      ease: "none",
      onComplete() {
        heart.remove();
      },
    },
  );
}

/*=========================================================
            OBSERVER
=========================================================*/

const endingObserver = new MutationObserver(() => {
  if (currentScene === 7) {
    startEnding();
  }
});

endingObserver.observe(document.body, {
  childList: true,
  subtree: true,
});

/*=========================================================
            REPLAY
=========================================================*/

if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    currentScene = 0;

    endingStarted = false;

    if (music) {
      music.currentTime = 0;

      music.play();
    }

    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/*=========================================================
            END
=========================================================*/
/*=========================================================
                PART 8
        REPLAY + INIT + RESIZE
=========================================================*/

/*===============================
        REPLAY WEBSITE
================================*/

if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    currentScene = 0;

    // reset phong bì
    if (envelopeLid) envelopeLid.classList.remove("open");

    if (letterPaper) {
      letterPaper.classList.remove("show");
      letterPaper.scrollTop = 0;
    }

    // reset ảnh
    photoCards.forEach((card) => {
      card.classList.remove("active");
    });

    // reset nến
    if (flame) flame.classList.add("active");

    if (smoke) smoke.classList.remove("show");

    // reset nút
    if (nextLetterBtn) nextLetterBtn.style.display = "none";

    if (giftBtn) giftBtn.style.display = "none";

    // phát lại nhạc
    if (music) {
      music.currentTime = 0;

      music.play().catch(() => {});
    }

    // pháo giấy
    confetti({
      particleCount: 200,
      spread: 180,
      origin: { y: 0.55 },
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*===============================
        WINDOW RESIZE
================================*/

window.addEventListener("resize", () => {
  createStars();
});

/*===============================
        AUTO PLAY MUSIC
================================*/

window.addEventListener(
  "click",
  () => {
    if (music && music.paused) {
      music.play().catch(() => {});
    }
  },
  { once: true },
);

/*===============================
        LOADER
================================*/

/*===============================
        KEYBOARD SHORTCUT
================================*/

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      nextScene();
      break;

    case "ArrowLeft":
      if (currentScene > 0) {
        currentScene--;
        showScene(currentScene);
      }
      break;

    case "r":
    case "R":
      replayBtn?.click();
      break;
  }
});

/*===============================
        END
================================*/

console.log(
  "%c❤️ Happy Birthday Anh Bé ❤️",
  "font-size:22px;color:#ff4d88;font-weight:bold;",
);

console.log("Website Loaded Successfully ✨");
/*=========================================================
        SCRIPT.JS - PART 9
        FINAL ENDING + REPLAY
=========================================================*/

/*===============================
        SCENE 8 EFFECT
================================*/

function startEndingEffects() {
  // Confetti
  if (typeof confetti !== "undefined") {
    const duration = 6000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }

  // Firework text
  const firework = document.querySelector(".end-firework-fx");

  if (firework) {
    firework.classList.add("show");
  }
}

/*===============================
        FLOATING HEARTS
================================*/

function createEndingHeart() {
  const heart = document.createElement("div");

  heart.className = "heart";

  heart.innerHTML = "❤️";

  heart.style.left = Math.random() * window.innerWidth + "px";

  heart.style.top = window.innerHeight + "px";

  heart.style.fontSize = 18 + Math.random() * 25 + "px";

  document.body.appendChild(heart);

  gsap.to(heart, {
    y: -window.innerHeight - 200,

    x: "+=" + (Math.random() * 200 - 100),

    opacity: 0,

    duration: 5,

    ease: "power1.out",

    onComplete() {
      heart.remove();
    },
  });
}

/*===============================
        HEART LOOP
================================*/

let endingHeartLoop = null;

function startHeartLoop() {
  endingHeartLoop = setInterval(() => {
    createEndingHeart();
  }, 250);
}

/*===============================
        STOP HEART LOOP
================================*/

function stopHeartLoop() {
  if (endingHeartLoop) {
    clearInterval(endingHeartLoop);

    endingHeartLoop = null;
  }
}

/*===============================
        SHOW FINAL SCENE
================================*/

function showEndingScene() {
  showScene(7);

  startEndingEffects();

  startHeartLoop();
}

/*===============================
        REPLAY BUTTON
================================*/

if (replayBtn) {
  replayBtn.addEventListener("click", () => {
    stopHeartLoop();

    currentScene = 0;

    if (music) {
      music.currentTime = 0;

      music.play();
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*===============================
        AUTO FIREWORK
================================*/

setInterval(() => {
  if (!document.querySelector("#scene-end.active")) return;

  if (typeof confetti === "undefined") return;

  confetti({
    particleCount: 100,

    spread: 100,

    origin: {
      x: Math.random(),

      y: Math.random() * 0.5,
    },
  });
}, 3000);

/*===============================
        END MESSAGE GLOW
================================*/

gsap.to(".end-title-name", {
  textShadow: "0 0 20px #fff,0 0 40px #ff7eb9,0 0 80px #ff4da6",

  duration: 1.5,

  repeat: -1,

  yoyo: true,
});

/*===============================
        END PARAGRAPH FADE
================================*/

gsap.to(".ending-message", {
  opacity: 1,

  y: -10,

  duration: 2,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*===============================
        FINAL TEXT TYPING
================================*/

const finalQuote = document.querySelector(".ending-message h3");

if (finalQuote) {
  gsap.from(finalQuote, {
    opacity: 0,

    y: 30,

    duration: 2,

    delay: 1,
  });
}

/*===============================
        THANK YOU
================================*/

console.log("❤️ Happy Birthday Anh Bé ❤️");
/*=========================================================
        SCRIPT.JS - PART 10
        CINEMATIC BACKGROUND
=========================================================*/

/*===============================
        STAR TWINKLE
================================*/

/*===============================
        SHOOTING STAR
================================*/

function shootingStar() {
  const container = document.getElementById("background-layers");

  if (!container) return;

  const star = document.createElement("div");

  star.className = "shooting-star";

  star.style.left = Math.random() * window.innerWidth + "px";

  star.style.top = Math.random() * 150 + "px";

  container.appendChild(star);

  gsap.to(star, {
    x: 800,

    y: 400,

    opacity: 0,

    duration: 1.6,

    ease: "power2.out",

    onComplete() {
      star.remove();
    },
  });
}

setInterval(shootingStar, 3500);

/*===============================
        FLOAT HEART BG
================================*/

function floatingHeartBackground() {
  const heart = document.createElement("div");

  heart.className = "bg-heart";

  heart.innerHTML = "❤";

  heart.style.left = Math.random() * 100 + "%";

  heart.style.fontSize = 12 + Math.random() * 20 + "px";

  document.body.appendChild(heart);

  gsap.to(heart, {
    y: -window.innerHeight - 200,

    opacity: 0,

    duration: 8,

    ease: "none",

    onComplete() {
      heart.remove();
    },
  });
}

setInterval(floatingHeartBackground, 1200);

/*===============================
        PARALLAX
================================*/

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;

  const y = (e.clientY / window.innerHeight - 0.5) * 30;

  gsap.to("#background-layers", {
    x,

    y,

    duration: 1.5,

    ease: "power2.out",
  });
});

/*===============================
        AURORA EFFECT
================================*/

gsap.to("#background-layers", {
  filter: "hue-rotate(15deg)",

  duration: 10,

  repeat: -1,

  yoyo: true,

  ease: "sine.inOut",
});

/*===============================
        SCENE TRANSITION
================================*/

function cinematicTransition(next) {
  gsap.to(".scene.active", {
    opacity: 0,

    scale: 1.05,

    duration: 0.8,

    onComplete() {
      showScene(next);

      gsap.fromTo(
        scenes[next],

        {
          opacity: 0,

          scale: 0.96,

          opacity: 1,

          scale: 1,

          duration: 1,
        },
      );
    },
  });
}

/*===============================
        RESIZE
================================*/

window.addEventListener("resize", () => {
  createStars();
});

/*===============================
        PERFORMANCE
================================*/

window.addEventListener("blur", () => {
  if (music) {
    music.volume = 0.2;
  }
});

window.addEventListener("focus", () => {
  if (music) {
    music.volume = 1;
  }
});

/*===============================
        FINISH
================================*/

console.log("✨ Cinematic Birthday Website Loaded Successfully ❤️");
// =========================
// REPLAY
// =========================

const replay = document.getElementById("btn-replay");

if (replay) {
  replay.onclick = () => {
    currentScene = 0;
  };
}
// =========================
// LOADER
// =========================

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const fill = document.querySelector(".progress-fill");

  if (fill) {
    gsap.to(fill, {
      width: "100%",
      duration: 2,
      ease: "power1.out",
    });
  }

  setTimeout(() => {
    if (loader) {
      gsap.to(loader, {
        opacity: 0,

        duration: 1,

        onComplete: () => {
          loader.style.display = "none";

          document.body.classList.remove("loading");

          showScene(0);

          createStars();
        },
      });
    } else {
      showScene(0);

      createStars();
    }
  }, 2200);
});
