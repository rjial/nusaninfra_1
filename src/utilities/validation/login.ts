import * as yup from 'yup';
import { User } from '../../model/User';

export default yup.object<Record<keyof User, yup.AnySchema>>().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})