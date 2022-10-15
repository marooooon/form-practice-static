// 各input要素の外側<li>タグID
const shimeiList = document.getElementById("shimei_list");
const furiganaList = document.getElementById("furigana_list");
const emailList = document.getElementById("email_list");
const passwordLists = document.getElementById("password_lists");
const passwordList = document.getElementById("password_list");
const passworconfirmList = document.getElementById("email_confirm_list");
const genderManList = document.getElementById("gender_man_list");
const genderWomanList = document.getElementById("gender_woman_list");
const genderOtherList = document.getElementById("gender_other_list");

// 各input要素ID
const shimei = document.getElementById("shimei");
const furigana = document.getElementById("furigana");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password_confirm = document.getElementById("password_confirm");

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

// エラー要素追加
function createErrorElement(text, error_id, list_id) {
  const newErrorMessageElement = document.createElement("p");
  const newErrorMessageContent = document.createTextNode(text);
  newErrorMessageElement.appendChild(newErrorMessageContent);
  newErrorMessageElement.classList.add("error-message");
  newErrorMessageElement.setAttribute("id", error_id);
  list_id.appendChild(newErrorMessageElement);
}

// エラー要素削除
function removeErrorElement(id) {
  const errorElement = document.querySelector(id);
  if (errorElement) {
    errorElement.remove();
  }
}

// 氏名バリデーション
function validationName() {
  removeErrorElement("#error-shimei");
  if (!shimei.value.match(validNumeric)) {
    createErrorElement(errorMessageNonNumeric, "error-shimei", shimeiList);
    return;
  }
}

// フリガナバリデーション
function validationFurigana() {
  removeErrorElement("#error-furigana");
  if (!furigana.value.match(validFurigana)) {
    createErrorElement(errorMessageFurigana, "error-furigana", furiganaList);
    return;
  }
}

// メールアドレスバリデーション
function validationEmail() {
  removeErrorElement("#error-email");
  if (!email.value.match(validEmail)) {
    createErrorElement(errorMessageEmail, "error-email", emailList);
    return;
  }
}

// パスワードバリデーション
function validationPassword() {
  removeErrorElement("#error-password");
  if (!password.value || !password_confirm.value) {
    return;
  } else if (password.value !== password_confirm.value) {
    createErrorElement(errorMessagePassword, "error-password", passwordLists);
    return;
  }
}

// input内content変更イベント
shimei.addEventListener("change", validationName);
furigana.addEventListener("change", validationFurigana);
email.addEventListener("change", validationEmail);
password.addEventListener("change", validationPassword);
password_confirm.addEventListener("change", validationPassword);

// 「送信」ボタンの要素を取得
const submit = document.querySelector(".submit-button");
submit.addEventListener("click", (e) => {
  // 最初のイベントをキャンセル
  e.preventDefault();
});
