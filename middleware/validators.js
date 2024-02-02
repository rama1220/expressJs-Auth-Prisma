export const validateTokenRequest = (req, res, next) => {
  const errors = {}

  if (!req.body.email) {
    errors.email = 'Email is required'
  }

  if (!req.body.password) {
    errors.password = 'Password is required'
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json(errors)
  }

  next()
}
