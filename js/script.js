document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error === 0) {
      // БЕЗ ОТПРАВКИ PHP формы, не получается разобраться с загрузкой на хостинг.
      let response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
      } else {
        alert("Ошибка");
      }
    } else {
      alert("Заполните обязательные поля")
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input);
        error++;
      } else {
        if (input.value === "") {
          formAddError(input);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add("_error");
    input.classList.add("_error");
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove("_error");
    input.classList.remove("_error");
  }
});


// Бургер меню
const menu = document.querySelector('.nav');
const headerBurger = document.querySelector('.header-burger');

if (menu && headerBurger) {
  headerBurger.addEventListener('click', () => {
    menu.classList.toggle('active');
    headerBurger.classList.toggle('active');
  });
}


// Модальное окно
const openModalBtn = document.querySelector(".open-modal");
const closeModalBtn = document.querySelector(".modal__close");
const modalRegistration = document.querySelector(".modal");
const body = document.body;

openModalBtn.addEventListener("click", () => {
  modalRegistration.classList.add("active");
  body.classList.add("lock");
});

closeModalBtn.addEventListener("click", () => {
  modalRegistration.classList.remove("active");
  body.classList.remove("lock");
});

window.addEventListener("click", (e) => {
  let target = e.target;

  if (target === modalRegistration) {
    modalRegistration.classList.remove("active");
    body.classList.remove("lock");
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modalRegistration.classList.remove("active");
    body.classList.remove("lock");
  }
});


// Маска для номера телефона
document.addEventListener("DOMContentLoaded", function () {
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  let getInputNumbersValue = function (input) {
    return input.value.replace(/\D/g, "");
  };

  let onPhonePaste = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        input.value = inputNumbersValue;
        return;
      }
    }
  };

  let onPhoneInput = function (e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      if (e.data && /\D/g.test(e.data)) {
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  };

  let onPhoneKeyDown = function (e) {
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  };

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }
});
