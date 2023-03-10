// ! ДЗ 45. Банкомат на Promise

// Необходимо реализовать алгоритм запроса у банкомата:

// баланса на карте
// выдачи наличных

// Входящие данные:

let userData = {
    USD: 1000,
    EUR: 900,
    UAH: 15000,
    BIF: 20000,
    AOA: 100,
},
    bankData = {
        USD: {
            max: 3000,
            min: 100,
            img: "💵",
        },
        EUR: {
            max: 1000,
            min: 50,
            img: "💶",
        },
        UAH: {
            max: 0,
            min: 0,
            img: "💴",
        },
        GBP: {
            max: 10000,
            min: 100,
            img: "💷",
        },
    };

// Для этого пишем функцию getMoney, которая:

// в качестве входящих аргументов принимает объекты userData и bankData.
// возвращает Promise, в котором условием перехода в первый .then является ответ юзера на вопрос
// 'Посмотреть баланс на карте?’.

// Если юзер выбирает Да (Yes, Подтвердить), то вызываем функцию resolve(userData)
// В функции resolve, в зависимости от доступных пользователю валют (userData),
// предлагаем пользователю ввести валюту, по которой будет выведен баланс.

// Если пользователь вводить в prompt название НЕдопустимой для него валюты, продолжаем запрашивать валюту,
// пока не будет введена допустимая.

// При вводе пользователем названия допустимой ему валюты – выводим данные о балансе по данной валюте в консоль,
// например: ‘Баланс составляет: 1000 USD’.
// Если юзер выбирает Отмена (No), то взываем функцию reject({userData: userData, bankData: bankData})

// В функции reject, в зависимости от доступных пользователю валют (userData) и доступных валют в текущем банкомате bankData
// (с НЕ нулевым значением свойства max, что говорит об отсутствии в данный момент купюр этой валюты в банкомате),
// предлагаем пользователю ввести валюту, по которой будет произведено снятие наличных и сумму снятия.

// Если пользователь вводит в prompt название НЕдопустимой для него и для банкомата валюты, продолжаем запрашивать валюту, пока не будет введена допустимая.
// Если пользователь вводит в prompt сумму превышающую max для данной валюты, выводим в консоль сообщение: `Введенная сумма больше допустимой. Максимальная сумма снятия: …`
// Если пользователь вводит в prompt сумму меньше min для данной валюты, выводим в консоль сообщение: `Введенная сумма меньше допустимой. Минимальная сумма снятия: …`
// При вводе пользователем допустимой ему и текущему банкомату название валюты и сумму – выводим сообщение об успешном снятии наличных в консоль,
// например: ‘Вот Ваши денежки 200 USD 💵’.
// Финальное сообщение, которое вне зависимости от выбора операции должен получить юзер в консоли – 'Спасибо, хорошего дня 😊'

function getMoney(userData, bankData) {
    return new Promise((resolve, reject) => {
        confirm("Посмотреть баланс на карте?")
            ? resolve(userData)
            : reject({ userData: userData, bankData: bankData });
    });
}

function valuta(obj) {
    let data = [];
    for (let key in obj) {
        data.push(key);
    }

    let ok = true;
    let valuta1;
    do {
        valuta1 = prompt(`Введите название валюты в формате ${data.join(", ")}`).toUpperCase();
        data.forEach((item) => {
            if (valuta1 === item) {
                ok = false;
            }
        });
    } while (ok);
    return valuta1;
}

getMoney(userData, bankData)
    .then(
        (obj) => {
            const valuta1 = valuta(userData);
            console.log(`Баланс составляет: ${obj[valuta1]} ${valuta1}`);
        },
        (obj) => {
            const valuta1 = valuta(userData);

            if ((`${obj.bankData[valuta1]}`) === "undefined") {
                console.log("В данный момент этой валюты нет в банкомате.");
            } else {
                let summ;
                summ = +prompt("Введите сумму для снятия наличных");

                if (summ > `${obj.userData[valuta1]}`) {
                    console.log("У вас не достаточно средств на счету, введите меньше сумму.");
                } else {

                    if ((`${obj.bankData[valuta1].max}`) === "0") {
                        console.log("Наличные средства закончились, остаток 0, в ближайшее время будет инкасация.");
                    } else if (summ < `${obj.bankData[valuta1].min}`) {
                        console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${obj.bankData[valuta1].min} ${valuta1}`);
                    } else if (summ > `${obj.bankData[valuta1].max}`) {
                        console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${obj.bankData[valuta1].max} ${valuta1}`);
                    } else {
                        console.log(`Вот Ваши денежки ${summ} ${valuta1} ${obj.bankData[valuta1].img}.`);
                    }
                }
            }


        }
    )
    .finally(() => console.log("Спасибо, хорошего дня."));

// !!!!!!!!!!!!!!!!

// function getMoney(userData, bankData) {
//     return new Promise((resolve, reject) => {
//         (confirm("Посмотреть баланс на карте?")) ? resolve(userData) : reject({ userData: userData, bankData: bankData });
//     })
// }

// const valuta = () => {
//     let valuta;
//     do {
//         valuta = prompt("Введите название валюты в формате USD, EUR, UAH, BIF, AOA").toUpperCase();
//     } while (valuta !== "USD" && valuta !== "EUR" && valuta !== "UAH" && valuta !== "BIF"
//         && valuta !== "AOA");
//     return valuta;
// };

// getMoney(userData, bankData)
//     .then(
//         obj => {
//             const valuta1 = valuta();
//             console.log(`Баланс составляет: ${obj[valuta1]} ${valuta1}`);
//         },
//         obj => {
//             const valuta1 = valuta();

//             if (valuta1 === "BIF") {
//                return console.log(`В данный момент в банкомате отсутвствует ваша валюта ${valuta1}`);
//             }

//             let summ;
//             summ = +prompt("Введите сумму для снятия наличных");

//             if (summ > `${obj.bankData[valuta1].max}`) {
//                 (`${obj.bankData[valuta1].max}` === "0") ? console.log("В данный момент в банкомате совсем нет купюр вашей валюты")
//                     : console.log(`Введенная сумма больше допустимой. Максимальная сумма снятия: ${obj.bankData[valuta1].max} ${valuta1}`);
//             } else if (summ < `${obj.bankData[valuta1].min}`) {
//                 (`${obj.bankData[valuta1].min}` === "0") ? console.log("В данный момент в банкомате совсем нет купюр вашей валюты")
//                     : console.log(`Введенная сумма меньше допустимой. Минимальная сумма снятия: ${obj.bankData[valuta1].min} ${valuta1}`);
//             } else {
//                 (`${summ}` === 0) ? console.log("В данный момент в банкомате совсем нет купюр вашей валюты") :
//                     console.log(`Вот Ваши денежки ${summ} ${valuta1} ${obj.bankData[valuta1].img}.`);
//             }
//         }
//     )
//     .finally(
//         () => console.log("Спасибо, хорошего дня.")
//     )
