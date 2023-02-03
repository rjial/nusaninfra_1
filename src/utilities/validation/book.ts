import * as yup from 'yup';

export default yup.object().shape(
    {
        isbn: yup.string().required(),
        title: yup.string().required(),
        subtitle: yup.string().required(),
        author: yup.string().required(),
        published: yup.string().required(),
        publisher: yup.string().required(),
        pages: yup.number().required(),
        description: yup.string().required(),
        website: yup.string().required(),
    }
)