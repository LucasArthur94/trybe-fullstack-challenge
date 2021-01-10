export const emailValidator = (value: string) =>
  !!value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi)
