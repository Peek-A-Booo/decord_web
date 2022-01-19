export const useFormValidate = async (ref: any) => {
  const _window: any = window;
  try {
    await ref.value.validate((errors: any) => {
      if (errors?.length) _window.$message.error(errors[0][0].message);
    });
    return true;
  } catch (error) {
    return false;
  }
};
