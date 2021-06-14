const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const router = Router()

// /api/auth/register
router.post(
  '/register',
  //валидация пароля на серверt при помощи библиотеки express-validator
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }

      const { email, password } = req.body // то, что мы будем отправлять с фронтенда
      const candidate = await User.findOne({ email }) // проверка, есть ли такой имейл уже
      // если пользователь существует, выдаем ошибку
      if (candidate) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' })
      }
      // если такого пользователя нет, захешируем его пароль
      const hashedPassword = await bcrypt.hash(password, 12)
      // создаем нового пользователя
      const user = new User({ email, password: hashedPassword })
      //сохраняем пользователя
      await user.save()
      res.status(201).json({ message: 'Пользователь создан и сохранен' })
    } catch (error) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email')
      .normalizeEmail()
      .isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему'
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' })
      }

      const token = jwt.sign({ userId: user.id }, config.get('jwtSecret'), {
        expiresIn: '1h'
      })

      res.json({ token, userId: user.id })
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

module.exports = router
