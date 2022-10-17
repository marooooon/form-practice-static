// 各input要素の外側<li>タグID
const shimeiList = document.getElementById("shimei-list");
const furiganaList = document.getElementById("furigana-list");
const emailList = document.getElementById("email-list");
const passwordLists = document.getElementById("password-lists");
const passwordList = document.getElementById("password-list");
const passwordConfirmList = document.getElementById("password-confirm-list");
const genderManList = document.getElementById("gender-man-list");
const genderWomanList = document.getElementById("gender-woman-list");
const genderOtherList = document.getElementById("gender-other-list");

// 各input要素ID
const shimei = document.getElementById("shimei");
const furigana = document.getElementById("furigana");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("password-confirm");
const birthYear = document.getElementById("year");
const birthMonth = document.getElementById("month");
const birthDay = document.getElementById("day");
const genderMan = document.getElementById("gender-man");
const genderWoman = document.getElementById("gender-woman");
const genderOther = document.getElementById("gender-other");

// バリデーション
const validNumeric = /^[^0-9]*$/; // 半角数字のみ（空文字OK）
const validFurigana = /^[ァ-ンヴー]*$/; // 全角カタカナ（空文字OK）
const validEmail =
  /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/; // メールアドレス

// エラーメッセージ
const errorMessageNonNumeric = "数字は含めないでください。";
const errorMessageFurigana = "全角カタカナで入力してください。";
const errorMessageEmail = "メールアドレスが正しくありません。";
const errorMessagePassword = "パスワードは同じ値を入力してください。";
const errorMessageRequired = "入力必須項目です。";

// エラー要素追加
function createErrorElement(validationText, errorId, listId) {
  const newErrorMessageElement = document.createElement("p");
  const newErrorMessageContent = document.createTextNode(validationText);
  newErrorMessageElement.appendChild(newErrorMessageContent);
  newErrorMessageElement.classList.add("error-message");
  newErrorMessageElement.setAttribute("id", errorId);
  listId.appendChild(newErrorMessageElement);
}

// エラー要素削除
function removeErrorElement(id) {
  const errorElement = document.getElementById(id);
  if (errorElement) {
    errorElement.remove();
  }
}

// 氏名バリデーション
function validationName() {
  removeErrorElement("error-shimei");
  if (!shimei.value.match(validNumeric)) {
    createErrorElement(errorMessageNonNumeric, "error-shimei", shimeiList);
    return;
  }
}

// フリガナバリデーション
function validationFurigana() {
  removeErrorElement("error-furigana");
  if (!furigana.value.match(validFurigana)) {
    createErrorElement(errorMessageFurigana, "error-furigana", furiganaList);
    return;
  }
}

// メールアドレスバリデーション
function validationEmail() {
  removeErrorElement("error-email");
  if (!email.value.match(validEmail)) {
    createErrorElement(errorMessageEmail, "error-email", emailList);
    return;
  }
}

// パスワードバリデーション
function validationPassword() {
  removeErrorElement("error-password");
  if (!password.value || !passwordConfirm.value) {
    return;
  } else if (password.value !== passwordConfirm.value) {
    createErrorElement(errorMessagePassword, "error-password", passwordLists);
    return;
  }
}

// input内content変更イベント
shimei.addEventListener("change", validationName);
furigana.addEventListener("change", validationFurigana);
email.addEventListener("change", validationEmail);
password.addEventListener("change", validationPassword);
passwordConfirm.addEventListener("change", validationPassword);

// 「送信」ボタンの要素を取得
const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  // 最初のイベントをキャンセル
  e.preventDefault();

  // バリエーションに引っかかっているか否かチェック
  let isValidation = false;

  // 必須項目になにか入っていないとエラー
  if (!shimei.value) {
    removeErrorElement("error-shimei");
    createErrorElement(errorMessageRequired, "error-shimei", shimeiList);
    isValidation = true;
  }

  if (!furigana.value) {
    removeErrorElement("error-furigana");
    createErrorElement(errorMessageRequired, "error-furigana", furiganaList);
    isValidation = true;
  }

  if (!email.value) {
    removeErrorElement("error-email");
    createErrorElement(errorMessageRequired, "error-email", emailList);
    isValidation = true;
  }

  if (!password.value) {
    removeErrorElement("error-password");
    createErrorElement(errorMessageRequired, "error-password", passwordList);
    isValidation = true;
  }

  if (!passwordConfirm.value) {
    removeErrorElement("error-password-confirm");
    createErrorElement(
      errorMessageRequired,
      "error-password-confirm",
      passwordConfirmList
    );
    isValidation = true;
  }

  if (isValidation) {
    return;
  }
});

// 生年月日
// yearは1950年〜現在まで
const newDate = new Date();
const currentYear = newDate.getFullYear();

function createOptionForElements(elem, num) {
  let option = document.createElement("option");
  option.text = num;
  option.value = num;
  elem.appendChild(option);
}

const birthYearOption = () => {
  for (let i = 1920; i <= currentYear; i++) {
    createOptionForElements(birthYear, i);
  }
  for (let i = 1; i <= 12; i++) {
    createOptionForElements(birthMonth, i);
  }
  for (let i = 1; i <= 31; i++) {
    createOptionForElements(birthDay, i);
  }
};

// 参考：https://zenn.dev/okoe/articles/7876b897c0fccf
birthYear.addEventListener("change", (e) => {
  // 最初のイベントをキャンセル
  e.preventDefault();

  birthDay.innerHTML = "";
  let lastDayOfMonth = new Date(birthDay.value);
});
