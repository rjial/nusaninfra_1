import * as yup from 'yup';
export default yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})