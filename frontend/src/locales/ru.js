export default {
  translation: {
    ui: {
      loginPage: {
        title: 'Войти',
        nameField: 'Ваш ник',
        passwordField: 'Пароль',
        noUserError: 'Неверные имя пользователя или пароль',
        loginError: 'Произошла ошибка при попытке войти в аккаунт',
      },
      signupPage: {
        title: 'Регистрация',
        nameField: 'Имя пользователя',
        passwordField: 'Пароль',
        confirmPasswordField: 'Подтвердите пароль',
        submitButton: 'Зарегистрироваться',
        duplicateUserError: 'Такой пользователь уже существует',
        shortOrLongError: 'От 3 до 20 символов',
        passwordMinError: 'Минимум 6 символов',
        requiredError: 'Обязательное поле',
        passwordMatchError: 'Пароли должны совпадать',
      },
      homePage: {
        channels: 'Каналы',
        deleteChannel: 'Удалить',
        renameChannel: 'Переименовать',
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
        sendMessageButton: 'Отправить',
        logout: 'Выйти'
      },
      notfoundPage: {
        title: 'Страница не найдена',
        suggestion: 'Но вы можете перейти ',
        link: 'на главную страницу'
      },
      modals: {
        addChannel: 'Добавить канал',
        renameChannel: 'Переименовать канал',
        removeChannel: 'Удалить канал',
        channelName: 'Имя канала',
        prevention: 'Уверены?',
        cancelButton: 'Отменить',
        sendButton: 'Отправить',
        deleteButton: 'Удалить',
        shortOrLong: 'От 3 до 20 символов',
        duplicateName: 'Должно быть уникальным',
      },
      toast: {
        addChannel: 'Канал создан',
        renameChannel: 'Канал переименован',
        removeChannel: 'Канал удалён',
        disconnect: 'Ошибка соединения'
      }
    },
  },
}
