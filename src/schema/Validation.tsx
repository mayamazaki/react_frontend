import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .required("氏名を入力してください。"),
  email: yup
    .string()
    .required("メールアドレスを入力してください。")
    .email("正しいメールアドレス形式で入力してください。"),
  birthday: yup
    .string()
    .nullable()
    .transform(value => (!value ? null : value)),
  gender: yup
    .number()
    .nullable()
    .transform(value => (!value ? null : value))
});
