import { lazy } from 'react'
const route = {
  path: '/courses/v1/:courseId',
  name: 'Course Detail',
  component: lazy(()=>import('.'))
}

export default route
