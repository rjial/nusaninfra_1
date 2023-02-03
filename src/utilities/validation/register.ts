import * as yup from 'yup';
export default yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirmation: yup
    .string()
    .test(
      'equal',
      'Passwords do not match!',
      function(v) { // Don't use arrow functions
        const ref = yup.ref('password');
        return v !== this.resolve(ref);
      }
    )
})