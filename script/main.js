document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
    }
});

const messages = [
  "Нажимай где угодно",
  "Эй, ты ❤️",
  "Я хочу тебе кое-что сказать",
  "Попробуй нажать",
  "Нажми еще раз",
  "Давай, не сдавайся, нажимай",
  "Обещаю, это последний раз",
  "Серьезно",
  "Это",
  "Последний",
  "Но это обман, хехе, хахаха, давай еще!",
  "Я знаю, ты уже злишься",
  "Хмм...",
  "Ладно тогда...",
  "А ведь...",
  "Я просто хотел сказать",
  "Я люблю тебя ❤️",
  "Офигеть...",
  "прости меня 🙏🙏️",
  "Я не хотел тебя обидеть",
  "Ты для меня очень важна...",
  "Я скучаю по тебе...",
  "Ты самое красивое, что со мной случалось",
  "Я часто думаю о нас",
  "Я был не прав, правда...",
  "Если бы мог, я бы всё исправил",
  "Ты заслуживаешь счастья",
  "С тобой — это и есть счастье",
  "Я не идеален, но я учусь ради тебя",
  "Спасибо, что ты была рядом",
  "Может, начнём сначала?.. 💫",
  "Пожалуйста, прими мои извинения",
  "Ты всё ещё здесь?.. 😳",
  "Серьёзно, ты не устала нажимать?",
  "Ладно, теперь точно скажу...",
  "Но сначала...",
  "Немного магии ✨",
  "А теперь...",
  "Нет, ещё чуть-чуть 😅",
  "Ты терпеливая, мне это нравится",
  "Ты прекрасна, даже когда злишься",
  "Ты ведь улыбаешься сейчас?",
  "Я это чувствую 💞",
  "Ладно, шучу",
  "А может, и нет...",
  "Я много думал",
  "О тебе, обо всём",
  "Я скучаю по твоему голосу",
  "И по твоим глазам",
  "И по тому, как ты смотришь, когда злишься 😅",
  "Я не забыл ни одного момента",
  "Серьёзно",
  "Ты была — и остаёшься — моим чудом",
  "Если ты читаешь это...",
  "Значит, всё ещё не всё потеряно",
  "Значит, у нас есть шанс",
  "Я готов быть лучше",
  "Ради тебя",
  "Ради нас",
  "Сделаешь ещё один клик?",
  "И увидишь, что я всё ещё люблю тебя ❤️"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
    $('.message').text(messages[currentPage]);
    
    isLastPage = currentPage === messages.length - 1;
    
    if (isLastPage) {
        $('.next-button').show();
        $('.bg_heart').css('cursor', 'default');
    } else {
        $('.next-button').hide();
        $('.bg_heart').css('cursor', 'pointer');
    }
}

$('.bg_heart').on('click', function() {
    if (!isLastPage) {
        currentPage++;
        showMessage();
    }
});

var love = setInterval(function() {
    var r_num = Math.floor(Math.random() * 40) + 1;
    var r_size = Math.floor(Math.random() * 65) + 10;
    var r_left = Math.floor(Math.random() * 100) + 1;
    var r_bg = Math.floor(Math.random() * 25) + 100;
    var r_time = Math.floor(Math.random() * 5) + 5;
    
    $('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);animation:love " + r_time + "s ease'></div>");
    
    $('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);animation:love " + (r_time + 5) + "s ease'></div>");
    
    $('.heart').each(function() {
        var top = parseFloat($(this).css("top"));
        var width = parseFloat($(this).css("width"));
        if (top <= -100 || width >= 150) {
            $(this).remove();
        }
    });
}, 500);

showMessage();

function clearMusicState() {
    localStorage.removeItem('musicPlaying');
    localStorage.removeItem('musicCurrentTime');
}

window.onload = function() {
    clearMusicState(); 
}

function setupMusic() {
    const music = document.getElementById('backgroundMusic');
    
    if (!localStorage.getItem('initialLoad')) {
        clearMusicState();
        localStorage.setItem('initialLoad', 'true');
        music.currentTime = 0;
    }

    const isMusicPlaying = localStorage.getItem('musicPlaying') === 'true';
    const musicCurrentTime = localStorage.getItem('musicCurrentTime') || 0;

    if (isMusicPlaying) {
        music.currentTime = parseFloat(musicCurrentTime);
        music.play().catch(error => console.log('Playback failed', error));
    }

    music.addEventListener('play', () => {
        localStorage.setItem('musicPlaying', 'true');
    });

    music.addEventListener('pause', () => {
        localStorage.setItem('musicPlaying', 'false');
    });

    setInterval(() => {
        localStorage.setItem('musicCurrentTime', music.currentTime);
    }, 1000);

    document.addEventListener('click', function startMusic() {
        music.play().catch(error => {
            console.log('Autoplay prevented', error);
        });
        document.removeEventListener('click', startMusic);
    });
}

document.addEventListener('DOMContentLoaded', setupMusic);