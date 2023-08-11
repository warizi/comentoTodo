import Storage from "../module/Storage.js";

const $idInput = document.getElementById('id');
const $pwInput = document.getElementById('password');
const $confirmInput = document.getElementById('password_confirm');
const $submitBtn = document.querySelector('.signup_btn');

const userStorage = new Storage('user');

$submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const idValue = $idInput.value;
    const pwValue = $pwInput.value;
    const confirmValue = $confirmInput.value;
    
    const isDuplicateId = userStorage.duplicateValue('id', idValue);
    if(!isDuplicateId) {
        alert('해당 아이디는 사용할 수 없습니다.');
        return
    }
    if(pwValue.length < 4 || pwValue.length > 16) {
        alert('비밀번호를 확인해주세요.');
        return
    }
    if(pwValue !== confirmValue) {
        alert('비밀번호가 일치하지 않습니다.');
        return
    }
    
    userStorage.addItem({
        username: idValue,
        password: pwValue
    })

    alert('회원가입 성공! 로그인 페이지로 이동합니다.')

    location.href = '/';
})

