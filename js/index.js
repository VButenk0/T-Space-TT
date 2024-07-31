document.addEventListener("DOMContentLoaded", () => {
  const messagesContainer = document.getElementById("messages");
  let currentQuestionIndex = 0;

  const initialMessages = [
    "Запускаємо курс з арбітражу трафіку! Отримайте цінні знання від експертів. Поглиблене вивчення сучасних стратегій.",
    "Приєднуйтесь до нашого нового курсу! Інтерактивні заняття, практичні завдання, сертифікат. Відмінна можливість підвищити кваліфікацію.",
    "Учасники отримають доступ до ексклюзивних матеріалів, консультацій та мережі контактів. Вивчайте нові тенденції арбітражу трафіку.",
  ];

  initialMessages.forEach((msg, index) => {
    setTimeout(() => {
      addMessage(msg, "bot");
      if (index === initialMessages.length - 1) {
        setTimeout(() => {
          askQuestion("Хочете дізнатися більше?", ["Так", "Ні"]);
        }, 1000);
      }
    }, index * 1000);
  });

  function addMessage(text, sender) {
    const messageElem = document.createElement("div");
    messageElem.classList.add("message", sender);
    messageElem.textContent = text;
    messagesContainer.appendChild(messageElem);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function askQuestion(question, answers) {
    addMessage(question, "bot");
    const answersContainer = document.createElement("div");
    answersContainer.classList.add("answers");
    answers.forEach((answer) => {
      const answerBtn = document.createElement("button");
      answerBtn.textContent = answer;
      answerBtn.addEventListener("click", () => handleAnswer(answer));
      answersContainer.appendChild(answerBtn);
    });
    messagesContainer.appendChild(answersContainer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleAnswer(answer) {
    document.querySelector(".answers").remove();
    addMessage(answer, "user");

    if (answer === "Так" && currentQuestionIndex === 0) {
      setTimeout(() => {
        askQuestion("Чи був у вас досвід пов'язаний із Арбітражем трафіку?", [
          "Так",
          "Ні",
          "Чув про це",
        ]);
      }, 1000);
    } else if (currentQuestionIndex === 1) {
      setTimeout(() => {
        askQuestion("Скільки часу ви могли б приділяти на день?", [
          "Одна година",
          "2-3 години",
          "5 і більше",
        ]);
      }, 1000);
    } else if (currentQuestionIndex === 2) {
      setTimeout(() => {
        addMessage(
          "Дякую! Наша компанія дуже зацікавлена ​​вами, для подальшої підтримки зв'язку, будь ласка, заповніть форму.",
          "bot"
        );
      }, 1000);
      setTimeout(() => {
        displayForm();
      }, 1500);
    } else if (answer === "Ні") {
      setTimeout(() => {
        addMessage(
          "Дякую за вашу відповідь, чекаємо на ваше повернення",
          "bot"
        );
      }, 1000);
    }

    currentQuestionIndex++;
  }

  function displayForm() {
    const form = document.createElement("form");
    form.innerHTML = `
      <label for="name">Ім'я</label>
      <input type="text" id="name" name="name" required>
      <label for="surname">Прізвище</label>
      <input type="text" id="surname" name="surname" required>
      <label for="email">Пошта</label>
      <input type="email" id="email" name="email" required>
      <label for="number">Телефон</label>
      <input type="tel" id="number" name="number" required>
      <button type="submit">Надіслати</button>
    `;
    form.addEventListener("submit", handleFormSubmit);
    messagesContainer.appendChild(form);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const errors = [];
    const formData = new FormData(form);
    const name = formData.get("name");
    const surname = formData.get("surname");
    const email = formData.get("email");
    const number = formData.get("number");

    if (!name) errors.push("Ім'я є обов'язковим.");
    if (!surname) errors.push("Прізвище є обов'язковим.");
    if (!email) errors.push("Пошта є обов'язковою.");
    if (!number) errors.push("Телефон є обов'язковим.");
    if (email && !/\S+@\S+\.\S+/.test(email))
      errors.push("Введіть коректну адресу електронної пошти.");
    if (number && !/^\d{10,15}$/.test(number))
      errors.push("Введіть коректний номер телефону.");

    const errorContainer = document.getElementById("form-errors");
    if (errors.length > 0) {
      errorContainer.innerHTML = errors.join("<br>");
    } else {
      localStorage.setItem(
        "formData",
        JSON.stringify({ name, surname, email, number })
      );
      window.location.href = "success.html";
    }
  }
});
