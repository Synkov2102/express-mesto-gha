const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          return /http[s]?:\/(?:\/[^/]+){1,}(?:\/[А-Яа-яёЁ\w ]+\.[a-z]{3,5}(?![/]|[\wА-Яа-яёЁ]))/.test(v);
        },

        message: (props) => `${props.value} is not a valid phone number!`,
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
