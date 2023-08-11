import Storage from "../module/Storage.js";

const $idInput = document.getElementById('id');
const $pwInput = document.getElementById('password');
const $submitBtn = document.querySelector('.signin_btn');

const userStorage = new Storage('user');
console.log(userStorage.getData());
$submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const idValue = $idInput.value;
    const pwValue = $pwInput.value;
    // validation
    if(idValue.length < 4 || idValue.length > 16) {
        alert('아이디를 확인해주세요.');
        $idInput.focus();
        return
    }
    if(pwValue.length < 4 || pwValue.length > 16) {
        alert('비밀번호를 확인해주세요.');
        $pwInput.focus();
        return
    }
    const userInfo = userStorage.searchValue('id', idValue)
    if(userInfo) {
        if(pwValue !== userInfo.password) {
            alert('비밀번호를 확인해주세요.');
            return
        }
    }
    if(userInfo[0].id === idValue && userInfo[0].password === pwValue) {
        alert('로그인 성공')
        // location.href = '/pages/todo.html';
    }else {
        alert('비밀번호가 일치하지 않습니다.')
    }
});