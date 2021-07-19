import React, { useContext, useState } from 'react';
import FormData from 'form-data';
import {authContext} from "provider/authProvider";
import { Avatar, Button } from '@material-ui/core';
import { axiosInstanceDefault } from 'utils/auth';
import { UPDATE_USER_INFO } from 'Reducer/authReducer';

const ProfilePicture = () => {
  const {authState, dispatch} = useContext(authContext);
  const [imgUrl, setImgUrl] = useState(authState.userInfo ? authState.userInfo.avatar : '');
  const [file, setFile] = useState(null);
  const changeHandler = (e) => {
    setFile(e.target.files[0]);
    setImgUrl(URL.createObjectURL(e.target.files[0]));
  }
  const clickHandler = () => {
    const formData = new FormData();
    const userId = authState.userInfo._id;
    formData.append('avaImage', file);
    axiosInstanceDefault.post(`/users/${userId}/avatar`, formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    }).then(r => {
      alert('Profile Picture changed successfully!');
      dispatch({
      type: UPDATE_USER_INFO,
      payload: {
        avatar: r.data.avatar
      }
    })}
    )
      .catch(err => console.log(err.response));
  }
  return (
    <div className="ml-3 d-inline-block">
      {imgUrl && (<Avatar alt="Avatar" src={imgUrl} style={{height: '200px', width: '200px'}} />)}
      <div className="text-center mt-2">
        <Button
          variant="contained"
          component="label"
        >
          Upload New Image
          <input
            type="file"
            accept="image/png, image/jpeg"
            hidden
            onChange={(e) => changeHandler(e)}
          />
        </Button>
        <div className="text-center mt-2">
          <Button
            variant="contained"
            color="primary"
            onClick={clickHandler}
          >
            Change Profile Picture
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePicture;
