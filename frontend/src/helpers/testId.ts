export const testId = (testId: string) => {
  const hideTestId = process.env.SITE_ENV === 'production'

  return (
    !hideTestId && {
      'data-testid': testId,
    }
  )
}
