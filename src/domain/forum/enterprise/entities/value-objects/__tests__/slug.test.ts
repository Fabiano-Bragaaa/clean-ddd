import { Slug } from '../slug'

test('should be able to create a slug from text', () => {
  const slug = Slug.createFromText('Example Question')
  expect(slug.value).toEqual('example-question')
})
