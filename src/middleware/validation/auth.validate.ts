import joi from 'joi'

export const loginSchema = joi
  .object()
  .keys({
    email: joi.string().email().trim().lowercase().required(),
    password: joi.string().trim().required(),
  })
  .options({ abortEarly: false })

export const signupSchema = joi
  .object()
  .keys({
    email: joi.string().email().lowercase().trim().required(),
    userName: joi.string().trim().required(),
    password: joi
      .string()
      .trim()
      .min(8)
      .pattern(/[A-Z]/, 'Upper Case')
      .pattern(/[a-z]/, 'Small Case')
      .pattern(/[0-9]/, 'Number')
      .pattern(/[^\w]/, 'Special Character ') // not a word
      .messages({
        'string.pattern.base':
          'Password should contain atleast one Special Character',
        'string.pattern.name': 'Atleast one {{#name}} on {{#label}}',
      }),
    confirmPassword: joi.any().valid(joi.ref('password')).required().messages({
      'any.only': 'password not matched',
    }),
    phone: joi
      .string()
      .pattern(/[0-9]{9,13}$/)
      .messages({
        'string.pattern.base': 'Phone not should be number with min 9 numbers',
      }),
  })
  .options({ abortEarly: false })
