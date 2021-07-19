import { axiosInstance } from 'utils/auth';
async function addToWishList(userId, courseId) {
  const body = { courseId: courseId };
  try {
    console.log('body', body);
    const res = await axiosInstance.post(`/users/${userId}/wishList`, body);

    console.log('res enroll', res);
    if (res.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      // console.log(err.response.status);
      // console.log(err.response.headers);

      return false;
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }

    // console.log(err.config);
    return false;
  }
}

export default addToWishList;
