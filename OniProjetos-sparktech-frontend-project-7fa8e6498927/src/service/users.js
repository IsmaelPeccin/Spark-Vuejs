import useApi from 'src/composables/UseApi'

export default function postService () {
  const { list, post, update, destroy, getById } = useApi('/user')

  return {
    list,
    post,
    update,
    destroy,
    getById
  }
}
